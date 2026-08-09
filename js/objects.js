console.log("OBJECTS ENGINE V14 - SELECCION 3D REAL");


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

        tanque =
            document.querySelector(".tank-3d");

    }


    if (!tanque) {

        console.error("NO EXISTE TANK-3D");

        return;

    }


    var objeto =
        document.createElement("div");


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

    var x = 0;

    var y = 0;

    var z = 0;


    objeto.dataset.x = x;

    objeto.dataset.y = y;

    objeto.dataset.z = z;


    objeto.dataset.scale = "1";


    actualizarPosicion(objeto);


    tanque.appendChild(objeto);


    console.log(
        "OBJETO 3D CREADO:",
        tipo,
        "X:",
        x,
        "Y:",
        y,
        "Z:",
        z
    );


    return objeto;

};


/* ==================================================
   POSICIÓN 3D
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
        x + "px," +
        y + "px," +
        z + "px) " +
        "scale(" +
        escala +
        ")";

}


/* ==================================================
   BUSCAR OBJETO BAJO EL RATÓN
================================================== */

function buscarObjeto(x, y) {


    var objetos =
        Array.from(
            tanque.querySelectorAll(
                ".objeto"
            )
        );


    /* ==================================================
       RECORRER DE ARRIBA HACIA ABAJO
    ================================================== */

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
   SELECCIÓN DEL OBJETO
================================================== */

tanque.addEventListener(
    "mousedown",
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
   MOVIMIENTO DEL OBJETO
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


        var dx =
            e.clientX -
            inicioMouseX;


        var dy =
            e.clientY -
            inicioMouseY;


        var x =
            Number(
                objetoActivo.dataset.x
            );


        var y =
            Number(
                objetoActivo.dataset.y
            );


        /* ==================================================
           MOVIMIENTO NATURAL
        ================================================== */

        x += dx;

        y += dy;


        /* ==================================================
           DIMENSIONES TANQUE
        ================================================== */

        var ancho =
            tanque.offsetWidth;


        var alto =
            tanque.offsetHeight;


        /* ==================================================
           MARGEN
        ================================================== */

        var margenX =
            25;


        var margenY =
            25;


        /* ==================================================
           LIMITES
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


        objetoActivo.dataset.x =
            x;


        objetoActivo.dataset.y =
            y;


        inicioMouseX =
            e.clientX;


        inicioMouseY =
            e.clientY;


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


        z -=
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


/* ==================================================
   RUEDA + SHIFT = TAMAÑO
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


                            /* ROCA */

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


                            /* PLANTA */

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


                            /* PEZ */

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

