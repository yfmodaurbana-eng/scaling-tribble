/* =========================================================
   AQUARIUM STUDIO
   MOTOR 3D — ACUARIO TROPICAL
   Peces multicolor + plantas + rocas +
   decoración + iluminación + burbujas

   CONTROLES:

   - Click/touch + arrastrar = mover objeto
   - Soltar un objeto fuera del acuario = eliminarlo
   - Los peces se detienen mientras se arrastran
   ========================================================= */

const Aquarium3D = (() => {

    let canvas = null;
    let ctx = null;

    let width = 0;
    let height = 0;

    let animationFrame = null;

    const aquarium = {
        waterLevel: 0.08,
        sandLevel: 0.82,
        objects: []
    };

    const camera = {
        zoom: 1
    };

    /* =====================================================
       SISTEMA DE ARRASTRE
    ===================================================== */

    const drag = {
        active: false,
        object: null,
        pointerId: null,
        offsetX: 0,
        offsetY: 0
    };

    let selectedObjectId = null;

    /* =====================================================
       TIPOS DE PECES
    ===================================================== */

    const fishTypes = {

        clownfish: {
            body1: "#ffd27a",
            body2: "#ff8a22",
            body3: "#d94a0b",
            fin: "#ff9d32",
            stripe: "#ffffff"
        },

        blue: {
            body1: "#8cecff",
            body2: "#159fe8",
            body3: "#07549c",
            fin: "#0b8fd1",
            stripe: "#d5fbff"
        },

        yellow: {
            body1: "#fffca0",
            body2: "#ffd52e",
            body3: "#d99800",
            fin: "#f5bd00",
            stripe: "#fff5a8"
        },

        coral: {
            body1: "#ffc1b5",
            body2: "#f0606b",
            body3: "#b72e48",
            fin: "#df4e61",
            stripe: "#ffdcd6"
        },

        violet: {
            body1: "#edc8ff",
            body2: "#a65ce6",
            body3: "#59269b",
            fin: "#8d4bd0",
            stripe: "#f5dcff"
        },

        turquoise: {
            body1: "#a7fff7",
            body2: "#27d7c7",
            body3: "#087f91",
            fin: "#18bdb7",
            stripe: "#dcfffb"
        }
    };

    const fishTypeNames = [
        "clownfish",
        "blue",
        "yellow",
        "coral",
        "violet",
        "turquoise"
    ];

    /* =====================================================
       INICIALIZAR
    ===================================================== */

    function init(canvasElement) {

        if (!canvasElement) {
            console.error(
                "Aquarium3D: canvas no encontrado."
            );
            return;
        }

        canvas = canvasElement;

        ctx = canvas.getContext("2d");

        if (!ctx) {
            console.error(
                "Aquarium3D: no se pudo obtener el contexto 2D."
            );
            return;
        }

        resize();

        window.addEventListener(
            "resize",
            resize
        );

        setupPointerEvents();

        createDemoAquarium();

        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }

        animate();
    }

    /* =====================================================
       RESIZE
    ===================================================== */

    function resize() {

        if (!canvas || !ctx) {
            return;
        }

        const rect =
            canvas.getBoundingClientRect();

        width =
            Math.max(1, rect.width);

        height =
            Math.max(1, rect.height);

        const pixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        canvas.width =
            Math.floor(width * pixelRatio);

        canvas.height =
            Math.floor(height * pixelRatio);

        ctx.setTransform(
            pixelRatio,
            0,
            0,
            pixelRatio,
            0,
            0
        );
    }

    /* =====================================================
       EVENTOS
    ===================================================== */

    function setupPointerEvents() {

        if (!canvas) {
            return;
        }

        canvas.style.touchAction = "none";

        canvas.addEventListener(
            "pointerdown",
            handlePointerDown
        );

        canvas.addEventListener(
            "pointermove",
            handlePointerMove
        );

        canvas.addEventListener(
            "pointerup",
            handlePointerUp
        );

        canvas.addEventListener(
            "pointercancel",
            handlePointerUp
        );
    }

    /* =====================================================
       POINTER DOWN
    ===================================================== */

    function handlePointerDown(event) {

        if (!canvas) {
            return;
        }

        const point =
            getPointerPosition(event);

        const object =
            findObjectAt(
                point.x,
                point.y
            );

        if (!object) {

            selectedObjectId = null;

            return;
        }

        drag.active = true;

        drag.object = object;

        drag.pointerId =
            event.pointerId;

        drag.offsetX =
            object.x - point.x;

        drag.offsetY =
            object.y - point.y;

        selectedObjectId =
            object.id;

        object.dragging = true;

        /*
         * Guardar velocidad del pez.
         */

        if (object.type === "fish") {

            object.dragOldVx =
                Number.isFinite(object.vx)
                    ? object.vx
                    : 0;

            object.dragOldVy =
                Number.isFinite(object.vy)
                    ? object.vy
                    : 0;

            object.vx = 0;
            object.vy = 0;

            object.renderX = object.x;
            object.renderY = object.y;
        }

        try {

            canvas.setPointerCapture(
                event.pointerId
            );

        } catch (error) {
            /* Pointer Capture no disponible */
        }

        event.preventDefault();
    }

    /* =====================================================
       POINTER MOVE
    ===================================================== */

    function handlePointerMove(event) {

        if (
            !drag.active ||
            !drag.object
        ) {
            return;
        }

        if (
            event.pointerId !==
            drag.pointerId
        ) {
            return;
        }

        /*
         * IMPORTANTE:
         *
         * Mientras se arrastra usamos las coordenadas
         * reales del puntero aunque estén fuera del canvas.
         *
         * Esto permite llevar el objeto hasta el borde
         * y sacarlo completamente de la zona del acuario.
         */

        const point =
            getRawPointerPosition(event);

        const object =
            drag.object;

        object.x =
            point.x +
            drag.offsetX;

        object.y =
            point.y +
            drag.offsetY;

        /*
         * No limitamos X/Y durante el arrastre.
         *
         * Así el objeto puede salir del acuario.
         */

        if (object.type === "fish") {

            object.targetX = object.x;
            object.targetY = object.y;

            object.renderX = object.x;
            object.renderY = object.y;
        }

        event.preventDefault();
    }

    /* =====================================================
       POINTER UP
    ===================================================== */

    function handlePointerUp(event) {

        if (
            !drag.active ||
            !drag.object
        ) {
            return;
        }

        if (
            drag.pointerId !== null &&
            event.pointerId !== drag.pointerId
        ) {
            return;
        }

        const object =
            drag.object;

        /*
         * Comprobamos la posición FINAL del puntero.
         *
         * Si está fuera del canvas, eliminamos el objeto.
         */

        const outside =
            isPointerOutsideCanvas(event);

        if (outside) {

            const removedId =
                object.id;

            object.dragging = false;

            removeObject(
                removedId
            );

            drag.active = false;
            drag.object = null;
            drag.pointerId = null;

            try {

                canvas.releasePointerCapture(
                    event.pointerId
                );

            } catch (error) {
                /* Nada */
            }

            event.preventDefault();

            return;
        }

        /*
         * Si sigue dentro del acuario,
         * corregimos la posición para que
         * nunca quede parcialmente fuera.
         */

        object.x =
            clamp(
                object.x,
                0.04,
                0.96
            );

        object.y =
            clamp(
                object.y,
                0.04,
                0.96
            );

        object.dragging = false;

        /*
         * El pez vuelve a nadar.
         */

        if (object.type === "fish") {

            object.vx =
                Number.isFinite(
                    object.dragOldVx
                )
                    ? object.dragOldVx
                    : 0.000035;

            object.vy =
                Number.isFinite(
                    object.dragOldVy
                )
                    ? object.dragOldVy
                    : 0;

            object.targetX =
                clamp(
                    object.x +
                    (
                        Math.random() - 0.5
                    ) * 0.30,

                    0.08,
                    0.92
                );

            object.targetY =
                clamp(
                    object.y +
                    (
                        Math.random() - 0.5
                    ) * 0.20,

                    0.08,
                    0.90
                );

            object.nextDecision =
                performance.now() +
                2500 +
                Math.random() * 5000;
        }

        drag.active = false;
        drag.object = null;
        drag.pointerId = null;

        try {

            canvas.releasePointerCapture(
                event.pointerId
            );

        } catch (error) {
            /* Nada */
        }

        event.preventDefault();
    }

    /* =====================================================
       POSICIÓN POINTER DENTRO DEL CANVAS
    ===================================================== */

    function getPointerPosition(event) {

        const rect =
            canvas.getBoundingClientRect();

        return {

            x:
                clamp(
                    (
                        event.clientX -
                        rect.left
                    ) / rect.width,

                    0,
                    1
                ),

            y:
                clamp(
                    (
                        event.clientY -
                        rect.top
                    ) / rect.height,

                    0,
                    1
                )
        };
    }

    /* =====================================================
       POSICIÓN POINTER SIN LIMITAR
    ===================================================== */

    function getRawPointerPosition(event) {

        const rect =
            canvas.getBoundingClientRect();

        return {

            x:
                (
                    event.clientX -
                    rect.left
                ) / rect.width,

            y:
                (
                    event.clientY -
                    rect.top
                ) / rect.height
        };
    }

    /* =====================================================
       COMPROBAR SI ESTÁ FUERA
    ===================================================== */

    function isPointerOutsideCanvas(event) {

        if (!canvas) {
            return true;
        }

        const rect =
            canvas.getBoundingClientRect();

        return (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
        );
    }

    /* =====================================================
       BUSCAR OBJETO
    ===================================================== */

    function findObjectAt(
        normalizedX,
        normalizedY
    ) {

        if (
            !Array.isArray(
                aquarium.objects
            )
        ) {
            return null;
        }

        /*
         * Último objeto añadido = prioridad.
         */

        for (
            let i =
                aquarium.objects.length - 1;
            i >= 0;
            i--
        ) {

            const object =
                aquarium.objects[i];

            if (!object) {
                continue;
            }

            const distanceX =
                (
                    normalizedX -
                    object.x
                ) * width;

            const distanceY =
                (
                    normalizedY -
                    object.y
                ) * height;

            const radius =
                getObjectHitRadius(object);

            const distance =
                Math.sqrt(
                    distanceX * distanceX +
                    distanceY * distanceY
                );

            if (distance <= radius) {
                return object;
            }
        }

        return null;
    }

    /* =====================================================
       ÁREA DE SELECCIÓN
    ===================================================== */

    function getObjectHitRadius(object) {

        if (!object) {
            return 30;
        }

        const scale =
            Number.isFinite(object.scale)
                ? object.scale
                : 1;

        switch (object.type) {

            case "fish":
                return 65 * scale;

            case "plant":
                return 55 * scale;

            case "rock":
                return 55 * scale;

            case "decoration":
                return 60 * scale;

            case "light":
                return 55 * scale;

            default:
                return 50 * scale;
        }
    }

    /* =====================================================
       ACUARIO DEMO
    ===================================================== */

    function createDemoAquarium() {

        /*
         * ACUARIO VACÍO POR DEFECTO.
         *
         * No se añade ningún objeto automáticamente.
         */

        aquarium.objects = [];
    }

    /* =====================================================
       CREAR PEZ
    ===================================================== */

    function createFishObject(
        id,
        variant,
        x,
        y,
        scale,
        direction
    ) {

        const speed =
            0.000035 +
            Math.random() * 0.000015;

        const angle =
            direction === -1
                ? Math.PI
                : 0;

        return {

            id,
            type: "fish",

            variant:
                fishTypes[variant]
                    ? variant
                    : "clownfish",

            x,
            y,

            renderX: x,
            renderY: y,

            scale,

            speed,

            direction,

            angle,

            vx:
                Math.cos(angle) *
                speed,

            vy: 0,

            targetX: x,
            targetY: y,

            nextDecision:
                performance.now() +
                3000 +
                Math.random() * 5000,

            dragging: false
        };
    }

    /* =====================================================
       ANIMACIÓN
    ===================================================== */

    function animate(time = 0) {

        draw(time);

        animationFrame =
            requestAnimationFrame(
                animate
            );
    }

    /* =====================================================
       DIBUJAR TODO
    ===================================================== */

    function draw(time) {

        if (!ctx) {
            return;
        }

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        drawBackground();
        drawWater();
        drawRays(time);
        drawObjects(time);
        drawBubbles(time);
        drawSand();
        drawGlass();
    }

    /* =====================================================
       FONDO
    ===================================================== */

    function drawBackground() {

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                height
            );

        gradient.addColorStop(
            0,
            "#063b50"
        );

        gradient.addColorStop(
            0.45,
            "#052d3e"
        );

        gradient.addColorStop(
            1,
            "#031923"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );
    }

    /* =====================================================
       AGUA
    ===================================================== */

    function drawWater() {

        const waterHeight =
            height *
            aquarium.waterLevel;

        const gradient =
            ctx.createLinearGradient(
                0,
                0,
                0,
                waterHeight + 120
            );

        gradient.addColorStop(
            0,
            "rgba(130,235,255,0.18)"
        );

        gradient.addColorStop(
            1,
            "rgba(30,150,190,0)"
        );

        ctx.fillStyle = gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height * 0.55
        );
    }

    /* =====================================================
       RAYOS
    ===================================================== */

    function drawRays(time) {

        const movement =
            Math.sin(
                time * 0.00025
            ) * 25;

        ctx.save();

        ctx.globalAlpha = 0.08;
        ctx.fillStyle = "#b9f6ff";

        ctx.beginPath();

        ctx.moveTo(
            width * 0.28 + movement,
            0
        );

        ctx.lineTo(
            width * 0.45 + movement,
            0
        );

        ctx.lineTo(
            width * 0.63,
            height
        );

        ctx.lineTo(
            width * 0.48,
            height
        );

        ctx.closePath();

        ctx.fill();

        ctx.restore();
    }

    /* =====================================================
       OBJETOS
    ===================================================== */

    function drawObjects(time) {

        if (
            !Array.isArray(
                aquarium.objects
            )
        ) {
            return;
        }

        for (
            const object of aquarium.objects
        ) {

            if (!object) {
                continue;
            }

            if (object.type === "fish") {

                updateFish(
                    object,
                    time
                );

                drawFish(
                    object,
                    time
                );

            } else if (
                object.type === "plant"
            ) {

                drawPlant(
                    object,
                    time
                );

            } else if (
                object.type === "rock"
            ) {

                drawRock(object);

            } else if (
                object.type === "decoration"
            ) {

                drawDecoration(
                    object,
                    time
                );

            } else if (
                object.type === "light"
            ) {

                drawLight(
                    object,
                    time
                );
            }
        }
    }
