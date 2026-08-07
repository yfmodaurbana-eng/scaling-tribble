/* ==========================================
   ACUARIO DESIGNER STUDIO V6
   REAL 3D AQUARIUM ENGINE
   PROFUNDIDAD REAL DINÁMICA
========================================== */

console.log("3D ENGINE V6 CARGADO");


document.addEventListener("DOMContentLoaded", () => {


    /* =========================
       ELEMENTOS
    ========================= */

    const acuario = document.querySelector(".aquarium");
    const tanque = document.querySelector(".tank-3d");

    const largo = document.getElementById("largo");
    const ancho = document.getElementById("ancho");
    const alto = document.getElementById("alto");


    if (!acuario || !tanque || !largo || !ancho || !alto) {

        console.error("3D ENGINE: faltan elementos necesarios");

        return;

    }


    /* =========================
       VARIABLES CÁMARA
    ========================= */

    let rotX = -10;
    let rotY = -25;

    let zoom = 1;

    let pulsado = false;

    let inicioX = 0;
    let inicioY = 0;


    /* =========================
       ACTUALIZAR TAMAÑO 3D
    ========================= */

    function actualizar3D() {

        let L = Number(largo.value) || 70;
        let A = Number(ancho.value) || 30;
        let H = Number(alto.value) || 40;


        /* =========================
           ESCALA VISUAL
        ========================= */

        const escala = 5;


        /* LARGO = X */

        let anchoVisual =
            L * escala;


        anchoVisual =
            Math.min(
                Math.max(anchoVisual, 260),
                850
            );


        /* ALTO = Y */

        let altoVisual =
            H * escala;


        altoVisual =
            Math.min(
                Math.max(altoVisual, 180),
                500
            );


        /* ANCHO = PROFUNDIDAD Z */

        let profundidadVisual =
            A * escala;


        profundidadVisual =
            Math.min(
                Math.max(profundidadVisual, 80),
                400
            );


        /* =========================
           APLICAR DIMENSIONES
        ========================= */

        acuario.style.width =
            anchoVisual + "px";


        acuario.style.height =
            altoVisual + "px";


        /*
           ESTA ES LA CLAVE:

           --depth pertenece a .tank-3d
        */

        tanque.style.setProperty(
            "--depth",
            profundidadVisual + "px"
        );


        /*
           También guardamos la profundidad
           en el contenedor.
        */

        acuario.style.setProperty(
            "--profundidad",
            profundidadVisual + "px"
        );


        /* =========================
           DATOS DEL ACUARIO
        ========================= */

        acuario.dataset.medidas =
            `${L} x ${A} x ${H} cm`;


        acuario.dataset.largo = L;
        acuario.dataset.ancho = A;
        acuario.dataset.alto = H;

        acuario.dataset.profundidad =
            profundidadVisual;


        /* =========================
           TIRANTES
        ========================= */

        document
            .querySelectorAll(".tirante3d")
            .forEach(e => e.remove());


        let litros =
            (L * A * H) / 1000;


        if (litros > 150) {

            let tirante =
                document.createElement("div");


            tirante.className =
                "tirante3d";


            /*
               El tirante cruza
               el ancho/profundidad
               del acuario.
            */

            tirante.style.position =
                "absolute";


            tirante.style.top =
                "-8px";


            tirante.style.left =
                "15%";


            tirante.style.width =
                "70%";


            tirante.style.height =
                "10px";


            tirante.style.transform =
                `translateZ(${profundidadVisual / 2}px)`;


            tirante.style.background =
                "rgba(220,250,255,.65)";


            tirante.style.border =
                "2px solid rgba(255,255,255,.8)";


            tirante.style.boxShadow =
                "0 0 15px rgba(0,220,255,.6)";


            tirante.style.zIndex =
                "120";


            tanque.appendChild(tirante);

        }


        console.log(
            "3D V6:",
            `${L} x ${A} x ${H} cm`,
            "Profundidad:",
            profundidadVisual + "px",
            "Volumen:",
            litros.toFixed(1) + "L"
        );


    }


    /* =========================
       ACTUALIZAR CÁMARA
    ========================= */

    function actualizarVista() {


        tanque.style.transform =
            `
            scale(${zoom})
            rotateX(${rotX}deg)
            rotateY(${rotY}deg)
            `;


    }


    /* =========================
       CAMBIO DE DIMENSIONES
    ========================= */

    [largo, ancho, alto]
        .forEach(input => {

            input.addEventListener(
                "input",
                actualizar3D
            );

        });


    /* =========================
       RATÓN — ROTACIÓN
    ========================= */

    tanque.addEventListener(
        "mousedown",
        e => {

            pulsado = true;

            inicioX = e.clientX;
            inicioY = e.clientY;

            tanque.style.cursor =
                "grabbing";

            e.preventDefault();

        }
    );


    document.addEventListener(
        "mousemove",
        e => {

            if (!pulsado) return;


            let movimientoX =
                e.clientX - inicioX;


            let movimientoY =
                e.clientY - inicioY;


            rotY +=
                movimientoX * 0.4;


            rotX -=
                movimientoY * 0.3;


            rotX =
                Math.max(
                    -60,
                    Math.min(
                        60,
                        rotX
                    )
                );


            inicioX =
                e.clientX;


            inicioY =
                e.clientY;


            actualizarVista();

        }
    );


    document.addEventListener(
        "mouseup",
        () => {

            pulsado = false;

            tanque.style.cursor =
                "grab";

        }
    );


    /* =========================
       RUEDA — ZOOM
    ========================= */

    tanque.addEventListener(
        "wheel",
        e => {

            e.preventDefault();


            zoom +=
                e.deltaY * -0.001;


            zoom =
                Math.max(
                    0.6,
                    Math.min(
                        1.6,
                        zoom
                    )
                );


            actualizarVista();

        },
        {
            passive: false
        }
    );


    /* =========================
       FUNCIONES GLOBALES
    ========================= */

    window.actualizar3D =
        actualizar3D;


    window.actualizarVista =
        actualizarVista;


    /* =========================
       INICIALIZAR
    ========================= */

    tanque.style.cursor =
        "grab";


    actualizar3D();

    actualizarVista();


});
