/* =========================================================
   AQUARIUM STUDIO
   MOTOR 3D — ACUARIO TROPICAL
   Peces multicolor + plantas + rocas +
   decoración + iluminación + burbujas

   CONTROLES:
   - Click/touch + arrastrar = mover objeto
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

            /*
             * Evita cualquier salto visual.
             */

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

        const point =
            getPointerPosition(event);

        const object =
            drag.object;

        object.x =
            clamp(
                point.x + drag.offsetX,
                0.04,
                0.96
            );

        object.y =
            clamp(
                point.y + drag.offsetY,
                0.04,
                0.96
            );

        /*
         * Sincronizar render y destino.
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

            /*
             * Crear un nuevo destino.
             */

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
       POSICIÓN POINTER
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

        aquarium.objects = [

            createFishObject(
                "fish-1",
                "clownfish",
                0.23,
                0.32,
                0.95,
                1
            ),

            createFishObject(
                "fish-2",
                "blue",
                0.68,
                0.28,
                0.82,
                -1
            ),

            createFishObject(
                "fish-3",
                "yellow",
                0.45,
                0.45,
                0.72,
                1
            ),

            createFishObject(
                "fish-4",
                "coral",
                0.79,
                0.53,
                0.68,
                -1
            ),

            createFishObject(
                "fish-5",
                "violet",
                0.18,
                0.56,
                0.62,
                1
            ),

            createFishObject(
                "fish-6",
                "turquoise",
                0.57,
                0.63,
                0.88,
                -1
            ),

            {
                id: "plant-1",
                type: "plant",
                x: 0.10,
                y: 0.82,
                scale: 1.1
            },

            {
                id: "plant-2",
                type: "plant",
                x: 0.28,
                y: 0.82,
                scale: 0.85
            },

            {
                id: "plant-3",
                type: "plant",
                x: 0.48,
                y: 0.82,
                scale: 1.25
            },

            {
                id: "plant-4",
                type: "plant",
                x: 0.73,
                y: 0.82,
                scale: 0.95
            },

            {
                id: "plant-5",
                type: "plant",
                x: 0.91,
                y: 0.82,
                scale: 0.75
            },

            {
                id: "rock-1",
                type: "rock",
                x: 0.28,
                y: 0.86,
                scale: 1
            },

            {
                id: "rock-2",
                type: "rock",
                x: 0.66,
                y: 0.86,
                scale: 0.8
            }
        ];
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

    /* =====================================================
       ACTUALIZAR PEZ
    ===================================================== */

    function updateFish(
        fish,
        time
    ) {

        if (fish.dragging) {

            fish.renderX = fish.x;
            fish.renderY = fish.y;

            return;
        }

        if (!Number.isFinite(fish.x)) {
            fish.x = 0.5;
        }

        if (!Number.isFinite(fish.y)) {
            fish.y = 0.45;
        }

        if (!Number.isFinite(fish.speed)) {

            fish.speed =
                0.000035 +
                Math.random() * 0.000015;
        }

        if (
            fish.direction !== 1 &&
            fish.direction !== -1
        ) {

            fish.direction =
                Math.random() > 0.5
                    ? 1
                    : -1;
        }

        if (!Number.isFinite(fish.angle)) {

            fish.angle =
                fish.direction === -1
                    ? Math.PI
                    : 0;
        }

        if (!Number.isFinite(fish.vx)) {

            fish.vx =
                Math.cos(fish.angle) *
                fish.speed;
        }

        if (!Number.isFinite(fish.vy)) {
            fish.vy = 0;
        }

        if (!Number.isFinite(fish.targetX)) {
            fish.targetX = fish.x;
        }

        if (!Number.isFinite(fish.targetY)) {
            fish.targetY = fish.y;
        }

        if (!Number.isFinite(fish.nextDecision)) {

            fish.nextDecision =
                time +
                5000 +
                Math.random() * 7000;
        }

        if (time > fish.nextDecision) {

            fish.targetX =
                clamp(
                    fish.x +
                    (
                        Math.random() - 0.5
                    ) * 0.45,

                    0.12,
                    0.88
                );

            fish.targetY =
                clamp(
                    fish.y +
                    (
                        Math.random() - 0.5
                    ) * 0.24,

                    0.12,
                    0.88
                );

            fish.nextDecision =
                time +
                5000 +
                Math.random() * 8000;
        }

        const dx =
            fish.targetX -
            fish.x;

        const dy =
            fish.targetY -
            fish.y;

        const distance =
            Math.sqrt(
                dx * dx +
                dy * dy
            );

        if (distance > 0.018) {

            const targetAngle =
                Math.atan2(
                    dy,
                    dx
                );

            let difference =
                targetAngle -
                fish.angle;

            while (
                difference > Math.PI
            ) {
                difference -=
                    Math.PI * 2;
            }

            while (
                difference < -Math.PI
            ) {
                difference +=
                    Math.PI * 2;
            }

            fish.angle +=
                difference * 0.006;
        }

        const desiredVX =
            Math.cos(fish.angle) *
            fish.speed;

        const desiredVY =
            Math.sin(fish.angle) *
            fish.speed;

        fish.vx +=
            (
                desiredVX -
                fish.vx
            ) * 0.008;

        fish.vy +=
            (
                desiredVY -
                fish.vy
            ) * 0.008;

        const wave =
            Math.sin(
                time * 0.00065 +
                String(fish.id).length * 1.7
            );

        fish.vy +=
            wave * 0.00000032;

        fish.x += fish.vx;
        fish.y += fish.vy;

        const left = 0.09;
        const right = 0.91;
        const top = 0.10;
        const bottom = 0.90;

        if (fish.x < left) {

            fish.x = left;

            fish.targetX =
                0.35 +
                Math.random() * 0.35;

            fish.angle = 0;
        }

        if (fish.x > right) {

            fish.x = right;

            fish.targetX =
                0.30 +
                Math.random() * 0.35;

            fish.angle = Math.PI;
        }

        if (fish.y < top) {

            fish.y = top;

            fish.targetY =
                0.25 +
                Math.random() * 0.25;
        }

        if (fish.y > bottom) {

            fish.y = bottom;

            fish.targetY =
                0.25 +
                Math.random() * 0.25;
        }

        fish.renderX = fish.x;
        fish.renderY = fish.y;
    }

    /* =====================================================
       DIBUJAR PEZ
    ===================================================== */

    function drawFish(
        fish,
        time
    ) {

        if (!ctx || !fish) {
            return;
        }

        const style =
            fishTypes[fish.variant] ||
            fishTypes.clownfish;

        const x =
            width *
            clamp(
                fish.renderX ?? fish.x,
                0.03,
                0.97
            );

        const y =
            height *
            clamp(
                fish.renderY ?? fish.y,
                0.03,
                0.97
            );

        const fishScale =
            45 *
            (
                Number.isFinite(fish.scale)
                    ? fish.scale
                    : 1
            );

        const angle =
            Number.isFinite(fish.angle)
                ? fish.angle
                : 0;

        const facingLeft =
            Math.cos(angle) < 0;

        ctx.save();

        ctx.translate(x, y);

        ctx.rotate(
            Math.sin(time * 0.0015) * 0.035
        );

        ctx.scale(
            facingLeft ? -1 : 1,
            1
        );

        /* COLA */

        const tailWave =
            Math.sin(
                time * 0.006 +
                String(fish.id).length
            ) *
            fishScale *
            0.07;

        ctx.fillStyle = style.fin;

        ctx.beginPath();

        ctx.moveTo(
            -fishScale * 0.52,
            0
        );

        ctx.quadraticCurveTo(
            -fishScale * 0.88,
            -fishScale * 0.12 + tailWave,
            -fishScale * 1.20,
            -fishScale * 0.58
        );

        ctx.quadraticCurveTo(
            -fishScale * 1.30,
            0,
            -fishScale * 1.20,
            fishScale * 0.58
        );

        ctx.quadraticCurveTo(
            -fishScale * 0.88,
            fishScale * 0.12 + tailWave,
            -fishScale * 0.52,
            0
        );

        ctx.closePath();

        ctx.fill();

        /* CUERPO */

        const body =
            ctx.createRadialGradient(
                -fishScale * 0.28,
                -fishScale * 0.25,
                fishScale * 0.08,
                0,
                0,
                fishScale
            );

        body.addColorStop(
            0,
            style.body1
        );

        body.addColorStop(
            0.42,
            style.body2
        );

        body.addColorStop(
            1,
            style.body3
        );

        ctx.fillStyle = body;

        ctx.beginPath();

        ctx.ellipse(
            0,
            0,
            fishScale,
            fishScale * 0.55,
            0,
            0,
            Math.PI * 2
        );

        ctx.fill();

        drawFishPattern(
            fish,
            style,
            fishScale
        );

        /* ALETA SUPERIOR */

        ctx.fillStyle = style.fin;

        ctx.beginPath();

        ctx.moveTo(
            -fishScale * 0.18,
            -fishScale * 0.38
        );

        ctx.quadraticCurveTo(
            fishScale * 0.02,
            -fishScale * 0.90,
            fishScale * 0.30,
            -fishScale * 0.35
        );

        ctx.closePath();

        ctx.fill();

        /* ALETA INFERIOR */

        ctx.beginPath();

        ctx.moveTo(
            -fishScale * 0.08,
            fishScale * 0.38
        );

        ctx.quadraticCurveTo(
            fishScale * 0.15,
            fishScale * 0.82,
            fishScale * 0.36,
            fishScale * 0.28
        );

        ctx.closePath();

        ctx.fill();

        /* OJO */

        ctx.fillStyle = "#ffffff";

        ctx.beginPath();

        ctx.arc(
            fishScale * 0.55,
            -fishScale * 0.18,
            fishScale * 0.12,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle = "#07151b";

        ctx.beginPath();

        ctx.arc(
            fishScale * 0.58,
            -fishScale * 0.18,
            fishScale * 0.055,
            0,
            Math.PI * 2
        );

        ctx.fill();

        /* BRILLO */

        ctx.fillStyle =
            "rgba(255,255,255,0.38)";

        ctx.beginPath();

        ctx.ellipse(
            -fishScale * 0.25,
            -fishScale * 0.22,
            fishScale * 0.28,
            fishScale * 0.09,
            -0.2,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

        /* SELECCIÓN */

        if (
            selectedObjectId === fish.id
        ) {

            ctx.save();

            ctx.strokeStyle =
                "rgba(255,255,255,0.8)";

            ctx.lineWidth = 2;

            ctx.setLineDash([
                5,
                4
            ]);

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                fishScale * 1.35,
                0,
                Math.PI * 2
            );

            ctx.stroke();

            ctx.restore();
        }
    }

    /* =====================================================
       PATRONES
    ===================================================== */

    function drawFishPattern(
        fish,
        style,
        fishScale
    ) {

        ctx.save();

        if (fish.variant === "clownfish") {

            ctx.fillStyle = style.stripe;

            ctx.beginPath();

            ctx.ellipse(
                -fishScale * 0.36,
                0,
                fishScale * 0.12,
                fishScale * 0.57,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.beginPath();

            ctx.ellipse(
                fishScale * 0.10,
                0,
                fishScale * 0.10,
                fishScale * 0.55,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

        } else if (fish.variant === "blue") {

            ctx.fillStyle =
                "rgba(255,255,255,0.25)";

            ctx.beginPath();

            ctx.ellipse(
                -fishScale * 0.25,
                -fishScale * 0.05,
                fishScale * 0.15,
                fishScale * 0.40,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

        } else if (fish.variant === "yellow") {

            ctx.fillStyle = style.stripe;

            ctx.beginPath();

            ctx.ellipse(
                -fishScale * 0.32,
                0,
                fishScale * 0.08,
                fishScale * 0.48,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

        } else if (fish.variant === "coral") {

            ctx.fillStyle = style.stripe;

            ctx.beginPath();

            ctx.ellipse(
                -fishScale * 0.27,
                0,
                fishScale * 0.12,
                fishScale * 0.48,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.beginPath();

            ctx.ellipse(
                fishScale * 0.14,
                0,
                fishScale * 0.08,
                fishScale * 0.42,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();

        } else if (fish.variant === "violet") {

            ctx.fillStyle =
                "rgba(255,255,255,0.28)";

            ctx.beginPath();

            ctx.arc(
                -fishScale * 0.35,
                -fishScale * 0.16,
                fishScale * 0.13,
                0,
                Math.PI * 2
            );

            ctx.fill();

            ctx.beginPath();

            ctx.arc(
                -fishScale * 0.05,
                fishScale * 0.18,
                fishScale * 0.08,
                0,
                Math.PI * 2
            );

            ctx.fill();

        } else if (fish.variant === "turquoise") {

            ctx.fillStyle = style.stripe;

            ctx.beginPath();

            ctx.ellipse(
                -fishScale * 0.38,
                -fishScale * 0.02,
                fishScale * 0.08,
                fishScale * 0.40,
                0,
                0,
                Math.PI * 2
            );

            ctx.fill();
        }

        ctx.restore();
    }

    /* =====================================================
       PLANTAS
    ===================================================== */

    function drawPlant(
        plant,
        time
    ) {

        if (!plant) {
            return;
        }

        const x =
            width *
            clamp(
                plant.x ?? 0.5,
                0.03,
                0.97
            );

        const baseY =
            height *
            clamp(
                plant.y ?? aquarium.sandLevel,
                0.05,
                0.95
            );

        const scale =
            70 *
            (
                Number.isFinite(plant.scale)
                    ? plant.scale
                    : 1
            );

        const movement =
            Math.sin(
                time * 0.0015 +
                plant.x * 10
            ) * 5;

        ctx.save();

        ctx.translate(
            x,
            baseY
        );

        ctx.strokeStyle =
            "#32bd83";

        ctx.lineWidth =
            7 *
            (
                Number.isFinite(plant.scale)
                    ? plant.scale
                    : 1
            );

        ctx.lineCap = "round";

        for (
            let i = -1;
            i <= 1;
            i++
        ) {

            ctx.beginPath();

            ctx.moveTo(
                i * scale * 0.16,
                5
            );

            ctx.quadraticCurveTo(
                i * scale * 0.08,
                -scale * 0.45,
                i * scale * 0.25 + movement,
                -scale
            );

            ctx.stroke();
        }

        ctx.restore();

        drawSelection(
            plant,
            x,
            baseY - scale * 0.45,
            scale * 0.75
        );
    }

    /* =====================================================
       ROCAS
    ===================================================== */

    function drawRock(rock) {

        if (!rock) {
            return;
        }

        const x =
            width *
            clamp(
                rock.x ?? 0.5,
                0.03,
                0.97
            );

        const y =
            height *
            clamp(
                rock.y ?? 0.86,
                0.05,
                0.95
            );

        const scale =
            45 *
            (
                Number.isFinite(rock.scale)
                    ? rock.scale
                    : 1
            );

        ctx.save();

        ctx.translate(
            x,
            y
        );

        const gradient =
            ctx.createLinearGradient(
                0,
                -scale,
                0,
                scale
            );

        gradient.addColorStop(
            0,
            "#53636a"
        );

        gradient.addColorStop(
            1,
            "#253238"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.moveTo(
            -scale,
            0
        );

        ctx.quadraticCurveTo(
            -scale * 0.8,
            -scale * 0.9,
            0,
            -scale
        );

        ctx.quadraticCurveTo(
            scale * 0.9,
            -scale * 0.7,
            scale,
            0
        );

        ctx.quadraticCurveTo(
            scale * 0.6,
            scale * 0.55,
            0,
            scale * 0.45
        );

        ctx.quadraticCurveTo(
            -scale * 0.7,
            scale * 0.6,
            -scale,
            0
        );

        ctx.closePath();

        ctx.fill();

        ctx.restore();

        drawSelection(
            rock,
            x,
            y,
            scale * 1.25
        );
    }

    /* =====================================================
       DECORACIÓN
    ===================================================== */

    function drawDecoration(
        object,
        time
    ) {

        if (!object) {
            return;
        }

        const x =
            width *
            clamp(
                object.x ?? 0.5,
                0.03,
                0.97
            );

        const y =
            height *
            clamp(
                object.y ?? 0.72,
                0.05,
                0.95
            );

        const scale =
            42 *
            (
                Number.isFinite(object.scale)
                    ? object.scale
                    : 1
            );

        ctx.save();

        ctx.translate(
            x,
            y
        );

        ctx.rotate(
            (
                Number.isFinite(object.rotation)
                    ? object.rotation
                    : 0
            ) +
            Math.sin(time * 0.001) * 0.03
        );

        ctx.fillStyle = "#70452b";

        ctx.beginPath();

        ctx.moveTo(
            -scale,
            0
        );

        ctx.lineTo(
            scale,
            0
        );

        ctx.lineTo(
            scale * 0.65,
            scale * 0.45
        );

        ctx.lineTo(
            -scale * 0.65,
            scale * 0.45
        );

        ctx.closePath();

        ctx.fill();

        ctx.fillStyle = "#c88a45";

        ctx.beginPath();

        ctx.moveTo(
            0,
            0
        );

        ctx.lineTo(
            0,
            -scale
        );

        ctx.lineTo(
            scale * 0.55,
            -scale * 0.25
        );

        ctx.closePath();

        ctx.fill();

        ctx.restore();

        drawSelection(
            object,
            x,
            y,
            scale * 1.35
        );
    }

    /* =====================================================
       LUZ
    ===================================================== */

    function drawLight(
        object,
        time
    ) {

        if (!object) {
            return;
        }

        const x =
            width *
            clamp(
                object.x ?? 0.5,
                0.03,
                0.97
            );

        const y =
            height *
            clamp(
                object.y ?? 0.25,
                0.05,
                0.95
            );

        const scale =
            38 *
            (
                Number.isFinite(object.scale)
                    ? object.scale
                    : 1
            );

        const pulse =
            0.75 +
            Math.sin(time * 0.002) *
            0.12;

        ctx.save();

        const glow =
            ctx.createRadialGradient(
                x,
                y,
                2,
                x,
                y,
                scale * 3
            );

        glow.addColorStop(
            0,
            `rgba(255,235,120,${0.28 * pulse})`
        );

        glow.addColorStop(
            0.35,
            `rgba(255,220,80,${0.12 * pulse})`
        );

        glow.addColorStop(
            1,
            "rgba(255,210,50,0)"
        );

        ctx.fillStyle = glow;

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            scale * 3,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle = "#fff4a8";

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            scale * 0.32,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.restore();

        drawSelection(
            object,
            x,
            y,
            scale * 1.1
        );
    }

    /* =====================================================
       SELECCIÓN
    ===================================================== */

    function drawSelection(
        object,
        x,
        y,
        radius
    ) {

        if (
            !object ||
            selectedObjectId !== object.id
        ) {
            return;
        }

        ctx.save();

        ctx.strokeStyle =
            "rgba(255,255,255,0.8)";

        ctx.lineWidth = 2;

        ctx.setLineDash([
            5,
            4
        ]);

        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.stroke();

        ctx.restore();
    }

    /* =====================================================
       BURBUJAS
    ===================================================== */

    function drawBubbles(time) {

        const bubbles = [
            { x: 0.25, offset: 0 },
            { x: 0.42, offset: 1.7 },
            { x: 0.68, offset: 3 },
            { x: 0.82, offset: 4 }
        ];

        ctx.save();

        for (
            const bubble of bubbles
        ) {

            const progress =
                (
                    time * 0.00008 +
                    bubble.offset
                ) % 1;

            const x =
                width * bubble.x;

            const y =
                height *
                (
                    0.85 -
                    progress * 0.65
                );

            const radius =
                2 +
                progress * 3;

            ctx.beginPath();

            ctx.arc(
                x,
                y,
                radius,
                0,
                Math.PI * 2
            );

            ctx.strokeStyle =
                "rgba(190,245,255,0.5)";

            ctx.lineWidth = 1;

            ctx.stroke();
        }

        ctx.restore();
    }

    /* =====================================================
       ARENA
    ===================================================== */

    function drawSand() {

        const sandY =
            height *
            aquarium.sandLevel;

        const gradient =
            ctx.createLinearGradient(
                0,
                sandY,
                0,
                height
            );

        gradient.addColorStop(
            0,
            "#b38a59"
        );

        gradient.addColorStop(
            1,
            "#765534"
        );

        ctx.fillStyle = gradient;

        ctx.beginPath();

        ctx.moveTo(
            0,
            sandY
        );

        ctx.quadraticCurveTo(
            width * 0.25,
            sandY - 12,
            width * 0.5,
            sandY
        );

        ctx.quadraticCurveTo(
            width * 0.75,
            sandY + 12,
            width,
            sandY
        );

        ctx.lineTo(
            width,
            height
        );

        ctx.lineTo(
            0,
            height
        );

        ctx.closePath();

        ctx.fill();
    }

    /* =====================================================
       CRISTAL
    ===================================================== */

    function drawGlass() {

        ctx.save();

        ctx.strokeStyle =
            "rgba(190,245,255,0.16)";

        ctx.lineWidth = 2;

        ctx.strokeRect(
            1,
            1,
            width - 2,
            height - 2
        );

        const reflection =
            ctx.createLinearGradient(
                0,
                0,
                width,
                0
            );

        reflection.addColorStop(
            0,
            "rgba(255,255,255,0.08)"
        );

        reflection.addColorStop(
            0.08,
            "rgba(255,255,255,0)"
        );

        reflection.addColorStop(
            0.90,
            "rgba(255,255,255,0)"
        );

        reflection.addColorStop(
            1,
            "rgba(255,255,255,0.04)"
        );

        ctx.fillStyle = reflection;

        ctx.fillRect(
            0,
            0,
            width,
            height
        );

        ctx.restore();
    }

    /* =====================================================
       CLAMP
    ===================================================== */

    function clamp(
        value,
        min,
        max
    ) {

        if (
            !Number.isFinite(value)
        ) {

            return (
                min + max
            ) / 2;
        }

        return Math.max(
            min,
            Math.min(
                max,
                value
            )
        );
    }

    /* =====================================================
       AÑADIR OBJETO
    ===================================================== */

    function addObject(
        type,
        options = {}
    ) {

        const safeType =
            String(
                type ||
                "decoration"
            );

        const object = {

            id:
                `${safeType}-${Date.now()}-${Math.random()
                    .toString(36)
                    .slice(2, 7)}`,

            type: safeType,

            x:
                Number.isFinite(options.x)
                    ? clamp(
                        options.x,
                        0.04,
                        0.96
                    )
                    : 0.5,

            y:
                Number.isFinite(options.y)
                    ? clamp(
                        options.y,
                        0.04,
                        0.96
                    )
                    : 0.5,

            scale:
                Number.isFinite(options.scale)
                    ? clamp(
                        options.scale,
                        0.4,
                        1.5
                    )
                    : 1,

            rotation:
                Number.isFinite(options.rotation)
                    ? options.rotation
                    : 0,

            dragging: false
        };

        /* =================================================
           PEZ
        ================================================= */

        if (safeType === "fish") {

            object.speed =
                Number.isFinite(options.speed)
                    ? options.speed
                    : (
                        0.000035 +
                        Math.random() * 0.000015
                    );

            object.direction =
                options.direction === -1
                    ? -1
                    : 1;

            object.angle =
                object.direction === -1
                    ? Math.PI
                    : 0;

            object.variant =
                fishTypes[options.variant]
                    ? options.variant
                    : fishTypeNames[
                        Math.floor(
                            Math.random() *
                            fishTypeNames.length
                        )
                    ];

            /*
             * IMPORTANTE:
             * Inicializamos renderX/renderY.
             */

            object.renderX = object.x;
            object.renderY = object.y;

            object.targetX = object.x;
            object.targetY = object.y;

            object.vx =
                Math.cos(object.angle) *
                object.speed;

            object.vy = 0;

            object.nextDecision =
                performance.now() +
                3000 +
                Math.random() * 5000;
        }

        /* =================================================
           PLANTA
        ================================================= */

        if (safeType === "plant") {

            object.y =
                clamp(
                    object.y,
                    0.04,
                    0.96
                );
        }

        /* =================================================
           ROCA
        ================================================= */

        if (safeType === "rock") {

            object.y =
                clamp(
                    object.y,
                    0.04,
                    0.96
                );
        }

        aquarium.objects.push(
            object
        );

        console.log(
            "Elemento añadido:",
            object
        );

        return object;
    }

    /* =====================================================
       ELIMINAR
    ===================================================== */

    function removeObject(id) {

        if (
            drag.object &&
            drag.object.id === id
        ) {

            drag.active = false;
            drag.object = null;
            drag.pointerId = null;
        }

        if (
            selectedObjectId === id
        ) {

            selectedObjectId = null;
        }

        aquarium.objects =
            aquarium.objects.filter(
                object =>
                    object.id !== id
            );
    }

    /* =====================================================
       OBTENER OBJETOS
    ===================================================== */

    function getObjects() {

        return [
            ...aquarium.objects
        ];
    }

    /* =====================================================
       OBJETO SELECCIONADO
    ===================================================== */

    function getSelectedObject() {

        if (!selectedObjectId) {
            return null;
        }

        return (
            aquarium.objects.find(
                object =>
                    object.id ===
                    selectedObjectId
            ) ||
            null
        );
    }

    /* =====================================================
       SELECCIONAR
    ===================================================== */

    function selectObject(id) {

        const object =
            aquarium.objects.find(
                item =>
                    item.id === id
            );

        if (!object) {

            selectedObjectId = null;

            return null;
        }

        selectedObjectId = id;

        return object;
    }

    /* =====================================================
       MOVER POR API
    ===================================================== */

    function moveObject(
        id,
        x,
        y
    ) {

        const object =
            aquarium.objects.find(
                item =>
                    item.id === id
            );

        if (!object) {
            return null;
        }

        if (Number.isFinite(x)) {

            object.x =
                clamp(
                    x,
                    0.04,
                    0.96
                );
        }

        if (Number.isFinite(y)) {

            object.y =
                clamp(
                    y,
                    0.04,
                    0.96
                );
        }

        if (object.type === "fish") {

            object.targetX = object.x;
            object.targetY = object.y;

            object.renderX = object.x;
            object.renderY = object.y;
        }

        return object;
    }

    /* =====================================================
       ZOOM
    ===================================================== */

    function setZoom(value) {

        camera.zoom =
            clamp(
                Number(value),
                0.5,
                2
            );
    }

    function getZoom() {

        return camera.zoom;
    }

    /* =====================================================
       API PÚBLICA
    ===================================================== */

    return {

        init,

        addObject,

        removeObject,

        getObjects,

        getSelectedObject,

        selectObject,

        moveObject,

        setZoom,

        getZoom
    };

})();

/* =========================================================
   EXPORTAR
========================================================= */

window.Aquarium3D = Aquarium3D;
