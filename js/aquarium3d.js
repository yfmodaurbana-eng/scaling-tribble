/* =========================================================
   AQUARIUM STUDIO
   MOTOR 3D — BASE ESTABLE
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
       ACUARIO DE PRUEBA
    ===================================================== */

    function createDemoAquarium() {

        aquarium.objects = [

            {
                id: "fish-1",
                type: "fish",
                x: 0.30,
                y: 0.38,
                scale: 1,
                rotation: 0,
                speed: 0.35,
                direction: 1
            },

            {
                id: "fish-2",
                type: "fish",
                x: 0.67,
                y: 0.52,
                scale: 0.75,
                rotation: 0,
                speed: 0.25,
                direction: -1
            },

            {
                id: "plant-1",
                type: "plant",
                x: 0.18,
                y: 0.82,
                scale: 1,
                rotation: 0
            },

            {
                id: "plant-2",
                type: "plant",
                x: 0.47,
                y: 0.82,
                scale: 1.2,
                rotation: 0
            },

            {
                id: "plant-3",
                type: "plant",
                x: 0.78,
                y: 0.82,
                scale: 0.8,
                rotation: 0
            },

            {
                id: "rock-1",
                type: "rock",
                x: 0.32,
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
       RAYOS DE LUZ
    ===================================================== */

    function drawRays(time) {

        const movement =
            Math.sin(
                time * 0.00025
            ) * 25;

        ctx.save();

        ctx.globalAlpha = 0.08;

        ctx.fillStyle =
            "#b9f6ff";

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

        if (!Array.isArray(aquarium.objects)) {
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
                    object
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

                drawRock(
                    object
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

        const speed =
            Number.isFinite(
                fish.speed
            )
                ? fish.speed
                : 0.25;

        const direction =
            fish.direction === -1
                ? -1
                : 1;

        fish.speed = speed;

        fish.direction = direction;

        const movement =
            Math.sin(
                time *
                0.001 *
                speed
            ) * 0.08;

        let renderX =
            Number.isFinite(fish.x)
                ? fish.x + movement
                : 0.5;

        let renderY =
            Number.isFinite(fish.y)
                ? fish.y +
                  Math.sin(
                      time *
                      0.0012
                  ) * 0.015
                : 0.5;

        const horizontalMargin =
            0.12;

        const verticalTop =
            0.12;

        const verticalBottom =
            aquarium.sandLevel -
            0.08;

        renderX =
            clamp(
                renderX,
                horizontalMargin,
                1 - horizontalMargin
            );

        renderY =
            clamp(
                renderY,
                verticalTop,
                verticalBottom
            );

        fish.renderX = renderX;

        fish.renderY = renderY;
    }


    /* =====================================================
       DIBUJAR PEZ
    ===================================================== */

function updateFish(fish, time) {

    /* =================================================
       VALORES INICIALES
    ================================================= */

    if (!Number.isFinite(fish.x)) {
        fish.x = 0.5;
    }

    if (!Number.isFinite(fish.y)) {
        fish.y = 0.45;
    }

    if (!Number.isFinite(fish.speed)) {
        fish.speed =
            0.00012 +
            Math.random() * 0.00008;
    }

    if (!Number.isFinite(fish.vx)) {
        fish.vx =
            fish.speed *
            (fish.direction === -1 ? -1 : 1);
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

    if (!Number.isFinite(fish.targetAngle)) {
        fish.targetAngle =
            fish.angle;
    }

    if (!Number.isFinite(fish.targetX)) {
        fish.targetX =
            clamp(
                fish.x +
                (
                    Math.random() - 0.5
                ) * 0.35,
                0.14,
                0.86
            );
    }

    if (!Number.isFinite(fish.targetY)) {
        fish.targetY =
            clamp(
                fish.y +
                (
                    Math.random() - 0.5
                ) * 0.25,
                0.18,
                aquarium.sandLevel - 0.12
            );
    }

    if (!Number.isFinite(fish.nextDecision)) {
        fish.nextDecision =
            time +
            1500 +
            Math.random() * 3500;
    }


    /* =================================================
       CAMBIAR OBJETIVO DE VEZ EN CUANDO
    ================================================= */

    if (time > fish.nextDecision) {

        fish.targetX =
            clamp(
                fish.x +
                (
                    Math.random() - 0.5
                ) * 0.45,
                0.14,
                0.86
            );

        fish.targetY =
            clamp(
                fish.y +
                (
                    Math.random() - 0.5
                ) * 0.30,
                0.18,
                aquarium.sandLevel - 0.12
            );

        fish.nextDecision =
            time +
            1800 +
            Math.random() * 4500;
    }


    /* =================================================
       DIRECCIÓN HACIA EL OBJETIVO
    ================================================= */

    const dx =
        fish.targetX - fish.x;

    const dy =
        fish.targetY - fish.y;

    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );

    if (distance > 0.01) {

        const desiredAngle =
            Math.atan2(
                dy,
                dx
            );

        fish.targetAngle =
            desiredAngle;
    }


    /* =================================================
       GIRO SUAVE
    ================================================= */

    let angleDifference =
        fish.targetAngle -
        fish.angle;

    while (
        angleDifference > Math.PI
    ) {
        angleDifference -=
            Math.PI * 2;
    }

    while (
        angleDifference < -Math.PI
    ) {
        angleDifference +=
            Math.PI * 2;
    }

    fish.angle +=
        angleDifference *
        0.025;


    /* =================================================
       VELOCIDAD NATURAL
    ================================================= */

    const baseSpeed =
        Number.isFinite(fish.speed)
            ? fish.speed
            : 0.00015;

    const desiredVX =
        Math.cos(fish.angle) *
        baseSpeed;

    const desiredVY =
        Math.sin(fish.angle) *
        baseSpeed;

    fish.vx +=
        (
            desiredVX -
            fish.vx
        ) * 0.035;

    fish.vy +=
        (
            desiredVY -
            fish.vy
        ) * 0.035;


    /* =================================================
       PEQUEÑO MOVIMIENTO NATURAL
    ================================================= */

    const wave =
        Math.sin(
            time * 0.0015 +
            fish.id.length
        );

    fish.vy +=
        wave *
        0.0000015;


    /* =================================================
       ACTUALIZAR POSICIÓN
    ================================================= */

    fish.x += fish.vx;

    fish.y += fish.vy;


    /* =================================================
       LÍMITES DEL ACUARIO
    ================================================= */

    const left =
        0.10;

    const right =
        0.90;

    const top =
        0.14;

    const bottom =
        aquarium.sandLevel -
        0.10;


    /* -------------------------------------------------
       PARED IZQUIERDA
    ------------------------------------------------- */

    if (fish.x < left) {

        fish.x = left;

        fish.targetX =
            0.25 +
            Math.random() * 0.5;

        fish.targetAngle =
            0;
    }


    /* -------------------------------------------------
       PARED DERECHA
    ------------------------------------------------- */

    if (fish.x > right) {

        fish.x = right;

        fish.targetX =
            0.25 +
            Math.random() * 0.5;

        fish.targetAngle =
            Math.PI;
    }


    /* -------------------------------------------------
       PARTE SUPERIOR
    ------------------------------------------------- */

    if (fish.y < top) {

        fish.y = top;

        fish.targetY =
            0.25 +
            Math.random() * 0.35;
    }


    /* -------------------------------------------------
       PARTE INFERIOR
    ------------------------------------------------- */

    if (fish.y > bottom) {

        fish.y = bottom;

        fish.targetY =
            0.25 +
            Math.random() * 0.35;
    }


    /* =================================================
       ORIENTACIÓN DEL PEZ
    ================================================= */

    fish.direction =
        Math.cos(fish.angle) >= 0
            ? 1
            : -1;


    fish.renderX =
        fish.x;

    fish.renderY =
        fish.y;
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
                Number.isFinite(plant.x)
                    ? plant.x
                    : 0.5,
                0.05,
                0.95
            );

        const baseY =
            height *
            clamp(
                Number.isFinite(plant.y)
                    ? plant.y
                    : aquarium.sandLevel,
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
                time *
                0.0015 +
                (
                    Number.isFinite(plant.x)
                        ? plant.x
                        : 0.5
                ) * 10
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

    function drawRock(rock) {

        if (!rock) {
            return;
        }

        const x =
            width *
            clamp(
                Number.isFinite(rock.x)
                    ? rock.x
                    : 0.5,
                0.05,
                0.95
            );

        const y =
            height *
            clamp(
                Number.isFinite(rock.y)
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


    /* =====================================================
       BURBUJAS
    ===================================================== */

    function drawBubbles(time) {

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
            0.9,
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


        /* =================================================
           PECES
        ================================================= */

        if (
            safeType === "fish"
        ) {

            object.speed =
                Number.isFinite(
                    options.speed
                )
                    ? options.speed
                    : (
                        0.20 +
                        Math.random() *
                        0.20
                    );

            object.direction =
                options.direction === -1
                    ? -1
                    : (
                        Math.random() > 0.5
                            ? 1
                            : -1
                    );

            object.y =
                clamp(
                    object.y,
                    0.15,
                    aquarium.sandLevel - 0.12
                );
        }


        /* =================================================
           PLANTAS
        ================================================= */

        if (
            safeType === "plant"
        ) {

            object.y =
                aquarium.sandLevel;
        }


        /* =================================================
           ROCAS
        ================================================= */

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

    function removeObject(id) {

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

        setZoom,

        getZoom

    };

})();


/* =========================================================
   EXPORTAR
========================================================= */

window.Aquarium3D = Aquarium3D;
