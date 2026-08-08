```javascript
/* ==================================================
   ACUARIO DESIGNER STUDIO V8.3
   SISTEMA DE OBJETOS 3D REAL
   X + Y + Z
   MOTOR ESTABLE
================================================== */

console.log("OBJECTS ENGINE V8.3 CARGADO");


document.addEventListener("DOMContentLoaded", () => {

    const tanque = document.querySelector(".tank-3d");

    if (!tanque) {
        console.error("No existe .tank-3d");
        return;
    }


    /* ==================================================
       CONFIGURACIÓN
    ================================================== */

    const CONFIG = {

        xMin: 5,
        xMax: 95,

        yMin: 8,
        yMax: 88,

        zMin: 0

    };


    /* ==================================================
       BOTONES
    ================================================== */

    document.querySelectorAll(".tool").forEach(btn => {

        btn.addEventListener("click", () => {

            const texto = btn.innerText;

            if (texto.includes("Roca")) {
                crearObjeto("roca", "🪨");
            }

            if (texto.includes("Planta")) {
                crearObjeto("planta", "🌱");
            }

            if (texto.includes("Pez")) {
                crearObjeto("pez", "🐟");
            }

            if (texto.includes("Luz")) {
                activarLuz();
            }

        });

    });


    /* ==================================================
       CREAR OBJETO
    ================================================== */

    window.crearObjeto = function(tipo, icono) {

        const objeto = document.createElement("div");

        objeto.className = "objeto " + tipo;

        objeto.innerHTML = icono;

        /*
            Posición inicial aleatoria.
        */

        const x =
            random(15, 85);

        const y =
            random(20, 75);

        const z =
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


        /*
            Eliminamos cualquier posicionamiento
            2D anterior.
        */

        objeto.style.left = "0px";
        objeto.style.top = "0px";
        objeto.style.right = "auto";
        objeto.style.bottom = "auto";


        objeto.style.position = "absolute";

        objeto.style.transformStyle =
            "preserve-3d";


        /*
            MUY IMPORTANTE:
            no añadimos ninguna animación
            que modifique transform.
        */


        tanque.appendChild(objeto);


        actualizarPosicion3D(objeto);


        hacerArrastrable3D(objeto);


        activarControlRueda(objeto);


        return objeto;

    };


    /* ==================================================
       PROFUNDIDAD
    ================================================== */

    function obtenerProfundidad() {

        const valor =
            getComputedStyle(tanque)
            .getPropertyValue("--depth");

        const profundidad =
            parseFloat(valor);

        if (Number.isFinite(profundidad)) {
            return profundidad;
        }

        return 150;

    }


    /* ==================================================
       POSICIÓN 3D
    ================================================== */

    function actualizarPosicion3D(objeto) {

        let x =
            Number(objeto.dataset.x);

        let y =
            Number(objeto.dataset.y);

        let z =
            Number(objeto.dataset.z);


        const profundidad =
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


        objeto.dataset.x = x;
        objeto.dataset.y = y;
        objeto.dataset.z = z;


        /*
            ÚNICO transform del objeto.
        */

        objeto.style.transform =
            `translate3d(
                ${x}%,
                ${y}%,
                ${z}px
            )`;

    }


    /* ==================================================
       ARRASTRE X + Y
    ================================================== */

    function hacerArrastrable3D(objeto) {

        let moviendo = false;

        let inicioMouseX = 0;
        let inicioMouseY = 0;

        let inicioX = 0;
        let inicioY = 0;


        objeto.addEventListener(
            "mousedown",
            e => {

                if (e.button !== 0) {
                    return;
                }


                moviendo = true;


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
            e => {

                if (!moviendo) {
                    return;
                }


                const dx =
                    e.clientX -
                    inicioMouseX;


                const dy =
                    e.clientY -
                    inicioMouseY;


                /*
                    X
                */

                objeto.dataset.x =
                    limitar(
                        inicioX +
                        dx * 0.20,

                        CONFIG.xMin,
                        CONFIG.xMax
                    );


                /*
                    Y
                */

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
            () => {

                if (!moviendo) {
                    return;
                }

                moviendo = false;

                objeto.style.cursor =
                    "grab";

            }
        );

    }


    /* ==================================================
       PROFUNDIDAD CON RUEDA
    ================================================== */

    function activarControlRueda(objeto) {

        objeto.addEventListener(
            "wheel",
            e => {

                e.preventDefault();

                let z =
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
       UTILIDADES
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
