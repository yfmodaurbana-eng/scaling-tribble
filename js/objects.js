/* ============================================================
   ACUARIO DESIGNER STUDIO
   OBJECTS ENGINE V20 PROFESSIONAL
   MOTOR DE OBJETOS 3D
   ============================================================ */

console.log("OBJECTS ENGINE V20 PROFESSIONAL CARGADO");


/* ============================================================
   TANQUE
   ============================================================ */

var tanque =
    document.querySelector(".tank-3d");


if (!tanque) {

    console.warn(
        "OBJECTS V20: tank-3d todavía no encontrado."
    );

}


/* ============================================================
   ESTADO GLOBAL
   ============================================================ */

var objetoActivo = null;

var moviendoObjeto = false;

var inicioMouseX = 0;

var inicioMouseY = 0;


/* ============================================================
   OBTENER TANQUE
   ============================================================ */

function obtenerTanque() {

    if (
        tanque &&
        document.body.contains(tanque)
    ) {

        return tanque;

    }


    tanque =
        document.querySelector(".tank-3d");


    return tanque;

}


/* ============================================================
   CREAR OBJETO
   ============================================================ */

window.crearObjeto =
function(tipo, icono) {

    var t =
        obtenerTanque();


    if (!t) {

        console.error(
            "OBJECTS V20: NO EXISTE .tank-3d"
        );

        return null;

    }


    /* --------------------------------------------------------
       CREAR ELEMENTO
       -------------------------------------------------------- */

    var objeto =
        document.createElement("div");


    objeto.className =
        "objeto " + tipo;


    objeto.textContent =
        icono;


    /* --------------------------------------------------------
       ESTILO BASE
       -------------------------------------------------------- */

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


    /*
       Evita que el navegador intente
       seleccionar texto o arrastrar
       el emoji como imagen.
    */

    objeto.style.webkitUserSelect =
        "none";


    /* --------------------------------------------------------
       DATOS DE POSICIÓN
       -------------------------------------------------------- */

    objeto.dataset.x =
        "0";

    objeto.dataset.y =
        "0";

    objeto.dataset.z =
        "0";

    objeto.dataset.scale =
        "1";


    /* --------------------------------------------------------
       AÑADIR AL TANQUE
       -------------------------------------------------------- */

    t.appendChild(
        objeto
    );


    /* --------------------------------------------------------
       ACTUALIZAR
       -------------------------------------------------------- */

    actualizarPosicion(
        objeto
    );


    /* --------------------------------------------------------
       RUEDA DEL OBJETO
       -------------------------------------------------------- */

    objeto.addEventListener(
        "wheel",
        function(e) {

            /*
               MUY IMPORTANTE:

               La rueda sobre el objeto
               nunca debe llegar al tanque.
            */

            e.preventDefault();

            e.stopPropagation();


            /* ================================================
               SHIFT + RUEDA
               CAMBIAR TAMAÑO
               ================================================ */

            if (e.shiftKey) {

                cambiarEscalaObjeto(
                    objeto,
                    e.deltaY
                );

                return;

            }


            /* ================================================
               RUEDA NORMAL
               PROFUNDIDAD Z
               ================================================ */

            cambiarProfundidadObjeto(
                objeto,
                e.deltaY
            );

        },
        {
            passive: false
        }
    );


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


/* ============================================================
   ACTUALIZAR POSICIÓN 3D
   ============================================================ */

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


    if (!Number.isFinite(x)) {

        x = 0;

    }


    if (!Number.isFinite(y)) {

        y = 0;

    }


    if (!Number.isFinite(z)) {

        z = 0;

    }


    if (
        !Number.isFinite(escala) ||
        escala <= 0
    ) {

        escala = 1;

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


/* ============================================================
   BUSCAR OBJETO BAJO EL RATÓN
   ============================================================ */

function buscarObjeto(
    mouseX,
    mouseY
) {

    var t =
        obtenerTanque();


    if (!t) {

        return null;

    }


    var objetos =
        Array.from(
            t.querySelectorAll(
                ".objeto"
            )
        );


    /*
       El último objeto creado
       se comprueba primero.
    */

    for (
        var i =
            objetos.length - 1;

        i >= 0;

        i--
    ) {

        var objeto =
            objetos[i];


        if (
            getComputedStyle(
                objeto
            ).pointerEvents === "none"
        ) {

            continue;

        }


        var rect =
            objeto.getBoundingClientRect();


        if (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
        ) {

            return objeto;

        }

    }


    return null;

}


/* ============================================================
   OBTENER MATRIZ 2D DEL TANQUE
   ============================================================ */

function obtenerMatrizTanque() {

    var t =
        obtenerTanque();


    if (!t) {

        return null;

    }


    var transform =
        window.getComputedStyle(
            t
        ).transform;


    if (
        !transform ||
        transform === "none"
    ) {

        return null;

    }


    try {

        return new DOMMatrix(
            transform
        );

    } catch (error) {

        return null;

    }

}


/* ============================================================
   CONVERTIR MOVIMIENTO DE PANTALLA
   A MOVIMIENTO LOCAL DEL TANQUE
   ============================================================ */

function convertirMovimientoLocal(
    dx,
    dy
) {

    var matriz =
        obtenerMatrizTanque();


    /*
       Sin transformación:
       movimiento normal.
    */

    if (!matriz) {

        return {

            x: dx,

            y: dy

        };

    }


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


    /*
       Si la matriz no se puede invertir,
       usamos movimiento normal.
    */

    if (
        !Number.isFinite(
            determinante
        ) ||
        Math.abs(
            determinante
        ) < 0.0001
    ) {

        return {

            x: dx,

            y: dy

        };

    }


    var localX =
        (
            d * dx -
            c * dy
        ) /
        determinante;


    var localY =
        (
            -b * dx +
            a * dy
        ) /
        determinante;


    /*
       Evitamos valores corruptos.
    */

    if (
        !Number.isFinite(localX)
    ) {

        localX = dx;

    }


    if (
        !Number.isFinite(localY)
    ) {

        localY = dy;

    }


    return {

        x: localX,

        y: localY

    };

}


/* ============================================================
   CALCULAR LÍMITES DEL OBJETO
   ============================================================ */

function calcularLimitesObjeto(
    objeto
) {

    var t =
        obtenerTanque();


    if (!t || !objeto) {

        return {

            x: 0,

            y: 0

        };

    }


    /*
       IMPORTANTE:

       Los límites se calculan en el espacio
       interno del tanque.

       NO utilizamos getBoundingClientRect()
       para establecer los límites porque ese
       valor cambia al rotar el acuario.
    */

    var anchoTanque =
        t.offsetWidth;


    var altoTanque =
        t.offsetHeight;


    if (
        anchoTanque <= 0 ||
        altoTanque <= 0
    ) {

        return {

            x: 0,

            y: 0

        };

    }


    /* --------------------------------------------------------
       TAMAÑO DEL OBJETO
       -------------------------------------------------------- */

    var anchoObjeto =
        objeto.offsetWidth;


    var altoObjeto =
        objeto.offsetHeight;


    var escala =
        Number(
            objeto.dataset.scale || 1
        );


    if (
        !Number.isFinite(escala) ||
        escala <= 0
    ) {

        escala = 1;

    }


    var anchoReal =
        anchoObjeto *
        escala;


    var altoReal =
        altoObjeto *
        escala;


    /* --------------------------------------------------------
       MITAD DEL OBJETO
       -------------------------------------------------------- */

    var mitadX =
        anchoReal / 2;


    var mitadY =
        altoReal / 2;


    /*
       Pequeño margen para evitar
       que el objeto atraviese el cristal.

       No usamos margen grande.
    */

    var margenX =
        2;


    var margenY =
        2;


    /* --------------------------------------------------------
       LÍMITES
       -------------------------------------------------------- */

    var limiteX =
        (
            anchoTanque / 2
        ) -
        mitadX -
        margenX;


    var limiteY =
        (
            altoTanque / 2
        ) -
        mitadY -
        margenY;


    /*
       Seguridad.
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


/* ============================================================
   LIMITAR POSICIÓN
   ============================================================ */

function limitarPosicion(
    objeto,
    x,
    y
) {

    var limites =
        calcularLimitesObjeto(
            objeto
        );


    x =
        Math.max(
            -limites.x,
            Math.min(
                limites.x,
                x
            )
        );


    y =
        Math.max(
            -limites.y,
            Math.min(
                limites.y,
                y
            )
        );


    return {

        x: x,

        y: y

    };

}


/* ============================================================
   SELECCIONAR OBJETO
   ============================================================ */

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
           Detenemos completamente
           el sistema de giro del tanque.
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


/* ============================================================
   MOVIMIENTO DEL OBJETO
   ============================================================ */

document.addEventListener(
    "mousemove",
    function(e) {

        if (
            !moviendoObjeto ||
            !objetoActivo
        ) {

            return;

        }


        /* ----------------------------------------------------
           MOVIMIENTO DEL RATÓN
           ---------------------------------------------------- */

        var dx =
            e.clientX -
            inicioMouseX;


        var dy =
            e.clientY -
            inicioMouseY;


        /*
           Ignorar movimientos microscópicos.
        */

        if (
            Math.abs(dx) < 0.01 &&
            Math.abs(dy) < 0.01
        ) {

            return;

        }


        /* ----------------------------------------------------
           CONVERTIR A ESPACIO LOCAL
           ---------------------------------------------------- */

        var movimiento =
            convertirMovimientoLocal(
                dx,
                dy
            );


        /* ----------------------------------------------------
           POSICIÓN ACTUAL
           ---------------------------------------------------- */

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

            x = 0;

        }


        if (
            !Number.isFinite(y)
        ) {

            y = 0;

        }


        /* ----------------------------------------------------
           APLICAR MOVIMIENTO
           ---------------------------------------------------- */

        x +=
            movimiento.x;


        y +=
            movimiento.y;


        /* ----------------------------------------------------
           APLICAR LÍMITES
           ---------------------------------------------------- */

        var posicion =
            limitarPosicion(
                objetoActivo,
                x,
                y
            );


        /* ----------------------------------------------------
           GUARDAR
           ---------------------------------------------------- */

        objetoActivo.dataset.x =
            posicion.x;


        objetoActivo.dataset.y =
            posicion.y;


        /* ----------------------------------------------------
           ACTUALIZAR REFERENCIA DEL RATÓN
           ---------------------------------------------------- */

        inicioMouseX =
            e.clientX;


        inicioMouseY =
            e.clientY;


        /* ----------------------------------------------------
           ACTUALIZAR OBJETO
           ---------------------------------------------------- */

        actualizarPosicion(
            objetoActivo
        );

    }
);


/* ============================================================
   SOLTAR OBJETO
   ============================================================ */

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


/* ============================================================
   CAMBIAR PROFUNDIDAD Z
   ============================================================ */

function cambiarProfundidadObjeto(
    objeto,
    deltaY
) {

    if (!objeto) {

        return;

    }


    var z =
        Number(
            objeto.dataset.z || 0
        );


    if (
        !Number.isFinite(z)
    ) {

        z = 0;

    }


    /*
       Paso de profundidad.

       Rueda arriba:
       acercar.

       Rueda abajo:
       alejar.
    */

    var pasoZ =
        15;


    if (deltaY < 0) {

        z +=
            pasoZ;

    } else {

        z -=
            pasoZ;

    }


    /* --------------------------------------------------------
       ANCHO DEL ACUARIO
       -------------------------------------------------------- */

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


    /*
       El sistema anterior ya funcionaba
       con este límite.
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

}


/* ============================================================
   CAMBIAR ESCALA DEL OBJETO
   ============================================================ */

function cambiarEscalaObjeto(
    objeto,
    deltaY
) {

    if (!objeto) {

        return;

    }


    var escala =
        Number(
            objeto.dataset.scale || 1
        );


    if (
        !Number.isFinite(escala)
    ) {

        escala = 1;

    }


    /*
       Zoom/tamaño suave.

       No modifica el tanque.
    */

    escala -=
        deltaY * 0.001;


    /*
       Límites:

       40% mínimo
       300% máximo
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


    /*
       Después de cambiar tamaño
       reajustamos su posición para
       evitar que salga del tanque.
    */

    var x =
        Number(
            objeto.dataset.x || 0
        );


    var y =
        Number(
            objeto.dataset.y || 0
        );


    var posicion =
        limitarPosicion(
            objeto,
            x,
            y
        );


    objeto.dataset.x =
        posicion.x;


    objeto.dataset.y =
        posicion.y;


    actualizarPosicion(
        objeto
    );


    console.log(
        "TAMAÑO OBJETO:",
        escala
    );

}


/* ============================================================
   BOTONES DE OBJETOS
   ============================================================ */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        document
            .querySelectorAll(
                ".tool"
            )
            .forEach(
                function(boton) {

                    boton.addEventListener(
                        "click",
                        function() {

                            var texto =
                                boton.innerText;


                            /* --------------------------------
                               ROCA
                            -------------------------------- */

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


                            /* --------------------------------
                               PLANTA
                            -------------------------------- */

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


                            /* --------------------------------
                               PEZ
                            -------------------------------- */

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


/* ============================================================
   COMPATIBILIDAD
   ============================================================ */

/*
   Dejamos estas funciones disponibles
   por si otros archivos del proyecto
   las necesitan.
*/

window.actualizarPosicionObjeto =
    actualizarPosicion;


window.buscarObjeto3D =
    buscarObjeto;


/* ============================================================
   FIN
   ============================================================ */

console.log(
    "OBJECTS ENGINE V20 PROFESSIONAL LISTO"
);
