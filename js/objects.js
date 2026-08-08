```javascript
/* ==================================================
   ACUARIO DESIGNER STUDIO V8.4
   SISTEMA DE OBJETOS 3D REAL
   X + Y + Z
================================================== */

console.log("OBJECTS ENGINE V8.4 CARGADO");


document.addEventListener("DOMContentLoaded", function () {

    var tanque = document.querySelector(".tank-3d");

    if (!tanque) {
        console.error("No existe .tank-3d");
        return;
    }


    /* ==================================================
       CONFIGURACIÓN
    ================================================== */

    var CONFIG = {

        xMin: 5,
        xMax: 95,

        yMin: 8,
        yMax: 88,

        zMin: 0

    };


    /* ==================================================
       BOTONES
    ================================================== */

    document.querySelectorAll(".tool").forEach(function (btn) {

        btn.addEventListener("click", function () {

            var texto = btn.innerText || "";


            if (texto.indexOf("Roca") !== -1) {
                crearObjeto("roca", "🪨");
            }


            if (texto.indexOf("Planta") !== -1) {
                crearObjeto("planta", "🌱");
            }


            if (texto.indexOf("Pez") !== -1) {
                crearObjeto("pez", "🐟");
            }


            if (texto.indexOf("Luz") !== -1) {
                activarLuz();
            }

        });

    });


    /* ==================================================
       CREAR OBJETO
    ================================================== */

    window.crearObjeto = function (tipo, icono) {

        var objeto =
            document.createElement("div");


        objeto.className =
            "objeto " + tipo;


        objeto.innerHTML =
            icono;


        /* POSICIÓN INICIAL */

        var x =
            random(15, 85);


        var y =
            random(20, 75);


        var z =
            random(
                10,
                Math.max(
                    20,
                    obtenerProfundidad() - 10
                )
            );


        objeto.dataset.x = x;
        objeto.dataset.y = y;
        objeto.dataset.z = z;


        /* POSICIONAMIENTO */

        objeto.style.position =
            "absolute";


        objeto.style.left =
            "0px";


        objeto.style.top =
            "0px";


        objeto.style.right =
            "auto";


        objeto.style.bottom =
            "auto";


        objeto.style.transformStyle =
            "preserve-3d";


        objeto.style.cursor =
            "grab";


        /* AÑADIR AL TANQUE */

        tanque.appendChild(objeto);


        /* APLICAR POSICIÓN */

        actualizarPosicion3D(
            objeto
        );


        /* ACTIVAR CONTROLES */

        hacerArrastrable3D(
            objeto
        );


        activarControlRueda(
            objeto
        );


        console.log(
            "Objeto creado:",
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
       OBTENER PROFUNDIDAD
    ================================================== */

    function obtenerProfundidad() {

        var valor =
            getComputedStyle(tanque)
            .getPropertyValue("--depth");


        var profundidad =
            parseFloat(valor);


        if (Number.isFinite(profundidad)) {
            return profundidad;
        }


        return 150;

    }


    /* ==================================================
       ACTUALIZAR POSICIÓN 3D
    ================================================== */

    function actualizarPosicion3D(objeto) {

        var x =
            Number(objeto.dataset.x);


        var y =
            Number(objeto.dataset.y);


        var z =
            Number(objeto.dataset.z);


        var profundidad =
            obtenerProfundidad();


        x =
            limitar(
                x,
                CONFIG.xMin,
                CONFIG.xMax
            );


        y =
            limitar(
                y,
                CONFIG.yMin,
                CONFIG.yMax
            );


        z =
            limitar(
                z,
                CONFIG.zMin,
                profundidad
            );


        objeto.dataset.x =
            x;


        objeto.dataset.y =
            y;


        objeto.dataset.z =
            z;


        /*
         * SIN BACKTICKS.
         *
         * Construimos translate3d
         * mediante concatenación.
         */

        objeto.style.transform =
            "translate3d(" +
            x +
            "%, " +
            y +
            "%, " +
            z +
            "px)";


    }


    /* ==================================================
       ARRASTRE X + Y
    ================================================== */

    function hacerArrastrable3D(objeto) {

        var moviendo =
            false;


        var inicioMouseX =
            0;


        var inicioMouseY =
            0;


        var inicioX =
            0;


        var inicioY =
            0;


        objeto.addEventListener(
            "mousedown",
            function (e) {

                if (e.button !== 0) {
                    return;
                }


                moviendo =
                    true;


                inicioMouseX =
                    e.clientX;


                inicioMouseY =
                    e.clientY;


                inicioX =
                    Number(
                        objeto.dataset.x
                    );


                inicioY =
                    Number(
                        objeto.dataset.y
                    );


                objeto.style.cursor =
                    "grabbing";


                e.preventDefault();

                e.stopPropagation();

            }
        );


        document.addEventListener(
            "mousemove",
            function (e) {

                if (!moviendo) {
                    return;
                }


                var dx =
                    e.clientX -
                    inicioMouseX;


                var dy =
                    e.clientY -
                    inicioMouseY;


                objeto.dataset.x =
                    limitar(
                        inicioX +
                        dx * 0.20,
                        CONFIG.xMin,
                        CONFIG.xMax
                    );


                objeto.dataset.y =
                    limitar(
                        inicioY +
                        dy * 0.20,
                        CONFIG.yMin,
                        CONFIG.yMax
                    );


                actualizarPosicion3D(
                    objeto
                );

            }
        );


        document.addEventListener(
            "mouseup",
            function () {

                if (!moviendo) {
                    return;
                }


                moviendo =
                    false;


                objeto.style.cursor =
                    "grab";

            }
        );

    }


    /* ==================================================
       PROFUNDIDAD Z
       RUEDA DEL RATÓN
    ================================================== */

    function activarControlRueda(objeto) {

        objeto.addEventListener(
            "wheel",
            function (e) {

                e.preventDefault();


                var z =
                    Number(
                        objeto.dataset.z
                    );


                z +=
                    e.deltaY * -0.5;


                objeto.dataset.z =
                    limitar(
                        z,
                        CONFIG.zMin,
                        obtenerProfundidad()
                    );


                actualizarPosicion3D(
                    objeto
                );

            },
            {
                passive: false
            }
        );

    }


    /* ==================================================
       LUZ
    ================================================== */

    function activarLuz() {

        tanque.classList.toggle(
            "iluminado"
        );

    }


    /* ==================================================
       LIMITAR VALORES
    ================================================== */

    function limitar(
        valor,
        minimo,
        maximo
    ) {

        valor =
            Number(valor);


        if (!Number.isFinite(valor)) {
            return minimo;
        }


        return Math.max(
            minimo,
            Math.min(
                maximo,
                valor
            )
        );

    }


    /* ==================================================
       NÚMERO ALEATORIO
    ================================================== */

    function random(
        minimo,
        maximo
    ) {

        return (
            Math.random() *
            (maximo - minimo) +
            minimo
        );

    }


    /* ==================================================
       FUNCIÓN GLOBAL
    ================================================== */

    window.actualizarPosicion3D =
        actualizarPosicion3D;


});
```
