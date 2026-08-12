/* =========================================================
   AQUARIUM STUDIO
   MOTOR 3D — ACUARIO TROPICAL
   6 PECES MULTICOLOR + MOVIMIENTO RELAJADO
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
        zoom: 1,
        rotation: 0,
        x: 0,
        y: 0
    };


    /* =====================================================
       TIPOS DE PECES
    ===================================================== */

    const fishTypes = {

        clownfish: {
            name: "Pez payaso",
            body1: "#ffd27a",
            body2: "#ff8a22",
            body3: "#d94a0b",
            fin: "#ff9d32",
            stripe: "#ffffff",
            accent: "#111111"
        },

        blue: {
            name: "Pez azul",
            body1: "#8cecff",
            body2: "#159fe8",
            body3: "#07549c",
            fin: "#0b8fd1",
            stripe: "#d5fbff",
            accent: "#052c55"
        },

        yellow: {
            name: "Pez amarillo",
            body1: "#fffca0",
            body2: "#ffd52e",
            body3: "#d99800",
            fin: "#f5bd00",
            stripe: "#fff5a8",
            accent: "#634600"
        },

        coral: {
            name: "Pez coral",
            body1: "#ffc1b5",
            body2: "#f0606b",
            body3: "#b72e48",
            fin: "#df4e61",
            stripe: "#ffdcd6",
            accent: "#651c2c"
        },

        violet: {
            name: "Pez violeta",
            body1: "#edc8ff",
            body2: "#a65ce6",
            body3: "#59269b",
            fin: "#8d4bd0",
            stripe: "#f5dcff",
            accent: "#32105d"
        },

        turquoise: {
            name: "Pez turquesa",
            body1: "#a7fff7",
            body2: "#27d7c7",
            body3: "#087f91",
            fin: "#18bdb7",
            stripe: "#dcfffb",
            accent: "#073c47"
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
            Math.max(
                1,
                rect.width
            );

        height =
            Math.max(
                1,
                rect.height
            );

        const pixelRatio =
            Math.min(
                window.devicePixelRatio || 1,
                2
            );

        canvas.width =
            Math.floor(
                width * pixelRatio
            );

        canvas.height =
            Math.floor(
                height * pixelRatio
            );

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
       ACUARIO DE DEMOSTRACIÓN
    ===================================================== */

    function createDemoAquarium() {

        aquarium.objects = [

            {
                id: "fish-1",
                type: "fish",
                variant: "clownfish",
                x: 0.23,
                y: 0.32,
                scale: 0.95,
                rotation: 0,
                speed: 0.000045,
                direction: 1
            },

            {
                id: "fish-2",
                type: "fish",
                variant: "blue",
                x: 0.68,
                y: 0.28,
                scale: 0.82,
                rotation: 0,
                speed: 0.000038,
                direction: -1
            },

            {
                id: "fish-3",
                type: "fish",
                variant: "yellow",
                x: 0.45,
                y: 0.45,
                scale: 0.72,
                rotation: 0,
                speed: 0.000042,
                direction: 1
            },

            {
                id: "fish-4",
                type: "fish",
                variant: "coral",
                x: 0.79,
                y: 0.53,
                scale: 0.68,
                rotation: 0,
                speed: 0.000035,
                direction: -1
            },

            {
                id: "fish-5",
                type: "fish",
                variant: "violet",
                x: 0.18,
                y: 0.56,
                scale: 0.62,
                rotation: 0,
                speed: 0.000040,
                direction: 1
            },

            {
                id: "fish-6",
                type: "fish",
                variant: "turquoise",
                x: 0.57,
                y: 0.63,
                scale: 0.88,
                rotation: 0,
                speed: 0.000034,
                direction: -1
            },

            {
                id: "plant-1",
                type: "plant",
                x: 0.10,
                y: 0.82,
                scale: 1.1,
                rotation: 0
            },

            {
                id: "plant-2",
                type: "plant",
                x: 0.28,
                y: 0.82,
                scale: 0.85,
                rotation: 0
            },

            {
                id: "plant-3",
                type: "plant",
                x: 0.48,
                y: 0.82,
                scale: 1.25,
                rotation: 0
            },

            {
                id: "plant-4",
                type: "plant",
                x: 0.73,
                y: 0.82,
                scale: 0.95,
                rotation: 0
            },

            {
                id: "plant-5",
                type: "plant",
                x: 0.91,
                y: 0.82,
                scale: 0.75,
                rotation: 0
            },

            {
                id: "rock-1",
                type: "rock",
                x: 0.28,
                y: 0.86,
                scale: 1,
                rotation: 0
            },

            {
                id: "rock-2",
                type: "rock",
                x: 0.66,
                y: 0.86,
                scale: 0.8,
                rotation: 0
            }
        ];
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
       DIBUJAR
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

        ctx.fillStyle =
            gradient;

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

        ctx.fillStyle =
            gradient;

        ctx.fillRect(
            0,
            0,
            width,
            height * 0.55
        );
    }


    /* =====================================================
       RAYOS DE LUZ
    ===================================================== */

    function drawRays(time) {

        const movement =
            Math.sin(
                time * 0.00025
            ) * 25;

        ctx.save();

        ctx.globalAlpha =
            0.08;

        ctx.fillStyle =
            "#b9f6ff";

        ctx.beginPath();

        ctx.moveTo(
            width * 0.28 +
            movement,
            0
        );

        ctx.lineTo(
            width * 0.45 +
            movement,
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

    if (!Array.isArray(aquarium.objects)) {
        return;
    }

    for (const object of aquarium.objects) {

        if (!object) {
            continue;
        }

        if (object.type === "fish") {

            updateFish(object, time);

            drawFish(object, time);

        } else if (object.type === "plant") {

            drawPlant(object, time);

        } else if (object.type === "rock") {

            drawRock(object);

        } else if (object.type === "decoration") {

            drawDecoration(object, time);

        } else if (object.type === "light") {

            drawLight(object, time);
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

        if (!Number.isFinite(fish.vx)) {

            fish.vx =
                fish.speed *
                fish.direction;
        }

        if (!Number.isFinite(fish.vy)) {
            fish.vy = 0;
        }

        if (!Number.isFinite(fish.angle)) {

            fish.angle =
                fish.direction === -1
                    ? Math.PI
                    : 0;
        }

        if (!Number.isFinite(
            fish.targetAngle
        )) {

            fish.targetAngle =
                fish.angle;
        }

        if (!Number.isFinite(
            fish.targetX
        )) {

            fish.targetX =
                clamp(
                    fish.x +
                    (
                        Math.random() - 0.5
                    ) * 0.35,
                    0.12,
                    0.88
                );
        }

        if (!Number.isFinite(
            fish.targetY
        )) {

            fish.targetY =
                clamp(
                    fish.y +
                    (
                        Math.random() - 0.5
                    ) * 0.22,
                    0.16,
                    aquarium.sandLevel - 0.13
                );
        }

        if (!Number.isFinite(
            fish.nextDecision
        )) {

            fish.nextDecision =
                time +
                5000 +
                Math.random() * 7000;
        }


        /* ---------------------------------------------
           NUEVO DESTINO
        --------------------------------------------- */

        if (
            time >
            fish.nextDecision
        ) {

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
                    0.16,
                    aquarium.sandLevel - 0.13
                );

            fish.nextDecision =
                time +
                5000 +
                Math.random() * 8000;
        }


        /* ---------------------------------------------
           DIRECCIÓN HACIA EL DESTINO
        --------------------------------------------- */

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

        if (
            distance >
            0.018
        ) {

            fish.targetAngle =
                Math.atan2(
                    dy,
                    dx
                );
        }


        /* ---------------------------------------------
           GIRO MUY SUAVE
        --------------------------------------------- */

        let angleDifference =
            fish.targetAngle -
            fish.angle;

        while (
            angleDifference >
            Math.PI
        ) {

            angleDifference -=
                Math.PI * 2;
        }

        while (
            angleDifference <
            -Math.PI
        ) {

            angleDifference +=
                Math.PI * 2;
        }

        fish.angle +=
            angleDifference *
            0.006;


        /* ---------------------------------------------
           VELOCIDAD SUAVE
        --------------------------------------------- */

        const desiredVX =
            Math.cos(
                fish.angle
            ) *
            fish.speed;

        const desiredVY =
            Math.sin(
                fish.angle
            ) *
            fish.speed;

        fish.vx +=
            (
                desiredVX -
                fish.vx
            ) *
            0.008;

        fish.vy +=
            (
                desiredVY -
                fish.vy
            ) *
            0.008;


        /* ---------------------------------------------
           MOVIMIENTO VERTICAL NATURAL
        --------------------------------------------- */

        const wave =
            Math.sin(
                time * 0.00065 +
                fish.id.length * 1.7
            );

        fish.vy +=
            wave *
            0.00000032;


        /* ---------------------------------------------
           MOVIMIENTO
        --------------------------------------------- */

        fish.x +=
            fish.vx;

        fish.y +=
            fish.vy;


        /* ---------------------------------------------
           LÍMITES
        --------------------------------------------- */

        const left =
            0.09;

        const right =
            0.91;

        const top =
            0.14;

        const bottom =
            aquarium.sandLevel -
            0.10;


        if (
            fish.x <
            left
        ) {

            fish.x =
                left;

            fish.targetX =
                0.35 +
                Math.random() * 0.35;

            fish.targetAngle =
                0;
        }


        if (
            fish.x >
            right
        ) {

            fish.x =
                right;

            fish.targetX =
                0.30 +
                Math.random() * 0.35;

            fish.targetAngle =
                Math.PI;
        }


        if (
            fish.y <
            top
        ) {

            fish.y =
                top;

            fish.targetY =
                0.25 +
                Math.random() * 0.25;
        }


        if (
            fish.y >
            bottom
        ) {

            fish.y =
                bottom;

            fish.targetY =
                0.25 +
                Math.random() * 0.25;
        }


        /* ---------------------------------------------
           ORIENTACIÓN
        --------------------------------------------- */

        fish.direction =
            Math.cos(
                fish.angle
            ) >= 0
                ? 1
                : -1;

        fish.renderX =
            fish.x;

        fish.renderY =
            fish.y;
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

        let variant =
            fish.variant;

        if (
            !fishTypes[variant]
        ) {

            variant =
                fishTypeNames[
                    Math.floor(
                        Math.random() *
                        fishTypeNames.length
                    )
                ];

            fish.variant =
                variant;
        }

        const style =
            fishTypes[
                variant
            ];


        const x =
            width *
            clamp(
                Number.isFinite(
                    fish.renderX
                )
                    ? fish.renderX
                    : fish.x,
                0.05,
                0.95
            );

        const y =
            height *
            clamp(
                Number.isFinite(
                    fish.renderY
                )
                    ? fish.renderY
                    : fish.y,
                0.05,
                0.95
            );


        const fishScale =
            45 *
            (
                Number.isFinite(
                    fish.scale
                )
                    ? fish.scale
                    : 1
            );


        const angle =
            Number.isFinite(
                fish.angle
            )
                ? fish.angle
                : 0;


        const facingLeft =
            Math.cos(angle) < 0;


        /* ---------------------------------------------
           BALANCEO
        --------------------------------------------- */

        const swimmingSway =
            Math.sin(
                time * 0.00125 +
                fish.id.length * 2
            ) *
            0.035;


        const visualAngle =
            swimmingSway +
            Math.sin(angle) * 0.12;


        ctx.save();

        ctx.translate(
            x,
            y
        );

        ctx.rotate(
            visualAngle
        );

        ctx.scale(
            facingLeft
                ? -1
                : 1,
            1
        );


        /* =================================================
           COLA
        ================================================= */

        const tailWave =
            Math.sin(
                time * 0.006 +
                fish.id.length
            ) *
            fishScale *
            0.07;

        ctx.fillStyle =
            style.fin;

        ctx.beginPath();

        ctx.moveTo(
            -fishScale * 0.52,
            0
        );

        ctx.quadraticCurveTo(
            -fishScale * 0.88,
            -fishScale * 0.12 +
            tailWave,
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
            fishScale * 0.12 +
            tailWave,
            -fishScale * 0.52,
            0
        );

        ctx.closePath();

        ctx.fill();


        /* =================================================
           CUERPO
        ================================================= */

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

        ctx.fillStyle =
            body;

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


        /* =================================================
           PATRÓN
        ================================================= */

        drawFishPattern(
            fish,
            style,
            fishScale
        );


        /* =================================================
           ALETA SUPERIOR
        ================================================= */

        const finWave =
            Math.sin(
                time * 0.004 +
                fish.id.length
            ) *
            fishScale *
            0.05;

        ctx.fillStyle =
            style.fin;

        ctx.beginPath();

        ctx.moveTo(
            -fishScale * 0.18,
            -fishScale * 0.38
        );

        ctx.quadraticCurveTo(
            fishScale * 0.02,
            -fishScale * 0.90 +
            finWave,
            fishScale * 0.30,
            -fishScale * 0.35
        );

        ctx.closePath();

        ctx.fill();


        /* =================================================
           ALETA INFERIOR
        ================================================= */

        ctx.beginPath();

        ctx.moveTo(
            -fishScale * 0.08,
            fishScale * 0.38
        );

        ctx.quadraticCurveTo(
            fishScale * 0.15,
            fishScale * 0.82 +
            finWave,
            fishScale * 0.36,
            fishScale * 0.28
        );

        ctx.closePath();

        ctx.fill();


        /* =================================================
           OJO
        ================================================= */

        ctx.fillStyle =
            "#ffffff";

        ctx.beginPath();

        ctx.arc(
            fishScale * 0.55,
            -fishScale * 0.18,
            fishScale * 0.12,
            0,
            Math.PI * 2
        );

        ctx.fill();

        ctx.fillStyle =
            "#07151b";

        ctx.beginPath();

        ctx.arc(
            fishScale * 0.58,
            -fishScale * 0.18,
            fishScale * 0.055,
            0,
            Math.PI * 2
        );

        ctx.fill();


        /* =================================================
           BRILLO
        ================================================= */

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
    }


    /* =====================================================
       PATRONES DE LOS PECES
    ===================================================== */

    function drawFishPattern(
        fish,
        style,
        fishScale
    ) {

        /* -----------------------------------------------
           PAYASO
        ----------------------------------------------- */

        if (
            fish.variant ===
            "clownfish"
        ) {

            ctx.fillStyle =
                style.stripe;

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

            return;
        }


        /* -----------------------------------------------
           AZUL
        ----------------------------------------------- */

        if (
            fish.variant ===
            "blue"
        ) {

            ctx.fillStyle =
                "rgba(255,255,255,0.25)";

            ctx.beginPath();

            ctx.moveTo(
                -fishScale * 0.65,
                -fishScale * 0.28
            );

            ctx.quadraticCurveTo(
                -fishScale * 0.10,
                -fishScale * 0.50,
                fishScale * 0.58,
                -fishScale * 0.15
            );

            ctx.lineTo(
                fishScale * 0.42,
                fishScale * 0.04
            );

            ctx.quadraticCurveTo(
                -fishScale * 0.18,
                -fishScale * 0.15,
                -fishScale * 0.65,
                -fishScale * 0.28
            );

            ctx.fill();

            return;
        }


        /* -----------------------------------------------
           AMARILLO
        ----------------------------------------------- */

        if (
            fish.variant ===
            "yellow"
        ) {

            ctx.fillStyle =
                style.stripe;

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

            return;
        }


        /* -----------------------------------------------
           CORAL
        ----------------------------------------------- */

        if (
            fish.variant ===
            "coral"
        ) {

            ctx.fillStyle =
                style.stripe;

            ctx.beginPath();

            ctx.ellipse(
                -fishScale * 0.27,
                -fishScale * 0.01,
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

            return;
        }


        /* -----------------------------------------------
           VIOLETA
        ----------------------------------------------- */

        if (
            fish.variant ===
            "violet"
        ) {

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

            ctx.beginPath();

            ctx.arc(
                fishScale * 0.25,
                -fishScale * 0.08,
                fishScale * 0.06,
                0,
                Math.PI * 2
            );

            ctx.fill();

            return;
        }


        /* -----------------------------------------------
           TURQUESA
        ----------------------------------------------- */

        if (
            fish.variant ===
            "turquoise"
        ) {

            ctx.fillStyle =
                style.stripe;

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

        const plantX =
            Number.isFinite(
                plant.x
            )
                ? plant.x
                : 0.5;

        const plantY =
            Number.isFinite(
                plant.y
            )
                ? plant.y
                : aquarium.sandLevel;

        const x =
            width *
            clamp(
                plantX,
                0.05,
                0.95
            );

        const baseY =
            height *
            clamp(
                plantY,
                0.72,
                aquarium.sandLevel
            );

        const plantScale =
            70 *
            (
                Number.isFinite(
                    plant.scale
                )
                    ? plant.scale
                    : 1
            );

        const movement =
            Math.sin(
                time * 0.0015 +
                plantX * 10
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
                Number.isFinite(
                    plant.scale
                )
                    ? plant.scale
                    : 1
            );

        ctx.lineCap =
            "round";

        for (
            let i = -1;
            i <= 1;
            i++
        ) {

            ctx.beginPath();

            ctx.moveTo(
                i *
                plantScale *
                0.16,
                5
            );

            ctx.quadraticCurveTo(
                i *
                plantScale *
                0.08,
                -plantScale * 0.45,
                i *
                plantScale *
                0.25 +
                movement,
                -plantScale
            );

            ctx.stroke();
        }

        ctx.restore();
    }


    /* =====================================================
       ROCAS
    ===================================================== */

    function drawRock(
        rock
    ) {

        if (!rock) {
            return;
        }

        const x =
            width *
            clamp(
                Number.isFinite(
                    rock.x
                )
                    ? rock.x
                    : 0.5,
                0.05,
                0.95
            );

        const y =
            height *
            clamp(
                Number.isFinite(
                    rock.y
                )
                    ? rock.y
                    : aquarium.sandLevel,
                aquarium.sandLevel,
                0.95
            );

        const rockScale =
            45 *
            (
                Number.isFinite(
                    rock.scale
                )
                    ? rock.scale
                    : 1
            );

        ctx.save();

        ctx.translate(
            x,
            y
        );

        if (
            Number.isFinite(
                rock.rotation
            )
        ) {

            ctx.rotate(
                rock.rotation
            );
        }

        const gradient =
            ctx.createLinearGradient(
                0,
                -rockScale,
                0,
                rockScale
            );

        gradient.addColorStop(
            0,
            "#53636a"
        );

        gradient.addColorStop(
            1,
            "#253238"
        );

        ctx.fillStyle =
            gradient;

        ctx.beginPath();

        ctx.moveTo(
            -rockScale,
            0
        );

        ctx.quadraticCurveTo(
            -rockScale * 0.8,
            -rockScale * 0.9,
            0,
            -rockScale
        );

        ctx.quadraticCurveTo(
            rockScale * 0.9,
            -rockScale * 0.7,
            rockScale,
            0
        );

        ctx.quadraticCurveTo(
            rockScale * 0.6,
            rockScale * 0.55,
            0,
            rockScale * 0.45
        );

        ctx.quadraticCurveTo(
            -rockScale * 0.7,
            rockScale * 0.6,
            -rockScale,
            0
        );

        ctx.closePath();

        ctx.fill();

        ctx.restore();
    }
function drawDecoration(object, time) {

    const x = width * clamp(
        Number.isFinite(object.x) ? object.x : 0.5,
        0.05,
        0.95
    );

    const y = height * clamp(
        Number.isFinite(object.y) ? object.y : 0.72,
        0.55,
        0.88
    );

    const scale =
        42 *
        (
            Number.isFinite(object.scale)
                ? object.scale
                : 1
        );

    ctx.save();

    ctx.translate(x, y);

    const sway =
        Math.sin(time * 0.001) * 0.03;

    ctx.rotate(sway);

    ctx.fillStyle = "#5b3825";

    ctx.beginPath();

    ctx.moveTo(
        -scale * 0.9,
        scale * 0.35
    );

    ctx.quadraticCurveTo(
        -scale * 0.55,
        -scale * 0.15,
        -scale * 0.15,
        -scale * 0.55
    );

    ctx.quadraticCurveTo(
        scale * 0.05,
        -scale * 0.75,
        scale * 0.18,
        -scale * 0.45
    );

    ctx.quadraticCurveTo(
        scale * 0.25,
        -scale * 0.15,
        scale * 0.75,
        -scale * 0.05
    );

    ctx.lineTo(
        scale * 0.85,
        scale * 0.25
    );

    ctx.quadraticCurveTo(
        scale * 0.35,
        scale * 0.10,
        scale * 0.05,
        scale * 0.20
    );

    ctx.quadraticCurveTo(
        -scale * 0.40,
        scale * 0.35,
        -scale * 0.9,
        scale * 0.35
    );

    ctx.closePath();

    ctx.fill();

    ctx.strokeStyle =
        "rgba(35,20,12,0.55)";

    ctx.lineWidth = 3;

    ctx.beginPath();

    ctx.moveTo(
        -scale * 0.45,
        scale * 0.18
    );

    ctx.lineTo(
        scale * 0.45,
        scale * 0.05
    );

    ctx.stroke();

    ctx.restore();
}
              function drawLight(object, time) {

    const x = width * clamp(
        Number.isFinite(object.x) ? object.x : 0.5,
        0.05,
        0.95
    );

    const y = height * clamp(
        Number.isFinite(object.y) ? object.y : 0.25,
        0.08,
        0.75
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
        Math.sin(time * 0.002) * 0.12;

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

    ctx.fillStyle =
        "rgba(255,255,255,0.85)";

    ctx.beginPath();

    ctx.arc(
        x - scale * 0.10,
        y - scale * 0.10,
        scale * 0.10,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
}

    /* =====================================================
       BURBUJAS
    ===================================================== */

    function drawBubbles(
        time
    ) {

        const bubbles = [

            {
                x: 0.25,
                offset: 0
            },

            {
                x: 0.42,
                offset: 1.7
            },

            {
                x: 0.68,
                offset: 3
            },

            {
                x: 0.82,
                offset: 4
            }
        ];

        ctx.save();

        for (
            const bubble
            of bubbles
        ) {

            const progress =
                (
                    time * 0.00008 +
                    bubble.offset
                ) % 1;

            const x =
                width *
                bubble.x;

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

            ctx.lineWidth =
                1;

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

        ctx.fillStyle =
            gradient;

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

        ctx.lineWidth =
            2;

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

        ctx.fillStyle =
            reflection;

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

        if (!Number.isFinite(value)) {

            return (
                min +
                max
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

            type:
                safeType,

            x:
                Number.isFinite(
                    options.x
                )
                    ? clamp(
                        options.x,
                        0.12,
                        0.88
                    )
                    : 0.5,

            y:
                Number.isFinite(
                    options.y
                )
                    ? options.y
                    : 0.5,

            scale:
                Number.isFinite(
                    options.scale
                )
                    ? clamp(
                        options.scale,
                        0.4,
                        1.5
                    )
                    : 1,

            rotation:
                Number.isFinite(
                    options.rotation
                )
                    ? options.rotation
                    : 0
        };


        /* ---------------------------------------------
           PECES
        --------------------------------------------- */

        if (
            safeType === "fish"
        ) {

            object.speed =
                Number.isFinite(
                    options.speed
                )
                    ? options.speed
                    : (
                        0.000035 +
                        Math.random() *
                        0.000015
                    );

            object.direction =
                options.direction === -1
                    ? -1
                    : (
                        Math.random() > 0.5
                            ? 1
                            : -1
                    );

            object.variant =
                fishTypes[
                    options.variant
                ]
                    ? options.variant
                    : fishTypeNames[
                        Math.floor(
                            Math.random() *
                            fishTypeNames.length
                        )
                    ];

            object.y =
                clamp(
                    object.y,
                    0.15,
                    aquarium.sandLevel - 0.12
                );
        }


        /* ---------------------------------------------
           PLANTAS
        --------------------------------------------- */

        if (
            safeType === "plant"
        ) {

            object.y =
                aquarium.sandLevel;
        }


        /* ---------------------------------------------
           ROCAS
        --------------------------------------------- */

        if (
            safeType === "rock"
        ) {

            object.y =
                aquarium.sandLevel +
                0.04;
        }


        aquarium.objects.push(
            object
        );

        return object;
    }


    /* =====================================================
       ELIMINAR OBJETO
    ===================================================== */

    function removeObject(
        id
    ) {

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
       ZOOM
    ===================================================== */

    function setZoom(
        value
    ) {

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

        setZoom,

        getZoom

    };

})();


/* =========================================================
   EXPORTAR
========================================================= */

window.Aquarium3D =
    Aquarium3D;
