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

    function drawFish(fish) {

        if (!ctx || !fish) {
            return;
        }

        const safeX =
            Number.isFinite(
                fish.renderX
            )
                ? fish.renderX
                : (
                    Number.isFinite(fish.x)
                        ? fish.x
                        : 0.5
                );

        const safeY =
            Number.isFinite(
                fish.renderY
            )
                ? fish.renderY
                : (
                    Number.isFinite(fish.y)
                        ? fish.y
                        : 0.5
                );

        const x =
            width * safeX;

        const y =
            height * safeY;

        const fishScale =
            45 *
            (
                Number.isFinite(
                    fish.scale
                )
                    ? fish.scale
                    : 1
            );

        ctx.save();

        ctx.translate(
            x,
            y
        );

        if (
            Number.isFinite(
                fish.rotation
            )
        ) {
            ctx.rotate(
                fish.rotation
            );
        }

        ctx.scale(
            fish.direction === -1
                ? -1
                : 1,
            1
        );


        /* =================================================
           CUERPO
        ================================================= */

        const body =
            ctx.createRadialGradient(
                -fishScale * 0.2,
                -fishScale * 0.2,
                fishScale * 0.08,
                0,
                0,
                fishScale
            );

        body.addColorStop(
            0,
            "#8ff4ff"
        );

        body.addColorStop(
            0.45,
            "#35d9ff"
        );

        body.addColorStop(
            1,
            "#087d9b"
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


        /* =================================================
           COLA
        ================================================= */

        ctx.fillStyle =
            "#20b8d7";

        ctx.beginPath();

        ctx.moveTo(
            -fishScale * 0.65,
            0
        );

        ctx.lineTo(
            -fishScale * 1.2,
            -fishScale * 0.55
        );

        ctx.lineTo(
            -fishScale * 1.2,
            fishScale * 0.55
        );

        ctx.closePath();

        ctx.fill();


        /* =================================================
           ALETA SUPERIOR
        ================================================= */

        ctx.fillStyle =
            "rgba(55,210,240,0.8)";

        ctx.beginPath();

        ctx.moveTo(
            -fishScale * 0.15,
            -fishScale * 0.42
        );

        ctx.quadraticCurveTo(
            0,
            -fishScale * 0.95,
            fishScale * 0.28,
            -fishScale * 0.35
        );

        ctx.closePath();

        ctx.fill();


        /* =================================================
           ALETA INFERIOR
        ================================================= */

        ctx.beginPath();

        ctx.moveTo(
            -fishScale * 0.05,
            fishScale * 0.38
        );

        ctx.quadraticCurveTo(
            fishScale * 0.15,
            fishScale * 0.85,
            fishScale * 0.35,
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
            "#001017";

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
            "rgba(255,255,255,0.35)";

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
