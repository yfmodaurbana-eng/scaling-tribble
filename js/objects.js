javascript
console.log("OBJECTS ENGINE V17 - MOVIMIENTO 3D + RUEDA OBJETO");


/* ==================================================
   TANQUE
================================================== */

var tanque = document.querySelector(".tank-3d");

if (!tanque) {
    console.error("NO EXISTE TANK-3D");
}


/* ==================================================
   VARIABLES
================================================== */

var objetoActivo = null;

var moviendoObjeto = false;

var inicioMouseX = 0;

var inicioMouseY = 0;


/* ==================================================
   CREAR OBJETO
================================================== */

window.crearObjeto = function(tipo, icono) {

    if (!tanque) {
        tanque = document.querySelector(".tank-3d");
    }

    if (!tanque) {
        console.error("NO EXISTE TANK-3D");
        return;
    }


    var objeto = document.createElement("div");


    objeto.className =
        "objeto " + tipo;


    objeto.textContent =
        icono;


    /* ==================================================
       ESTILO
    ================================================== */

    objeto.style.position =
        "absolute";

    objeto.style.left =
        "50%";

    objeto.style.top =
        "50%";

    objeto.style.zIndex =
        "99999";

    objeto.style.fontSize =
        "40px";

    objeto.style.transformStyle =
        "preserve-3d";

    objeto.style.cursor =
        "grab";

    objeto.style.userSelect =
        "none";

    objeto.style.pointerEvents =
        "auto";


    /* ==================================================
       POSICIÓN INICIAL
    ================================================== */

    objeto.dataset.x =
        "0";

    objeto.dataset.y =
        "0";

    objeto.dataset.z =
        "0";

    objeto.dataset.scale =
        "1";


    actualizarPosicion(objeto);


    tanque.appendChild(objeto);


    console.log(
        "OBJETO 3D CREADO:",
        tipo,
        "X:",
        objeto.dataset.x,
        "Y:",
        objeto.dataset.y,
        "Z:",
        objeto.dataset.z
    );


    /* ==================================================
       CONTROL DE RUEDA DEL OBJETO
    ================================================== */

    objeto.addEventListener(
        "wheel",
        function(e) {

            /*
               MUY IMPORTANTE:

               Evita que la rueda llegue al
               sistema de zoom del acuario.
            */

            e.preventDefault();


            e.stopPropagation();


            /* ==================================================
               SHIFT + RUEDA = TAMAÑO
            ================================================== */

            if (e.shiftKey) {

                var escala =
                    Number(
                        objeto.dataset.scale ||
                        1
                    );


                escala -=
                    e.deltaY * 0.001;


                /*
                   Tamaño mínimo 40%
                   Tamaño máximo 300%
                */

                escala =
                    Math.max(
                        0.4,
                        Math.min(
                            3,
                            escala
                        )
                    );


                objeto.dataset.scale =
                    escala;


                actualizarPosicion(
                    objeto
                );


                console.log(
                    "TAMAÑO OBJETO:",
                    escala
                );


                return;
            }


            /* ==================================================
               RUEDA NORMAL = PROFUNDIDAD Z
            ================================================== */

          var z =
    Number(
        objeto.dataset.z
    );

/*
   RUEDA:
   arriba  = acerca
   abajo   = aleja
*/

z +=
    e.deltaY * 0.15;


            /* ==================================================
               ANCHO DEL ACUARIO
            ================================================== */

            var campoAncho =
                document.getElementById(
                    "ancho"
                );


            var anchoAcuario =
                campoAncho
                    ? Number(
                        campoAncho.value
                    )
                    : 30;


            if (
                !Number.isFinite(
                    anchoAcuario
                )
            ) {

                anchoAcuario =
                    30;
            }


            /* ==================================================
               LÍMITE Z
            ================================================== */

            var limiteZ =
                anchoAcuario * 2;


            z =
                Math.max(
                    -limiteZ,
                    Math.min(
                        limiteZ,
                        z
                    )
                );


            objeto.dataset.z =
                z;


            actualizarPosicion(
                objeto
            );


            console.log(
                "PROFUNDIDAD Z:",
                z
            );

        },
        {
            passive: false
        }
    );


    return objeto;
};


/* ==================================================
   ACTUALIZAR POSICIÓN 3D
================================================== */

function actualizarPosicion(objeto) {

    var x =
        Number(
            objeto.dataset.x
        );


    var y =
        Number(
            objeto.dataset.y
        );


    var z =
        Number(
            objeto.dataset.z
        );


    var escala =
        Number(
            objeto.dataset.scale ||
            1
        );


    objeto.style.transform =
        "translate3d(" +
        x +
        "px," +
        y +
        "px," +
        z +
        "px) scale(" +
        escala +
        ")";
}


/* ==================================================
   BUSCAR OBJETO BAJO EL RATÓN
================================================== */

function buscarObjeto(x, y) {

    if (!tanque) {
        return null;
    }


    var objetos =
        Array.from(
            tanque.querySelectorAll(
                ".objeto"
            )
        );


    /*
       Empezamos por el último objeto
       para objetos superpuestos.
    */

    for (
        var i = objetos.length - 1;
        i >= 0;
        i--
    ) {

        var objeto =
            objetos[i];


        var rect =
            objeto.getBoundingClientRect();


        if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {

            return objeto;
        }
    }


    return null;
}


/* ==================================================
   SELECCIONAR OBJETO
================================================== */

document.addEventListener(
    "mousedown",
    function(e) {

        var objeto =
            buscarObjeto(
                e.clientX,
                e.clientY
            );


        if (!objeto) {
            return;
        }


        e.preventDefault();

        e.stopPropagation();


        objetoActivo =
            objeto;


        moviendoObjeto =
            true;


        inicioMouseX =
            e.clientX;


        inicioMouseY =
            e.clientY;


        objeto.style.cursor =
            "grabbing";


        objeto.style.zIndex =
            "100000";


        console.log(
            "OBJETO SELECCIONADO:",
            objeto.className
        );

    },
    true
);


/* ==================================================
   MOVIMIENTO X / Y
================================================== */

document.addEventListener(
    "mousemove",
    function(e) {

        if (
            !moviendoObjeto ||
            !objetoActivo
        ) {

            return;
        }


        /* ==================================================
           DELTA DEL RATÓN
        ================================================== */

        var dx =
            e.clientX -
            inicioMouseX;


        var dy =
            e.clientY -
            inicioMouseY;


        /* ==================================================
           MATRIZ DEL ACUARIO
        ================================================== */

        var estilo =
            window.getComputedStyle(
                tanque
            );


        var transform =
            estilo.transform;


        var localDX =
            dx;


        var localDY =
            dy;


        /* ==================================================
           CONVERSIÓN A EJES LOCALES
        ================================================== */

        if (
            transform &&
            transform !== "none"
        ) {

            var matriz;


            try {

                matriz =
                    new DOMMatrix(
                        transform
                    );

            } catch (error) {

                matriz =
                    null;
            }


            if (matriz) {

                var a =
                    matriz.a;


                var b =
                    matriz.b;


                var c =
                    matriz.c;


                var d =
                    matriz.d;


                var determinante =
                    a * d -
                    b * c;


                if (
                    Math.abs(
                        determinante
                    ) > 0.0001
                ) {

                    localDX =
                        (
                            d * dx -
                            c * dy
                        ) /
                        determinante;


                    localDY =
                        (
                            -b * dx +
                            a * dy
                        ) /
                        determinante;
                }
            }
        }


        /* ==================================================
           POSICIÓN ACTUAL
        ================================================== */

        var x =
            Number(
                objetoActivo.dataset.x
            );


        var y =
            Number(
                objetoActivo.dataset.y
            );


        /* ==================================================
           MOVIMIENTO
        ================================================== */

        x +=
            localDX;


        y +=
            localDY;


        /* ==================================================
           DIMENSIONES
        ================================================== */

        var ancho =
            tanque.offsetWidth;


        var alto =
            tanque.offsetHeight;


        /* ==================================================
           MÁRGENES
        ================================================== */

        var margenX =
            25;


        var margenY =
            25;


        /* ==================================================
           LÍMITE X
        ================================================== */

        var limiteX =
            ancho / 2 -
            margenX;


        x =
            Math.max(
                -limiteX,
                Math.min(
                    limiteX,
                    x
                )
            );


        /* ==================================================
           LÍMITE Y
        ================================================== */

        var limiteY =
            alto / 2 -
            margenY;


        y =
            Math.max(
                -limiteY,
                Math.min(
                    limiteY,
                    y
                )
            );


        /* ==================================================
           GUARDAR
        ================================================== */

        objetoActivo.dataset.x =
            x;


        objetoActivo.dataset.y =
            y;


        /* ==================================================
           ACTUALIZAR RATÓN
        ================================================== */

        inicioMouseX =
            e.clientX;


        inicioMouseY =
            e.clientY;


        /* ==================================================
           ACTUALIZAR OBJETO
        ================================================== */

        actualizarPosicion(
            objetoActivo
        );

    }
);


/* ==================================================
   SOLTAR OBJETO
================================================== */

document.addEventListener(
    "mouseup",
    function() {

        if (objetoActivo) {

            objetoActivo.style.cursor =
                "grab";
        }


        moviendoObjeto =
            false;


        objetoActivo =
            null;

    }
);


/* ==================================================
   BOTONES
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        document
            .querySelectorAll(".tool")
            .forEach(
                function(boton) {


                    boton.addEventListener(
                        "click",
                        function() {


                            var texto =
                                boton.innerText;


                            /* =========================
                               ROCA
                            ========================= */

                            if (
                                texto.includes(
                                    "Roca"
                                )
                            ) {

                                crearObjeto(
                                    "roca",
                                    "🪨"
                                );
                            }


                            /* =========================
                               PLANTA
                            ========================= */

                            if (
                                texto.includes(
                                    "Planta"
                                )
                            ) {

                                crearObjeto(
                                    "planta",
                                    "🌱"
                                );
                            }


                            /* =========================
                               PEZ
                            ========================= */

                            if (
                                texto.includes(
                                    "Pez"
                                )
                            ) {

                                crearObjeto(
                                    "pez",
                                    "🐟"
                                );
                            }

                        }
                    );

                }
            );

    }
);

