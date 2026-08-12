/* =========================================================
   AQUARIUM STUDIO
   MOTOR 3D/2D — BASE ESTABLE
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
            console.error("Aquarium3D: canvas no encontrado.");
            return;
        }

        canvas = canvasElement;
        ctx = canvas.getContext("2d");

        resize();

        window.addEventListener("resize", resize);

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

        if (!canvas || !ctx) return;

        const rect = canvas.getBoundingClientRect();

        width = Math.max(1, rect.width);
        height = Math.max(1, rect.height);

        const pixelRatio =
            Math.min(window.devicePixelRatio || 1, 2);

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
            requestAnimationFrame(animate);
    }


    /* =====================================================
       DIBUJAR
    ===================================================== */

    function draw(time) {

        if (!ctx) return;

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
            height * aquarium.waterLevel;

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
            Math.sin(time * 0.00025) * 25;

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

        for (const object of aquarium.objects) {

            if (object.type === "fish") {

                updateFish(object, time);
                drawFish(object);

            } else if (object.type === "plant") {

                drawPlant(object, time);

            } else if (object.type === "rock") {

                drawRock(object);
            }
        }
    }


    /* =====================================================
       PECES
    ===================================================== */

function updateFish(fish, time) {

    // Movimiento suave y limitado dentro del cristal
    const t = time * 0.00035 * (fish.speed || 0.35);

    // Oscilación horizontal
    const horizontal =
        Math.sin(t) * 0.12;

    // Pequeño movimiento vertical
    const vertical =
        Math.sin(t * 1.7 + fish.x * 8) * 0.025;

    // Límites de seguridad.
    // Dejamos margen para que el cuerpo y la cola
    // nunca toquen los bordes.
    const marginX = 0.12;
    const minX = marginX;
    const maxX = 1 - marginX;

    const marginY = 0.12;
    const minY = marginY;
    const maxY = aquarium.sandLevel - marginY;

    fish.renderX = Math.max(
        minX,
        Math.min(
            maxX,
            fish.x + horizontal
        )
    );

    fish.renderY = Math.max(
        minY,
        Math.min(
            maxY,
            fish.y + vertical
        )
    );
}


function drawFish(fish) {

    const x =
        width * (fish.renderX ?? fish.x);

    const y =
        height * (fish.renderY ?? fish.y);

    const scale =
        45 * fish.scale;

    ctx.save();

    ctx.translate(x, y);

    // Dirección del pez
    ctx.scale(
        fish.direction || 1,
        1
    );

    const body =
        ctx.createRadialGradient(
            -5,
            -5,
            3,
            0,
            0,
            scale
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

    // CUERPO
    ctx.beginPath();

    ctx.ellipse(
        0,
        0,
        scale,
        scale * 0.55,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // COLA
    ctx.fillStyle =
        "#20b8d7";

    ctx.beginPath();

    ctx.moveTo(
        -scale * 0.65,
        0
    );

    ctx.lineTo(
        -scale * 1.2,
        -scale * 0.55
    );

    ctx.lineTo(
        -scale * 1.2,
        scale * 0.55
    );

    ctx.closePath();

    ctx.fill();

    // OJO
    ctx.fillStyle =
        "#ffffff";

    ctx.beginPath();

    ctx.arc(
        scale * 0.55,
        -scale * 0.18,
        scale * 0.12,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle =
        "#001017";

    ctx.beginPath();

    ctx.arc(
        scale * 0.58,
        -scale * 0.18,
        scale * 0.055,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
}


    /* =====================================================
       PLANTAS
    ===================================================== */

    function drawPlant(plant, time) {

        const x =
            width *
            Math.max(
                0.05,
                Math.min(
                    0.95,
                    plant.x ?? 0.5
                )
            );

        const baseY =
            height *
            Math.max(
                0.72,
                Math.min(
                    0.90,
                    plant.y ?? 0.82
                )
            );

        const scale =
            70 *
            (plant.scale ?? 1);

        const movement =
            Math.sin(
                time * 0.0015 +
                (plant.x ?? 0.5) * 10
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
            (plant.scale ?? 1);

        ctx.lineCap =
            "round";

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
                i * scale * 0.25 +
                movement,
                -scale
            );

            ctx.stroke();
        }

        ctx.restore();
    }


    /* =====================================================
       ROCAS
    ===================================================== */

    function drawRock(rock) {

        const x =
            width *
            Math.max(
                0.05,
                Math.min(
                    0.95,
                    rock.x ?? 0.5
                )
            );

        const y =
            height *
            Math.max(
                0.76,
                Math.min(
                    0.92,
                    rock.y ?? 0.86
                )
            );

        const scale =
            45 *
            (rock.scale ?? 1);

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

        ctx.fillStyle =
            gradient;

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

        for (const bubble of bubbles) {

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
       ARENA DE ARENA
    ===================================================== */

    function drawSand() {

        const sandY =
            height * aquarium.sandLevel;

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
       AÑADIR OBJETO
    ===================================================== */

function addObject(
    type,
    options = {}
) {

    const object = {

        id:
            `${type}-${Date.now()}`,

        type,

        x:
            Math.max(
                0.12,
                Math.min(
                    0.88,
                    options.x ?? 0.5
                )
            ),

        y:
            Math.max(
                0.12,
                Math.min(
                    aquarium.sandLevel - 0.12,
                    options.y ?? 0.5
                )
            ),

        scale:
            options.scale ?? 1,

        rotation:
            options.rotation ?? 0,

        // Propiedades específicas de peces
        speed:
            type === "fish"
                ? (options.speed ?? 0.35)
                : undefined,

        direction:
            type === "fish"
                ? (options.direction ?? 1)
                : undefined
    };

    aquarium.objects.push(object);

    return object;
}


    /* =====================================================
       ELIMINAR
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
            Math.max(
                0.5,
                Math.min(
                    2,
                    value
                )
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
