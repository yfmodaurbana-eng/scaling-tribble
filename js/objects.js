console.log("OBJECTS ENGINE V19 - MOVIMIENTO 3D ESTABLE");


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

    objeto.dataset.x = "0";

    objeto.dataset.y = "0";

    objeto.dataset.z = "0";

    objeto.dataset.scale = "1";


    actualizarPosicion(objeto);


    tanque.appendChild(objeto);


    /* ==================================================
       RUEDA DEL OBJETO
    ================================================== */

    objeto.addEventListener(
        "wheel",
        function(e) {

            /*
               IMPORTANTE:
               La rueda sobre el objeto NO llega
               al sistema de zoom del acuario.
            */

            e.preventDefault();

            e.stopPropagation();


            /* ==================================================
               SHIFT + RUEDA = TAMAÑO
            ================================================== */

            if (e.shiftKey) {

                var escala =
                    Number(
                        objeto.dataset.scale || 1
                    );


                /*
                   RUEDA ARRIBA = AGRANDAR
                   RUEDA ABAJO = REDUCIR
                */

                if (e.deltaY < 0) {

                    escala += 0.10;

                } else {

                    escala -= 0.10;
                }


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
               RUEDA ARRIBA
               = ACERCAR

               RUEDA ABAJO
               = ALEJAR
            */

            if (e.deltaY < 0) {

                z += 15;

            } else {

                z -= 15;
            }


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
       INFORMACIÓN
    ================================================== */

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
            tanque.querySelectorAll(
                ".objeto"
            )
        );


    /*
       Empezamos por el último creado
       para seleccionar correctamente
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


        /*
           Evita que el acuario interprete
           este movimiento como giro.
        */

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
           MOVIMIENTO DIRECTO DE PANTALLA
        ================================================== */

        var dx =
            e.clientX -
            inicioMouseX;


        var dy =
            e.clientY -
            inicioMouseY;


        /*
           IMPORTANTE:

           NO usamos DOMMatrix.

           De esta forma:
           derecha del ratón = derecha
           izquierda del ratón = izquierda
           arriba = arriba
           abajo = abajo

           Aunque el acuario esté girado.
        */

        var x =
            Number(
                objetoActivo.dataset.x
            );


        var y =
            Number(
                objetoActivo.dataset.y
            );


        x +=
            dx;


        y +=
            dy;


        /* ==================================================
           DIMENSIONES DEL TANQUE
        ================================================== */

        var ancho =
            tanque.offsetWidth;


        var alto =
            tanque.offsetHeight;


        /* ==================================================
           MARGEN
        ================================================== */

/* ==================================================
   LÍMITES REALES DEL OBJETO
================================================== */

var rectTanque =
    tanque.getBoundingClientRect();

var rectObjeto =
    objetoActivo.getBoundingClientRect();


/*
   Centro del tanque
*/

var centroTanqueX =
    rectTanque.left +
    rectTanque.width / 2;

var centroTanqueY =
    rectTanque.top +
    rectTanque.height / 2;


/*
   Tamaño visual del objeto
*/

var mitadObjetoX =
    rectObjeto.width / 2;

var mitadObjetoY =
    rectObjeto.height / 2;


/*
   Límites en píxeles locales
*/

var limiteX =
    (rectTanque.width / 2) -
    mitadObjetoX;

var limiteY =
    (rectTanque.height / 2) -
    mitadObjetoY;


/*
   Pequeño margen de seguridad
   para que nunca toque el cristal.
*/

limiteX -= 5;

limiteY -= 5;


/*
   Evitar valores negativos
*/

limiteX =
    Math.max(
        0,
        limiteX
    );

limiteY =
    Math.max(
        0,
        limiteY
    );

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

    },
    true
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

    },
    true
);


/* ==================================================
   BOTONES DE OBJETOS
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
                        function(e) {

                            e.preventDefault();

                            e.stopPropagation();


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

                                return;
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

                                return;
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

                                return;
                            }

                        }
                    );

                }
            );

    }
);

