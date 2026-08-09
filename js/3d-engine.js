/* ============================================================
   ACUARIO DESIGNER STUDIO
   3D ENGINE V7 PROFESSIONAL
   REAL AQUARIUM ENGINE
   CRISTAL + AGUA + GRAVA + PROFUNDIDAD REAL
============================================================ */

console.log("3D ENGINE V7 REAL AQUARIUM CARGADO");


document.addEventListener("DOMContentLoaded", () => {

    /* ========================================================
       ELEMENTOS
    ======================================================== */

    const acuario = document.querySelector(".aquarium");
    const tanque = document.querySelector(".tank-3d");

    const largo = document.getElementById("largo");
    const ancho = document.getElementById("ancho");
    const alto = document.getElementById("alto");


    if (!acuario || !tanque || !largo || !ancho || !alto) {

        console.error(
            "3D ENGINE V7: FALTAN ELEMENTOS NECESARIOS"
        );

        return;
    }


    /* ========================================================
       CÁMARA
    ======================================================== */

    let rotX = -10;
    let rotY = -25;

    let zoom = 1;

    let pulsado = false;

    let inicioX = 0;
    let inicioY = 0;


    /* ========================================================
       CONFIGURACIÓN VISUAL
    ======================================================== */

    const ESCALA = 5;

    const GRAVA_CM = 4;

    const AGUA_CM = 2;


    /* ========================================================
       OBTENER MEDIDAS
    ======================================================== */

    function obtenerMedidas() {

        let L =
            Number(largo.value);

        let A =
            Number(ancho.value);

        let H =
            Number(alto.value);


        if (!Number.isFinite(L) || L <= 0) {

            L = 70;

        }


        if (!Number.isFinite(A) || A <= 0) {

            A = 30;

        }


        if (!Number.isFinite(H) || H <= 0) {

            H = 40;

        }


        return {
            L,
            A,
            H
        };
    }


    /* ========================================================
       BUSCAR ELEMENTOS 3D
    ======================================================== */

    function obtenerElemento(clase) {

        return tanque.querySelector(
            clase
        );
    }


    /* ========================================================
       POSICIONAR CRISTALES
    ======================================================== */

    function actualizarCristales(
        anchoVisual,
        altoVisual,
        profundidadVisual
    ) {

        const frente =
            obtenerElemento(
                ".glass-front"
            );

        const trasero =
            obtenerElemento(
                ".glass-back"
            );

        const izquierdo =
            obtenerElemento(
                ".glass-left"
            );

        const derecho =
            obtenerElemento(
                ".glass-right"
            );

        const fondo =
            obtenerElemento(
                ".glass-bottom"
            );


        /* ----------------------------------------------------
           FRENTE
        ---------------------------------------------------- */

        if (frente) {

            frente.style.width =
                anchoVisual + "px";

            frente.style.height =
                altoVisual + "px";

            frente.style.left =
                "0px";

            frente.style.top =
                "0px";

            frente.style.transform =
                `translateZ(${profundidadVisual / 2}px)`;

        }


        /* ----------------------------------------------------
           TRASERA
        ---------------------------------------------------- */

        if (trasero) {

            trasero.style.width =
                anchoVisual + "px";

            trasero.style.height =
                altoVisual + "px";

            trasero.style.left =
                "0px";

            trasero.style.top =
                "0px";

            trasero.style.transform =
                `translateZ(${-profundidadVisual / 2}px)`;

        }


        /* ----------------------------------------------------
           LATERAL IZQUIERDO
        ---------------------------------------------------- */

        if (izquierdo) {

            izquierdo.style.width =
                profundidadVisual + "px";

            izquierdo.style.height =
                altoVisual + "px";

            izquierdo.style.left =
                "0px";

            izquierdo.style.top =
                "0px";

            izquierdo.style.transform =
                `
                rotateY(90deg)
                translateZ(${-anchoVisual / 2}px)
                `;

            izquierdo.style.transformOrigin =
                "center center";
        }


        /* ----------------------------------------------------
           LATERAL DERECHO
        ---------------------------------------------------- */

        if (derecho) {

            derecho.style.width =
                profundidadVisual + "px";

            derecho.style.height =
                altoVisual + "px";

            derecho.style.left =
                "0px";

            derecho.style.top =
                "0px";

            derecho.style.transform =
                `
                rotateY(90deg)
                translateZ(${anchoVisual / 2}px)
                `;

            derecho.style.transformOrigin =
                "center center";
        }


        /* ----------------------------------------------------
           FONDO
        ---------------------------------------------------- */

        if (fondo) {

            fondo.style.width =
                anchoVisual + "px";

            fondo.style.height =
                profundidadVisual + "px";

            fondo.style.left =
                "0px";

            fondo.style.top =
                "0px";

            fondo.style.transform =
                `
                rotateX(90deg)
                translateZ(${-altoVisual / 2}px)
                `;

            fondo.style.transformOrigin =
                "center center";
        }
    }


    /* ========================================================
       ACTUALIZAR AGUA
    ======================================================== */

    function actualizarAgua(
        anchoVisual,
        altoVisual,
        profundidadVisual,
        H
    ) {

        const agua =
            obtenerElemento(
                ".water-3d"
            );


        if (!agua) {

            return;
        }


        /*
           Nivel de agua.

           Dejamos unos centímetros
           libres en la parte superior.
        */

        const alturaAguaCm =
            Math.max(
                1,
                H - AGUA_CM
            );


        const alturaAgua =
            alturaAguaCm *
            ESCALA;


        agua.style.width =
            anchoVisual + "px";

        agua.style.height =
            alturaAgua + "px";

        agua.style.left =
            "0px";


        /*
           La grava queda abajo.
        */

        const alturaGrava =
            GRAVA_CM *
            ESCALA;


        agua.style.top =
            (
                altoVisual -
                alturaGrava -
                alturaAgua
            ) + "px";


        agua.style.transform =
            `translateZ(0px)`;


        agua.dataset.altura =
            alturaAguaCm;


        /* ----------------------------------------------------
           SUPERFICIE
        ---------------------------------------------------- */

        const superficie =
            agua.querySelector(
                ".water-surface"
            );


        if (superficie) {

            superficie.style.left =
                "0px";

            superficie.style.top =
                "0px";

            superficie.style.width =
                "100%";

        }
    }


    /* ========================================================
       ACTUALIZAR GRAVA
    ======================================================== */

    function actualizarGrava(
        anchoVisual,
        profundidadVisual,
        altoVisual
    ) {

        const grava =
            obtenerElemento(
                ".substrate"
            );


        if (!grava) {

            return;
        }


        const alturaGrava =
            GRAVA_CM *
            ESCALA;


        grava.style.width =
            anchoVisual + "px";

        grava.style.height =
            alturaGrava + "px";

        grava.style.left =
            "0px";


        grava.style.top =
            (
                altoVisual -
                alturaGrava
            ) + "px";


        /*
           La grava ocupa todo
           el fondo del acuario.
        */

        grava.style.transform =
            `translateZ(0px)`;


        grava.dataset.altura =
            GRAVA_CM;
    }


    /* ========================================================
       TIRANTE
    ======================================================== */

    function actualizarTirante(
        L,
        A,
        H,
        anchoVisual,
        profundidadVisual
    ) {

        tanque
            .querySelectorAll(
                ".tirante3d"
            )
            .forEach(
                elemento =>
                    elemento.remove()
            );


        const litros =
            (
                L *
                A *
                H
            ) / 1000;


        /*
           Solo grandes acuarios.
        */

        if (litros <= 150) {

            return;
        }


        const tirante =
            document.createElement(
                "div"
            );


        tirante.className =
            "tirante3d";


        tirante.style.position =
            "absolute";


        tirante.style.width =
            (
                profundidadVisual -
                10
            ) + "px";


        tirante.style.height =
            "10px";


        tirante.style.left =
            (
                anchoVisual / 2 -
                5
            ) + "px";


        tirante.style.top =
            "-5px";


        /*
           Transversal:

           cruza el ancho/profundidad
           del acuario.
        */

        tirante.style.transform =
            `
            rotateY(90deg)
            translateZ(${anchoVisual / 2}px)
            `;


        tirante.style.transformOrigin =
            "center center";


        tirante.style.background =
            "rgba(220,250,255,.65)";


        tirante.style.border =
            "2px solid rgba(255,255,255,.8)";


        tirante.style.boxShadow =
            "0 0 12px rgba(0,220,255,.35)";


        tirante.style.zIndex =
            "120";


        tanque.appendChild(
            tirante
        );
    }


    /* ========================================================
       ACTUALIZAR TODO EL ACUARIO
    ======================================================== */

    function actualizar3D() {

        const medidas =
            obtenerMedidas();


        const L =
            medidas.L;

        const A =
            medidas.A;

        const H =
            medidas.H;


        /* ----------------------------------------------------
           DIMENSIONES VISUALES
        ---------------------------------------------------- */

        let anchoVisual =
            L * ESCALA;


        anchoVisual =
            Math.min(
                Math.max(
                    anchoVisual,
                    260
                ),
                850
            );


        let altoVisual =
            H * ESCALA;


        altoVisual =
            Math.min(
                Math.max(
                    altoVisual,
                    180
                ),
                500
            );


        let profundidadVisual =
            A * ESCALA;


        profundidadVisual =
            Math.min(
                Math.max(
                    profundidadVisual,
                    80
                ),
                400
            );


        /* ----------------------------------------------------
           CONTENEDOR
        ---------------------------------------------------- */

        acuario.style.width =
            anchoVisual + "px";

        acuario.style.height =
            altoVisual + "px";


        /* ----------------------------------------------------
           VARIABLES CSS
        ---------------------------------------------------- */

        tanque.style.setProperty(
            "--depth",
            profundidadVisual + "px"
        );


        tanque.style.setProperty(
            "--tank-width",
            anchoVisual + "px"
        );


        tanque.style.setProperty(
            "--tank-height",
            altoVisual + "px"
        );


        tanque.style.setProperty(
            "--tank-depth",
            profundidadVisual + "px"
        );


        acuario.style.setProperty(
            "--profundidad",
            profundidadVisual + "px"
        );


        /* ----------------------------------------------------
           DATOS
        ---------------------------------------------------- */

        acuario.dataset.medidas =
            `${L} x ${A} x ${H} cm`;

        acuario.dataset.largo =
            L;

        acuario.dataset.ancho =
            A;

        acuario.dataset.alto =
            H;

        acuario.dataset.profundidad =
            profundidadVisual;


        /* ----------------------------------------------------
           CRISTALES
        ---------------------------------------------------- */

        actualizarCristales(
            anchoVisual,
            altoVisual,
            profundidadVisual
        );


        /* ----------------------------------------------------
           GRAVA
        ---------------------------------------------------- */

        actualizarGrava(
            anchoVisual,
            profundidadVisual,
            altoVisual
        );


        /* ----------------------------------------------------
           AGUA
        ---------------------------------------------------- */

        actualizarAgua(
            anchoVisual,
            altoVisual,
            profundidadVisual,
            H
        );


        /* ----------------------------------------------------
           TIRANTE
        ---------------------------------------------------- */

        actualizarTirante(
            L,
            A,
            H,
            anchoVisual,
            profundidadVisual
        );


        /* ----------------------------------------------------
           INFORMACIÓN
        ---------------------------------------------------- */

        const litros =
            (
                L *
                A *
                H
            ) / 1000;


        console.log(
            "3D V7:",
            `${L} x ${A} x ${H} cm`,
            "Profundidad:",
            profundidadVisual + "px",
            "Agua:",
            Math.max(
                1,
                H - AGUA_CM
            ) + "cm",
            "Grava:",
            GRAVA_CM + "cm",
            "Volumen:",
            litros.toFixed(1) + "L"
        );
    }


    /* ========================================================
       ACTUALIZAR CÁMARA
    ======================================================== */

    function actualizarVista() {

        tanque.style.transform =
            `
            scale(${zoom})
            rotateX(${rotX}deg)
            rotateY(${rotY}deg)
            `;

    }


    /* ========================================================
       INPUTS
    ======================================================== */

    [
        largo,
        ancho,
        alto
    ].forEach(
        input => {

            input.addEventListener(
                "input",
                actualizar3D
            );

        }
    );


    /* ========================================================
       ROTACIÓN DEL ACUARIO
    ======================================================== */

    tanque.addEventListener(
        "mousedown",
        e => {

            /*
               Si hemos pulsado un objeto,
               el objeto.js se encarga de él.
            */

            if (
                e.target.closest(
                    ".objeto"
                )
            ) {

                return;
            }


            pulsado =
                true;


            inicioX =
                e.clientX;


            inicioY =
                e.clientY;


            tanque.style.cursor =
                "grabbing";


            e.preventDefault();

        }
    );


    document.addEventListener(
        "mousemove",
        e => {

            if (!pulsado) {

                return;
            }


            const movimientoX =
                e.clientX -
                inicioX;


            const movimientoY =
                e.clientY -
                inicioY;


            rotY +=
                movimientoX *
                0.4;


            rotX -=
                movimientoY *
                0.3;


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

            pulsado =
                false;


            tanque.style.cursor =
                "grab";

        }
    );


    /* ========================================================
       ZOOM DEL TANQUE
    ======================================================== */

    tanque.addEventListener(
        "wheel",
        e => {

            /*
               Si la rueda pertenece a un objeto,
               objects.js se encarga de ella.
            */

            if (
                e.target.closest(
                    ".objeto"
                )
            ) {

                return;
            }


            e.preventDefault();


            zoom +=
                e.deltaY *
                -0.001;


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


    /* ========================================================
       FUNCIONES GLOBALES
    ======================================================== */

    window.actualizar3D =
        actualizar3D;


    window.actualizarVista =
        actualizarVista;


    /* ========================================================
       INICIALIZAR
    ======================================================== */

    tanque.style.cursor =
        "grab";


    actualizar3D();

    actualizarVista();


    console.log(
        "3D ENGINE V7 REAL AQUARIUM LISTO"
    );

});
