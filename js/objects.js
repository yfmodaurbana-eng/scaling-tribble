/* ==================================================
   ACUARIO DESIGNER STUDIO V8.2
   SISTEMA DE OBJETOS 3D REAL
   X + Y + Z
================================================== */

console.log("OBJECTS ENGINE V8.2 CARGADO");


document.addEventListener("DOMContentLoaded", () => {


    const tanque =
        document.querySelector(".tank-3d");


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

        zMin: 0,
        zMax: 250

    };


    /* ==================================================
       BOTONES
    ================================================== */

    document
        .querySelectorAll(".tool")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                const texto =
                    btn.innerText;


                if (texto.includes("Roca")) {

                    crearObjeto(
                        "roca",
                        "🪨"
                    );

                }


                if (texto.includes("Planta")) {

                    crearObjeto(
                        "planta",
                        "🌱"
                    );

                }


                if (texto.includes("Pez")) {

                    crearObjeto(
                        "pez",
                        "🐟"
                    );

                }


                if (texto.includes("Luz")) {

                    activarLuz();

                }

            });

        });


    /* ==================================================
       CREAR OBJETO 3D
    ================================================== */

    window.crearObjeto =
        function(tipo, icono) {


            const objeto =
                document.createElement("div");


            objeto.className =
                "objeto " + tipo;


            objeto.innerHTML =
                icono;


            /*
                Posición inicial aleatoria
                en X, Y y Z.
            */

            const x =
                random(
                    CONFIG.xMin + 10,
                    CONFIG.xMax - 10
                );


            const y =
                random(
                    20,
                    78
                );


            const z =
                random(
                    CONFIG.zMin + 10,
                    Math.min(
                        CONFIG.zMax - 10,
                        obtenerProfundidad()
                    )
                );


            objeto.dataset.x =
                x;


            objeto.dataset.y =
                y;


            objeto.dataset.z =
                z;


            /*
                Evitamos que el CSS
                antiguo interfiera.
            */

            objeto.style.left =
                "0";


            objeto.style.top =
                "0";


            objeto.style.bottom =
                "auto";


            objeto.style.transformStyle =
                "preserve-3d";


            actualizarPosicion3D(
                objeto
            );


            tanque.appendChild(
                objeto
            );


            hacerArrastrable3D(
                objeto
            );


            /*
                Animación solamente para
                peces y plantas.
            */

            if (
                tipo === "pez" ||
                tipo === "planta"
            ) {

                objeto.classList.add(
                    "animada"
                );

            }


            return objeto;

        };


    /* ==================================================
       OBTENER PROFUNDIDAD ACTUAL
    ================================================== */

    function obtenerProfundidad() {

        const valor =
            getComputedStyle(tanque)
            .getPropertyValue("--depth");


        const profundidad =
            parseFloat(valor);


        if (
            Number.isFinite(
                profundidad
            )
        ) {

            return profundidad;

        }


        return 150;

    }


    /* ==================================================
       POSICIÓN 3D
    ================================================== */

    function actualizarPosicion3D(
        objeto
    ) {


        const x =
            limitar(
                Number(objeto.dataset.x),
                CONFIG.xMin,
                CONFIG.xMax
            );


        const y =
            limitar(
                Number(objeto.dataset.y),
                CONFIG.yMin,
                CONFIG.yMax
            );


        const zMax =
            obtenerProfundidad();


        const z =
            limitar(
                Number(objeto.dataset.z),
                CONFIG.zMin,
                zMax
            );


        objeto.dataset.x =
            x;


        objeto.dataset.y =
            y;


        objeto.dataset.z =
            z;


        objeto.style.transform =
            `translate3d(
                ${x}%,
                ${y}%,
                ${z}px
            )`;

    }


    /* ==================================================
       ARRASTRE 3D
    ================================================== */

    function hacerArrastrable3D(
        objeto
    ) {


        let moviendo =
            false;


        let inicioX =
            0;


        let inicioY =
            0;


        let inicioZ =
            0;


        let inicioMouseX =
            0;


        let inicioMouseY =
            0;


        objeto.addEventListener(
            "mousedown",
            e => {


                /*
                    Solo botón izquierdo.
                */

                if (
                    e.button !== 0
                ) {

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


                inicioZ =
                    Number(
                        objeto.dataset.z
                    );


                objeto.classList.add(
                    "seleccionado"
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
                    Movimiento horizontal:
                    X
                */

                let nuevoX =
                    inicioX +
                    dx * 0.18;


                /*
                    Movimiento vertical:
                    Y
                */

                let nuevoY =
                    inicioY +
                    dy * 0.18;


                /*
                    Movimiento de profundidad:
                    
                    SHIFT + ratón
                    modifica Z.

                    Esto permite controlar
                    las tres dimensiones sin
                    añadir botones todavía.
                */

                let nuevoZ =
                    inicioZ;


                if (e.shiftKey) {

                    nuevoZ =
                        inicioZ -
                        dy * 0.9;

                }


                /*
                    ALT + ratón también
                    permite controlar Z.
                */

                if (e.altKey) {

                    nuevoZ =
                        inicioZ +
                        dx * 0.9;

                }


                objeto.dataset.x =
                    limitar(
                        nuevoX,
                        CONFIG.xMin,
                        CONFIG.xMax
                    );


                objeto.dataset.y =
                    limitar(
                        nuevoY,
                        CONFIG.yMin,
                        CONFIG.yMax
                    );


                objeto.dataset.z =
                    limitar(
                        nuevoZ,
                        CONFIG.zMin,
                        obtenerProfundidad()
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


                moviendo =
                    false;


                objeto.style.cursor =
                    "grab";


                objeto.classList.remove(
                    "seleccionado"
                );

            }
        );

    }


    /* ==================================================
       RUEDA DEL RATÓN
       CONTROL DE PROFUNDIDAD
    ================================================== */

    function activarControlRueda(
        objeto
    ) {


        objeto.addEventListener(
            "wheel",
            e => {


                e.preventDefault();


                let z =
                    Number(
                        objeto.dataset.z
                    );


                z +=
                    e.deltaY * -0.35;


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
       OBSERVAR NUEVOS OBJETOS
    ================================================== */

    const observer =
        new MutationObserver(
            cambios => {


                cambios.forEach(
                    cambio => {


                        cambio.addedNodes
                            .forEach(
                                nodo => {


                                    if (
                                        !nodo.classList ||
                                        !nodo.classList.contains(
                                            "objeto"
                                        )
                                    ) {

                                        return;

                                    }


                                    activarControlRueda(
                                        nodo
                                    );

                                }
                            );

                    }
                );

            }
        );


    observer.observe(
        tanque,
        {
            childList: true
        }
    );


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


        if (
            !Number.isFinite(valor)
        ) {

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
       EXPONER FUNCIÓN
    ================================================== */

    window.actualizarPosicion3D =
        actualizarPosicion3D;


});
