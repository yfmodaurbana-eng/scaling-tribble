console.log("OBJECTS ENGINE V13 - MOVIMIENTO 3D");


/* ==================================================
   TANQUE
================================================== */

var tanque = document.querySelector(".tank-3d");

if (!tanque) {
    console.error("NO EXISTE TANK-3D");
}


/* ==================================================
   CREAR OBJETO
================================================== */

window.crearObjeto = function(tipo, icono) {

    /* Comprobar tanque */

    if (!tanque) {
        tanque = document.querySelector(".tank-3d");
    }

    if (!tanque) {
        console.error("NO EXISTE TANK-3D");
        return;
    }


    /* Crear elemento */

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


    /* ==================================================
       POSICIÓN INICIAL
    ================================================== */

    var x = 0;

    var y = 0;

    var z = 0;


    objeto.dataset.x = x;

    objeto.dataset.y = y;

    objeto.dataset.z = z;


    actualizarPosicion(objeto);


    /* Añadir al tanque */

    tanque.appendChild(objeto);


    /* Activar movimiento */

    hacerArrastrable(objeto);


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


    objeto.style.transform =
        "translate3d(" +
        x + "px," +
        y + "px," +
        z + "px)";

}


/* ==================================================
   ARRASTRE X / Y / Z
================================================== */

function hacerArrastrable(objeto) {

    var moviendo = false;


    var inicioX = 0;

    var inicioY = 0;


    /* ==================================================
       CLICK
    ================================================== */

    objeto.addEventListener(
        "mousedown",
        function(e) {

            e.preventDefault();

            e.stopPropagation();


            moviendo = true;


            inicioX =
                e.clientX;

            inicioY =
                e.clientY;


            objeto.style.cursor =
                "grabbing";

        }
    );


    /* ==================================================
       MOVIMIENTO X / Y
    ================================================== */

    document.addEventListener(
        "mousemove",
        function(e) {

            if (!moviendo) {
                return;
            }


            var dx =
                e.clientX -
                inicioX;


            var dy =
                e.clientY -
                inicioY;


            var x =
                Number(
                    objeto.dataset.x
                );


            var y =
                Number(
                    objeto.dataset.y
                );


            /* Movimiento natural */

            x += dx;

            y += dy;


            /* ==================================================
               DIMENSIONES DEL TANQUE
            ================================================== */

            var tanqueWidth =
                tanque.offsetWidth;


            var tanqueHeight =
                tanque.offsetHeight;


            /* Margen del objeto */

            var margenX =
                25;


            var margenY =
                25;


            /* Límites */

            var limiteX =
                tanqueWidth / 2 -
                margenX;


            var limiteY =
                tanqueHeight / 2 -
                margenY;


            /* Limitar X */

            x =
                Math.max(
                    -limiteX,
                    Math.min(
                        limiteX,
                        x
                    )
                );


            /* Limitar Y */

            y =
                Math.max(
                    -limiteY,
                    Math.min(
                        limiteY,
                        y
                    )
                );


            objeto.dataset.x =
                x;


            objeto.dataset.y =
                y;


            inicioX =
                e.clientX;


            inicioY =
                e.clientY;


            actualizarPosicion(
                objeto
            );

        }
    );


    /* ==================================================
       SOLTAR
    ================================================== */

    document.addEventListener(
        "mouseup",
        function() {

            moviendo = false;


            objeto.style.cursor =
                "grab";

        }
    );


    /* ==================================================
       PROFUNDIDAD Z
    ================================================== */

    objeto.addEventListener(
        "wheel",
        function(e) {

            e.preventDefault();

            e.stopPropagation();


            var z =
                Number(
                    objeto.dataset.z
                );


            /* Movimiento profundidad */

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

}


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

