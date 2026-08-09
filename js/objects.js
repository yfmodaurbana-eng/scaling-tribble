console.log("OBJECTS ENGINE V12 - MOVIMIENTO 3D");


window.crearObjeto = function(tipo, icono) {

    var tanque = document.querySelector(".tank-3d");

    if (!tanque) {
        console.error("NO EXISTE TANK-3D");
        return;
    }


    var objeto = document.createElement("div");

    objeto.className = "objeto " + tipo;

    objeto.textContent = icono;


    /* =========================
       ESTILO
    ========================= */

    objeto.style.position = "absolute";
    objeto.style.left = "50%";
    objeto.style.top = "50%";

    objeto.style.zIndex = "500";

    objeto.style.fontSize = "40px";

    objeto.style.transformStyle = "preserve-3d";

    objeto.style.cursor = "grab";

    objeto.style.userSelect = "none";


    /* =========================
       POSICION INICIAL
    ========================= */

    var x = 0;
    var y = 0;
    var z = 0;


    objeto.dataset.x = x;
    objeto.dataset.y = y;
    objeto.dataset.z = z;


    actualizarPosicion(objeto);


    tanque.appendChild(objeto);


    hacerArrastrable(objeto);


    return objeto;
};


/* =========================
   POSICION 3D
========================= */

function actualizarPosicion(objeto) {

    var x = Number(objeto.dataset.x);

    var y = Number(objeto.dataset.y);

    var z = Number(objeto.dataset.z);


    objeto.style.transform =
        "translate3d(" +
        x + "px," +
        y + "px," +
        z + "px)";

}


/* =========================
   ARRASTRE X / Y
========================= */

function hacerArrastrable(objeto) {

    var moviendo = false;

    var inicioX = 0;

    var inicioY = 0;


    objeto.addEventListener(
        "mousedown",
        function(e) {

            e.preventDefault();

            e.stopPropagation();


            moviendo = true;


            inicioX = e.clientX;

            inicioY = e.clientY;


            objeto.style.cursor = "grabbing";

        }
    );


    document.addEventListener(
        "mousemove",
        function(e) {

            if (!moviendo) return;


            var dx =
                e.clientX - inicioX;

            var dy =
                e.clientY - inicioY;


            var x =
                Number(objeto.dataset.x);

            var y =
                Number(objeto.dataset.y);


            /* =========================
               MOVIMIENTO NATURAL
            ========================= */

            x += dx;

            y += dy;


            /* =========================
               LIMITES
            ========================= */

            var tanqueWidth =
                tanque.offsetWidth;

            var tanqueHeight =
                tanque.offsetHeight;


            var limiteX =
                tanqueWidth / 2 - 25;


            var limiteY =
                tanqueHeight / 2 - 25;


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


            objeto.dataset.x = x;

            objeto.dataset.y = y;


            inicioX = e.clientX;

            inicioY = e.clientY;


            actualizarPosicion(objeto);

        }
    );


    document.addEventListener(
        "mouseup",
        function() {

            moviendo = false;

            objeto.style.cursor = "grab";

        }
    );


    /* =========================
       PROFUNDIDAD Z
    ========================= */

    objeto.addEventListener(
        "wheel",
        function(e) {

            e.preventDefault();

            e.stopPropagation();


            var z =
                Number(objeto.dataset.z);


            z -=
                e.deltaY * 0.15;


            var anchoAcuario =
                Number(
                    document.getElementById(
                        "ancho"
                    ).value
                ) || 30;


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


            objeto.dataset.z = z;


            actualizarPosicion(objeto);


            console.log(
                "PROFUNDIDAD Z:",
                z
            );

        },
        { passive:false }
    );

}


/* =========================
   BOTONES
========================= */

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

