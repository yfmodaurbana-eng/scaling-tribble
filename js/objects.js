/* ============================================================
   ACUARIO DESIGNER STUDIO
   OBJECTS ENGINE V21 FINAL
   MOTOR DE OBJETOS 3D
   MOVIMIENTO + PROFUNDIDAD + ESCALA
   LIMITES SIMETRICOS
============================================================ */

console.log("OBJECTS ENGINE V21 FINAL CARGADO");


/* ============================================================
   TANQUE
============================================================ */

var tanque =
    document.querySelector(".tank-3d");


if (!tanque) {

    console.warn(
        "OBJECTS V21: tank-3d todavía no encontrado."
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
            "OBJECTS V21: NO EXISTE .tank-3d"
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
       ESTILO
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

    objeto.style.lineHeight =
        "1";

    objeto.style.transformStyle =
        "preserve-3d";

    objeto.style.cursor =
        "grab";

    objeto.style.userSelect =
        "none";

    objeto.style.webkitUserSelect =
        "none";

    objeto.style.pointerEvents =
        "auto";


    /*
       Importante:

       Evita que el navegador interprete
       el emoji como elemento arrastrable.
    */

    objeto.draggable =
        false;


    /* --------------------------------------------------------
       DATOS 3D
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


    /* ========================================================
       RUEDA EXCLUSIVA DEL OBJETO
    ======================================================== */

    objeto.addEventListener(
        "wheel",
        function(e) {

            /*
               La rueda del objeto NO debe
               llegar al sistema del tanque.
            */

            e.preventDefault();

            e.stopPropagation();


            /* =================================================
               SHIFT + RUEDA = ESCALA
            ================================================= */

            if (e.shiftKey) {

                cambiarEscalaObjeto(
                    objeto,
                    e.deltaY
                );

                return;

            }


            /* =================================================
               RUEDA NORMAL = PROFUNDIDAD Z
            ================================================= */

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
       El último objeto está arriba.
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
   MATRIZ DEL TANQUE
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
   A MOVIMIENTO LOCAL
============================================================ */

function convertirMovimientoLocal(
    dx,
    dy
) {

    var matriz =
        obtenerMatrizTanque();


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


    if (
        !Number.isFinite(
            localX
        )
    ) {

        localX =
            dx;

    }


    if (
        !Number.isFinite(
            localY
        )
    ) {

        localY =
            dy;

    }


    return {

        x: localX,

        y: localY

    };

}


/* ============================================================
   CALCULAR LIMITES SIMETRICOS
============================================================ */

function calcularLimitesObjeto(
    objeto
) {

    var t =
        obtenerTanque();


    if (
        !t ||
        !objeto
    ) {

        return {

            x: 0,

            y: 0

        };

    }


    /*
       Usamos las dimensiones internas
       del tanque, NO getBoundingClientRect().

       Así el giro del acuario no altera
       los límites lógicos.
    */

    var anchoTanque =
        t.clientWidth;


    var altoTanque =
        t.clientHeight;


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
       MEDIDAS NATURALES DEL OBJETO
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
        !Number.isFinite(
            escala
        ) ||
        escala <= 0
    ) {

        escala = 1;

    }


    /*
       Como el objeto parte desde:

       left: 50%
       top: 50%

       calculamos exactamente cuánto
       puede desplazarse su CENTRO.
    */

    var mitadObjetoX =
        (
            anchoObjeto *
            escala
        ) / 2;


    var mitadObjetoY =
        (
            altoObjeto *
            escala
        ) / 2;


    /*
       Margen extremadamente pequeño.

       El objetivo es permitir que el objeto
       llegue prácticamente hasta el cristal
       sin atravesarlo.
    */

    var margenX =
        1;


    var margenY =
        1;


    var limiteX =
        (
            anchoTanque / 2
        ) -
        mitadObjetoX -
        margenX;


    var limiteY =
        (
            altoTanque / 2
        ) -
        mitadObjetoY -
        margenY;


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
           Evitamos que el tanque
           interprete el clic como giro.
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
   MOVIMIENTO X / Y
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


        var dx =
            e.clientX -
            inicioMouseX;


        var dy =
            e.clientY -
            inicioMouseY;


        if (
            Math.abs(dx) < 0.01 &&
            Math.abs(dy) < 0.01
        ) {

            return;

        }


        /*
           Convertimos el movimiento de pantalla
           al espacio local del tanque.
        */

        var movimiento =
            convertirMovimientoLocal(
                dx,
                dy
            );


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


        x +=
            movimiento.x;


        y +=
            movimiento.y;


        /*
           Aplicamos los límites.
        */

        var posicion =
            limitarPosicion(
                objetoActivo,
                x,
                y
            );


        objetoActivo.dataset.x =
            posicion.x;


        objetoActivo.dataset.y =
            posicion.y;


        /*
           Actualizamos el origen del movimiento
           para que no acumule error.
        */

        inicioMouseX =
            e.clientX;


        inicioMouseY =
            e.clientY;


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
   PROFUNDIDAD Z
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
       Movimiento suave y reversible.
    */

    var pasoZ =
        15;


    if (
        deltaY < 0
    ) {

        z +=
            pasoZ;

    } else {

        z -=
            pasoZ;

    }


    /*
       Ancho real del acuario.
    */

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
       Límite de profundidad.
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
   ESCALA DEL OBJETO
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
       Cambio progresivo.

       No modifica el tanque.
    */

    escala -=
        deltaY * 0.001;


    /*
       40% - 300%.
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
       Al cambiar el tamaño,
       volvemos a comprobar los límites.
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


/* ============================================================
   COMPATIBILIDAD
============================================================ */

window.actualizarPosicionObjeto =
    actualizarPosicion;


window.buscarObjeto3D =
    buscarObjeto;


/* ============================================================
   FIN
============================================================ */

console.log(
    "OBJECTS ENGINE V21 FINAL LISTO"
);
