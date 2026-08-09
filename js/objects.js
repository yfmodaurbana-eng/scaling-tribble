console.log("OBJECTS ENGINE V15 - MOVIMIENTO 3D CORREGIDO");


/* ==================================================
   TANQUE
================================================== */

var tanque = document.querySelector(".tank-3d");

if (!tanque) {
    console.error("NO EXISTE TANK-3D");
}


/* ==================================================
   VARIABLES DE INTERACCIÓN
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

    objeto.className = "objeto " + tipo;

    objeto.textContent = icono;


    /* ==================================================
       ESTILO
    ================================================== */

    objeto.style.position = "absolute";

    objeto.style.left = "50%";

    objeto.style.top = "50%";

    objeto.style.zIndex = "99999";

    objeto.style.fontSize = "40px";

    objeto.style.transformStyle = "preserve-3d";

    objeto.style.cursor = "grab";

    objeto.style.userSelect = "none";

    objeto.style.pointerEvents = "auto";


    /* ==================================================
       POSICIÓN INICIAL
    ================================================== */

    objeto.dataset.x = "0";

    objeto.dataset.y = "0";

    objeto.dataset.z = "0";

    objeto.dataset.scale = "1";


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


    return objeto;
};


/* ==================================================
   ACTUALIZAR POSICIÓN 3D
================================================== */

function actualizarPosicion(objeto) {

    var x =
        Number(objeto.dataset.x);

    var y =
        Number(objeto.dataset.y);

    var z =
        Number(objeto.dataset.z);

    var escala =
        Number(
            objeto.dataset.scale || 1
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
            tanque.querySelectorAll(".objeto")
        );


    /*
       Empezamos por el último objeto creado
       para poder seleccionar correctamente
       objetos superpuestos.
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
    "wheel",
    function(e) {

        var objeto =
            buscarObjeto(
                e.clientX,
                e.clientY
            );


        if (!objeto) {

            objetoActivo = null;

            moviendoObjeto = false;

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
   MOVIMIENTO 3D CORREGIDO
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
           MOVIMIENTO DEL RATÓN EN PANTALLA
        ================================================== */

        var dx =
            e.clientX -
            inicioMouseX;


        var dy =
            e.clientY -
            inicioMouseY;


        /* ==================================================
           MATRIZ REAL DEL TANQUE
        ================================================== */

        var estilo =
            window.getComputedStyle(tanque);


        var transform =
            estilo.transform;


        /*
           Por defecto utilizamos el movimiento
           normal del ratón.
        */

        var localDX = dx;

        var localDY = dy;


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
                    new DOMMatrix(transform);

            } catch (error) {

                matriz = null;

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

        x += localDX;

        y += localDY;


        /* ==================================================
           DIMENSIONES DEL TANQUE
        ================================================== */

        var ancho =
            tanque.offsetWidth;


        var alto =
            tanque.offsetHeight;


        /* ==================================================
           MARGEN DEL OBJETO
        ================================================== */

        var margenX =
            25;


        var margenY =
            25;


        /* ==================================================
           LÍMITES
        ================================================== */

        var limiteX =
            ancho / 2 -
            margenX;


        var limiteY =
            alto / 2 -
            margenY;


        x =
            Math.max(
                -limiteX,
                Math.min(
                    limiteX,
                    x
                )
            );


        y =
            Math.max(
                -limiteY,
                Math.min(
                    limiteY,
                    y
                )
            );


        /* ==================================================
           GUARDAR POSICIÓN
        ================================================== */

        objetoActivo.dataset.x =
            x;


        objetoActivo.dataset.y =
            y;


        /* ==================================================
           ACTUALIZAR REFERENCIA DEL RATÓN
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
   RUEDA = PROFUNDIDAD Z
================================================== */

tanque.addEventListener(
    "wheel",
    function(e) {

        /*
           Si SHIFT está pulsado,
           lo gestiona el sistema de tamaño.
        */

        if (e.shiftKey) {
            return;
        }


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


        var z =
            Number(
                objeto.dataset.z
            );


        /*
           Movimiento de profundidad.
        */

        z -=
            e.deltaY * 0.15;


        /* ==================================================
           ANCHO REAL DEL ACUARIO
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


/* ==================================================
   SHIFT + RUEDA = TAMAÑO
================================================== */

tanque.addEventListener(
    "wheel",
    function(e) {

        if (!e.shiftKey) {
            return;
        }


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


        var escala =
            Number(
                objeto.dataset.scale ||
                1
            );


        escala -=
            e.deltaY * 0.001;


        /*
           Tamaño mínimo 40%
           Tamaño máximo 300%.
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

    },
    {
        passive: false
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

