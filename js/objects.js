console.log("OBJECTS ENGINE V19 - MOVIMIENTO 3D PROFESIONAL");


/* ==================================================
   TANQUE
================================================== */

var tanque = document.querySelector(".tank-3d");

if (!tanque) {

    console.error("NO EXISTE TANK-3D");

}


/* ==================================================
   VARIABLES
================================================== */

var objetoActivo = null;

var moviendoObjeto = false;

var inicioMouseX = 0;

var inicioMouseY = 0;


/* ==================================================
   CREAR OBJETO
================================================== */

window.crearObjeto = function(tipo, icono) {

    /* ------------------------------------------
       LOCALIZAR TANQUE
    ------------------------------------------ */

    if (!tanque) {

        tanque =
            document.querySelector(".tank-3d");

    }


    if (!tanque) {

        console.error("NO EXISTE TANK-3D");

        return;

    }


    /* ------------------------------------------
       CREAR ELEMENTO
    ------------------------------------------ */

    var objeto =
        document.createElement("div");


    objeto.className =
        "objeto " + tipo;


    objeto.textContent =
        icono;


    /* ------------------------------------------
       ESTILO
    ------------------------------------------ */

    objeto.style.position =
        "absolute";

    objeto.style.left =
        "50%";

    objeto.style.top =
        "50%";

    objeto.style.zIndex =
        "99999";

    objeto.style.fontSize =
        "40px";

    objeto.style.transformStyle =
        "preserve-3d";

    objeto.style.cursor =
        "grab";

    objeto.style.userSelect =
        "none";

    objeto.style.pointerEvents =
        "auto";


    /* ------------------------------------------
       DATOS 3D
    ------------------------------------------ */

    objeto.dataset.x =
        "0";

    objeto.dataset.y =
        "0";

    objeto.dataset.z =
        "0";

    objeto.dataset.scale =
        "1";


    /* ------------------------------------------
       POSICIÓN INICIAL
    ------------------------------------------ */

    actualizarPosicion(
        objeto
    );


    tanque.appendChild(
        objeto
    );


    /* ------------------------------------------
       RUEDA EXCLUSIVA DEL OBJETO
    ------------------------------------------ */

    objeto.addEventListener(
        "wheel",
        function(e) {

            /*
               IMPORTANTE:

               La rueda sobre el objeto
               pertenece exclusivamente al objeto.

               Así evitamos que el tanque
               haga zoom al mismo tiempo.
            */

            e.preventDefault();

            e.stopPropagation();


            /* ======================================
               SHIFT + RUEDA = TAMAÑO
            ====================================== */

            if (e.shiftKey) {

                var escala =
                    Number(
                        objeto.dataset.scale || 1
                    );


                /*
                   Movimiento suave.
                   No saltos grandes.
                */

                escala -=
                    e.deltaY * 0.001;


                /*
                   Límites de tamaño:
                   40% - 300%
                */

                escala =
                    Math.max(
                        0.4,
                        Math.min(
                            3,
                            escala
                        )
                    );


                objeto.dataset.scale =
                    escala;


                actualizarPosicion(
                    objeto
                );


                console.log(
                    "TAMAÑO OBJETO:",
                    escala
                );


                return;

            }


            /* ======================================
               RUEDA = PROFUNDIDAD Z
            ====================================== */

            var z =
                Number(
                    objeto.dataset.z
                );


            /*
               Rueda arriba:
               acercar

               Rueda abajo:
               alejar
            */

            var pasoZ =
                15;


            if (
                e.deltaY < 0
            ) {

                z +=
                    pasoZ;

            } else {

                z -=
                    pasoZ;

            }


            /* ======================================
               ANCHO REAL DEL ACUARIO
            ====================================== */

            var campoAncho =
                document.getElementById(
                    "ancho"
                );


            var anchoAcuario =
                campoAncho
                    ? Number(
                        campoAncho.value
                    )
                    : 30;


            if (
                !Number.isFinite(
                    anchoAcuario
                )
            ) {

                anchoAcuario =
                    30;

            }


            /* ======================================
               LÍMITE Z
            ====================================== */

            /*
               Se mantiene el sistema
               que ya comprobamos que funciona.
            */

            var limiteZ =
                anchoAcuario * 2;


            z =
                Math.max(
                    -limiteZ,
                    Math.min(
                        limiteZ,
                        z
                    )
                );


            objeto.dataset.z =
                z;


            actualizarPosicion(
                objeto
            );


            console.log(
                "PROFUNDIDAD Z:",
                z
            );

        },
        {
            passive: false
        }
    );


    /* ------------------------------------------
       INFORMACIÓN
    ------------------------------------------ */

    console.log(
        "OBJETO 3D CREADO:",
        tipo,
        "X:",
        objeto.dataset.x,
        "Y:",
        objeto.dataset.y,
        "Z:",
        objeto.dataset.z
    );


    return objeto;

};


/* ==================================================
   ACTUALIZAR POSICIÓN 3D
================================================== */

function actualizarPosicion(objeto) {

    if (!objeto) {

        return;

    }


    var x =
        Number(
            objeto.dataset.x || 0
        );


    var y =
        Number(
            objeto.dataset.y || 0
        );


    var z =
        Number(
            objeto.dataset.z || 0
        );


    var escala =
        Number(
            objeto.dataset.scale || 1
        );


    if (
        !Number.isFinite(
            escala
        )
    ) {

        escala =
            1;

    }


    objeto.style.transform =
        "translate3d(" +
        x +
        "px," +
        y +
        "px," +
        z +
        "px) scale(" +
        escala +
        ")";

}


/* ==================================================
   BUSCAR OBJETO BAJO EL RATÓN
================================================== */

function buscarObjeto(x, y) {

    if (!tanque) {

        return null;

    }


    var objetos =
        Array.from(
            tanque.querySelectorAll(
                ".objeto"
            )
        );


    /*
       Empezamos por el último objeto
       porque normalmente será el que
       está por encima.
    */

    for (
        var i =
            objetos.length - 1;

        i >= 0;

        i--
    ) {

        var objeto =
            objetos[i];


        var rect =
            objeto.getBoundingClientRect();


        if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {

            return objeto;

        }

    }


    return null;

}


/* ==================================================
   CALCULAR LÍMITES DEL OBJETO
================================================== */

function calcularLimitesObjeto(objeto) {

    if (
        !tanque ||
        !objeto
    ) {

        return {

            x: 0,

            y: 0

        };

    }


    /*
       IMPORTANTE:

       NO utilizamos getBoundingClientRect()
       para calcular el límite lógico.

       Ese método incluye:

       - scale del tanque
       - rotateX
       - rotateY
       - perspectiva

       y eso provocaba que los límites
       cambiaran al girar el acuario.
    */


    var anchoTanque =
        tanque.offsetWidth;


    var altoTanque =
        tanque.offsetHeight;


    /*
       Tamaño original del objeto.
    */

    var anchoObjeto =
        objeto.offsetWidth;


    var altoObjeto =
        objeto.offsetHeight;


    /*
       Escala actual del objeto.
    */

    var escala =
        Number(
            objeto.dataset.scale || 1
        );


    if (
        !Number.isFinite(
            escala
        )
    ) {

        escala =
            1;

    }


    /*
       Tamaño real lógico del objeto.
    */

    var anchoReal =
        anchoObjeto *
        escala;


    var altoReal =
        altoObjeto *
        escala;


    /*
       Mitad del objeto.
    */

    var mitadObjetoX =
        anchoReal / 2;


    var mitadObjetoY =
        altoReal / 2;


    /*
       Pequeño margen de seguridad.

       Evita que el emoji toque
       exactamente el cristal.
    */

    var margen =
        5;


    /*
       Límites desde el centro.

       El objeto parte de:

       left: 50%
       top: 50%
    */

    var limiteX =
        (anchoTanque / 2) -
        mitadObjetoX -
        margen;


    var limiteY =
        (altoTanque / 2) -
        mitadObjetoY -
        margen;


    /*
       Nunca permitir límites negativos.
    */

    limiteX =
        Math.max(
            0,
            limiteX
        );


    limiteY =
        Math.max(
            0,
            limiteY
        );


    return {

        x: limiteX,

        y: limiteY

    };

}


/* ==================================================
   SELECCIONAR OBJETO
================================================== */

document.addEventListener(
    "mousedown",
    function(e) {

        var objeto =
            buscarObjeto(
                e.clientX,
                e.clientY
            );


        if (!objeto) {

            return;

        }


        /*
           Evita que el evento llegue
           al sistema de giro del tanque.
        */

        e.preventDefault();

        e.stopPropagation();


        objetoActivo =
            objeto;


        moviendoObjeto =
            true;


        inicioMouseX =
            e.clientX;


        inicioMouseY =
            e.clientY;


        objeto.style.cursor =
            "grabbing";


        objeto.style.zIndex =
            "100000";


        console.log(
            "OBJETO SELECCIONADO:",
            objeto.className
        );

    },
    true
);


/* ==================================================
   MOVIMIENTO X / Y
================================================== */

document.addEventListener(
    "mousemove",
    function(e) {

        if (
            !moviendoObjeto ||
            !objetoActivo
        ) {

            return;

        }


        /* ==========================================
           MOVIMIENTO DEL RATÓN
        ========================================== */

        var dx =
            e.clientX -
            inicioMouseX;


        var dy =
            e.clientY -
            inicioMouseY;


        /* ==========================================
           MATRIZ REAL DEL TANQUE
        ========================================== */

        var localDX =
            dx;


        var localDY =
            dy;


        var estilo =
            window.getComputedStyle(
                tanque
            );


        var transform =
            estilo.transform;


        /*
           Convertimos el movimiento
           de pantalla al espacio local
           del acuario.

           Esto permite que el movimiento
           siga siendo natural al girarlo.
        */

        if (
            transform &&
            transform !== "none"
        ) {

            var matriz =
                null;


            try {

                matriz =
                    new DOMMatrix(
                        transform
                    );

            } catch (error) {

                matriz =
                    null;

            }


            if (matriz) {

                var a =
                    matriz.a;

                var b =
                    matriz.b;

                var c =
                    matriz.c;

                var d =
                    matriz.d;


                var determinante =
                    a * d -
                    b * c;


                if (
                    Math.abs(
                        determinante
                    ) > 0.0001
                ) {

                    localDX =
                        (
                            d * dx -
                            c * dy
                        ) /
                        determinante;


                    localDY =
                        (
                            -b * dx +
                            a * dy
                        ) /
                        determinante;

                }

            }

        }


        /* ==========================================
           POSICIÓN ACTUAL
        ========================================== */

        var x =
            Number(
                objetoActivo.dataset.x || 0
            );


        var y =
            Number(
                objetoActivo.dataset.y || 0
            );


        if (
            !Number.isFinite(x)
        ) {

            x =
                0;

        }


        if (
            !Number.isFinite(y)
        ) {

            y =
                0;

        }


        /* ==========================================
           APLICAR MOVIMIENTO
        ========================================== */

        x +=
            localDX;


        y +=
            localDY;


        /* ==========================================
           LÍMITES REALES
        ========================================== */

        var limites =
            calcularLimitesObjeto(
                objetoActivo
            );


        /*
           X
        */

        x =
            Math.max(
                -limites.x,
                Math.min(
                    limites.x,
                    x
                )
            );


        /*
           Y
        */

        y =
            Math.max(
                -limites.y,
                Math.min(
                    limites.y,
                    y
                )
            );


        /* ==========================================
           GUARDAR POSICIÓN
        ========================================== */

        objetoActivo.dataset.x =
            x;


        objetoActivo.dataset.y =
            y;


        /* ==========================================
           ACTUALIZAR RATÓN
        ========================================== */

        inicioMouseX =
            e.clientX;


        inicioMouseY =
            e.clientY;


        /* ==========================================
           ACTUALIZAR OBJETO
        ========================================== */

        actualizarPosicion(
            objetoActivo
        );

    }
);


/* ==================================================
   SOLTAR OBJETO
================================================== */

document.addEventListener(
    "mouseup",
    function() {

        if (objetoActivo) {

            objetoActivo.style.cursor =
                "grab";

        }


        moviendoObjeto =
            false;


        objetoActivo =
            null;

    }
);


/* ==================================================
   BOTONES DE OBJETOS
================================================== */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        document
            .querySelectorAll(".tool")
            .forEach(
                function(boton) {

                    boton.addEventListener(
                        "click",
                        function() {

                            var texto =
                                boton.innerText;


                            /* =========================
                               ROCA
                            ========================= */

                            if (
                                texto.includes(
                                    "Roca"
                                )
                            ) {

                                crearObjeto(
                                    "roca",
                                    "🪨"
                                );

                            }


                            /* =========================
                               PLANTA
                            ========================= */

                            if (
                                texto.includes(
                                    "Planta"
                                )
                            ) {

                                crearObjeto(
                                    "planta",
                                    "🌱"
                                );

                            }


                            /* =========================
                               PEZ
                            ========================= */

                            if (
                                texto.includes(
                                    "Pez"
                                )
                            ) {

                                crearObjeto(
                                    "pez",
                                    "🐟"
                                );

                            }

                        }
                    );

                }
            );

    }
);


/* ==================================================
   FIN
================================================== */

console.log(
    "OBJECTS ENGINE V19 LISTO"
);
