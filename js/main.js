/* =========================================================
   AQUARIUM STUDIO
   MAIN.JS
   Control del editor 3D
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /*
     * Solo ejecutamos el código del editor
     * si existe el canvas.
     */
    const canvas =
        document.getElementById("aquariumCanvas");

    if (!canvas) {
        return;
    }


    /* =====================================================
       ELEMENTOS
    ===================================================== */

    const objectCount =
        document.getElementById("objectCount");

    const zoomValue =
        document.getElementById("zoomValue");

    const zoomIn =
        document.getElementById("zoomIn");

    const zoomOut =
        document.getElementById("zoomOut");

    const fullscreenButton =
        document.getElementById("fullscreenButton");

    const saveButton =
        document.getElementById("saveButton");

    const undoButton =
        document.getElementById("undoButton");

    const redoButton =
        document.getElementById("redoButton");

    const aquariumContainer =
        document.getElementById("aquariumContainer");

    const stageMessage =
        document.querySelector(".stage-message");


    /* =====================================================
       INICIAR MOTOR 3D
    ===================================================== */

    if (
        window.Aquarium3D &&
        typeof window.Aquarium3D.init === "function"
    ) {

        window.Aquarium3D.init(canvas);

    } else {

        console.error(
            "Aquarium3D no está disponible."
        );

        return;
    }


    /* =====================================================
       HISTORIAL
    ===================================================== */

    const history = [];

    let historyIndex = -1;


    function getCurrentState() {

        return JSON.stringify(
            window.Aquarium3D.getObjects()
        );
    }


    function saveHistory() {

        const state =
            getCurrentState();

        /*
         * Si estamos en medio del historial
         * eliminamos los estados posteriores.
         */
        history.splice(
            historyIndex + 1
        );

        history.push(state);

        historyIndex =
            history.length - 1;
    }


    function restoreState(state) {

        if (!state) {
            return;
        }

        try {

            const objects =
                JSON.parse(state);

            /*
             * Recargamos la página de forma controlada
             * si necesitamos restaurar un estado.
             *
             * Esta primera versión deja preparado
             * el historial para la siguiente etapa.
             */

            console.log(
                "Estado restaurado:",
                objects
            );

        } catch (error) {

            console.error(
                "No se pudo restaurar el estado.",
                error
            );
        }
    }


    /* =====================================================
       CONTADOR
    ===================================================== */

    function updateObjectCount() {

        const objects =
            window.Aquarium3D.getObjects();

        if (objectCount) {

            objectCount.textContent =
                objects.length;
        }

        updateEmptyMessage(
            objects.length
        );
    }


    /* =====================================================
       MENSAJE DEL ACUARIO
    ===================================================== */

    function updateEmptyMessage(count) {

        if (!stageMessage) {
            return;
        }

        /*
         * Tenemos elementos de demostración
         * en el motor, por lo que ocultamos
         * el mensaje cuando hay objetos.
         */
        if (count > 0) {

            stageMessage.style.opacity =
                "0";

            stageMessage.style.pointerEvents =
                "none";

        } else {

            stageMessage.style.opacity =
                "1";

            stageMessage.style.pointerEvents =
                "auto";
        }
    }


    /* =====================================================
       AÑADIR ELEMENTOS
    ===================================================== */

    document
        .querySelectorAll("[data-add]")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const type =
                        button.dataset.add;

                    addElement(type);
                }
            );

        });


    function addElement(type) {

        let x =
            0.25 +
            Math.random() * 0.5;

        let y =
            0.25 +
            Math.random() * 0.45;

        let scale =
            0.7 +
            Math.random() * 0.5;


        /*
         * Las plantas y rocas aparecen
         * cerca del fondo.
         */

        if (type === "plant") {

            y = 0.82;

        }

        if (type === "rock") {

            y = 0.86;

        }


        const object =
            window.Aquarium3D.addObject(
                type,
                {
                    x,
                    y,
                    scale
                }
            );


        console.log(
            "Elemento añadido:",
            object
        );


        saveHistory();

        updateObjectCount();

        showAddFeedback(type);
    }


    /* =====================================================
       FEEDBACK AL AÑADIR
    ===================================================== */

    function showAddFeedback(type) {

        const names = {

            fish:
                "Pez añadido",

            plant:
                "Planta añadida",

            rock:
                "Roca añadida",

            decoration:
                "Decoración añadida",

            light:
                "Iluminación añadida"

        };

        const message =
            names[type] ||
            "Elemento añadido";


        /*
         * Pequeña notificación temporal.
         */

        const notification =
            document.createElement("div");

        notification.textContent =
            message;

        notification.style.position =
            "fixed";

        notification.style.left =
            "50%";

        notification.style.bottom =
            "90px";

        notification.style.transform =
            "translateX(-50%)";

        notification.style.zIndex =
            "9999";

        notification.style.padding =
            "10px 16px";

        notification.style.border =
            "1px solid rgba(57,223,255,0.25)";

        notification.style.borderRadius =
            "10px";

        notification.style.background =
            "rgba(3,20,28,0.94)";

        notification.style.color =
            "#e8faff";

        notification.style.fontSize =
            "13px";

        notification.style.boxShadow =
            "0 15px 40px rgba(0,0,0,0.35)";

        notification.style.backdropFilter =
            "blur(12px)";

        notification.style.opacity =
            "0";

        notification.style.transition =
            "opacity .2s ease";


        document.body.appendChild(
            notification
        );


        requestAnimationFrame(() => {

            notification.style.opacity =
                "1";

        });


        setTimeout(() => {

            notification.style.opacity =
                "0";

            setTimeout(() => {

                notification.remove();

            }, 250);

        }, 1200);
    }


    /* =====================================================
       ZOOM
    ===================================================== */

    let zoom =
        window.Aquarium3D.getZoom();


    function updateZoom() {

        const percentage =
            Math.round(
                zoom * 100
            );

        if (zoomValue) {

            zoomValue.textContent =
                `${percentage}%`;
        }

        window.Aquarium3D.setZoom(
            zoom
        );
    }


    if (zoomIn) {

        zoomIn.addEventListener(
            "click",
            () => {

                zoom =
                    Math.min(
                        2,
                        zoom + 0.1
                    );

                updateZoom();
            }
        );

    }


    if (zoomOut) {

        zoomOut.addEventListener(
            "click",
            () => {

                zoom =
                    Math.max(
                        0.5,
                        zoom - 0.1
                    );

                updateZoom();
            }
        );

    }


    updateZoom();


    /* =====================================================
       PANTALLA COMPLETA
    ===================================================== */

    if (fullscreenButton) {

        fullscreenButton.addEventListener(
            "click",
            async () => {

                try {

                    if (!document.fullscreenElement) {

                        await aquariumContainer
                            .requestFullscreen();

                    } else {

                        await document.exitFullscreen();

                    }

                } catch (error) {

                    console.error(
                        "No se pudo activar pantalla completa.",
                        error
                    );
                }

            }
        );
    }


    /* =====================================================
       GUARDAR
    ===================================================== */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

                const objects =
                    window.Aquarium3D.getObjects();

                localStorage.setItem(
                    "aquariumStudio",
                    JSON.stringify(objects)
                );


                const original =
                    saveButton.innerHTML;


                saveButton.innerHTML =
                    "✓ <span>Guardado</span>";


                setTimeout(() => {

                    saveButton.innerHTML =
                        original;

                }, 1500);


                console.log(
                    "Acuario guardado.",
                    objects
                );
            }
        );
    }


    /* =====================================================
       CARGAR
    ===================================================== */

    function loadSavedAquarium() {

        const saved =
            localStorage.getItem(
                "aquariumStudio"
            );

        if (!saved) {
            return;
        }

        try {

            const objects =
                JSON.parse(saved);

            console.log(
                "Acuario guardado encontrado:",
                objects
            );

        } catch (error) {

            console.error(
                "Error cargando el acuario.",
                error
            );
        }
    }


    loadSavedAquarium();


    /* =====================================================
       DESHACER
    ===================================================== */

    if (undoButton) {

        undoButton.addEventListener(
            "click",
            () => {

                if (
                    historyIndex <= 0
                ) {

                    console.log(
                        "No hay acciones para deshacer."
                    );

                    return;
                }


                historyIndex--;

                restoreState(
                    history[historyIndex]
                );

                console.log(
                    "Deshacer"
                );

            }
        );
    }


    /* =====================================================
       REHACER
    ===================================================== */

    if (redoButton) {

        redoButton.addEventListener(
            "click",
            () => {

                if (
                    historyIndex >=
                    history.length - 1
                ) {

                    console.log(
                        "No hay acciones para rehacer."
                    );

                    return;
                }


                historyIndex++;

                restoreState(
                    history[historyIndex]
                );

                console.log(
                    "Rehacer"
                );

            }
        );
    }


    /* =====================================================
       ESTADO INICIAL
    ===================================================== */

    updateObjectCount();

    saveHistory();


    console.log(
        "Aquarium Studio iniciado correctamente."
    );

});
