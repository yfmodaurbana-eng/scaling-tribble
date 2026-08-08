```javascript
console.log("OBJECTS ENGINE V10 - INTERIOR 3D");


document.addEventListener("DOMContentLoaded", function() {

    var tanque = document.querySelector(".tank-3d");

    if (!tanque) {
        console.error("NO EXISTE TANK-3D");
        return;
    }


    /* =========================
       CONTENEDOR INTERIOR 3D
    ========================= */

    var interior = document.querySelector(".interior-3d");

    if (!interior) {

        interior = document.createElement("div");

        interior.className = "interior-3d";

        tanque.appendChild(interior);

    }


    /* =========================
       BOTONES
    ========================= */

    document.querySelectorAll(".tool").forEach(function(boton) {

        boton.addEventListener("click", function() {

            var texto = boton.innerText;

            if (texto.includes("Roca")) {
                crearObjeto("roca", "🪨");
            }

            if (texto.includes("Planta")) {
                crearObjeto("planta", "🌱");
            }

            if (texto.includes("Pez")) {
                crearObjeto("pez", "🐟");
            }

        });

    });


    /* =========================
       CREAR OBJETO
    ========================= */

    window.crearObjeto = function(tipo, icono) {

        var objeto = document.createElement("div");

        objeto.className = "objeto " + tipo;

        objeto.textContent = icono;

        objeto.style.position = "absolute";

        objeto.style.left = "50%";

        objeto.style.top = "50%";

        objeto.style.zIndex = "300";

        objeto.style.fontSize = "40px";

        objeto.style.transformStyle = "preserve-3d";

        objeto.style.cursor = "grab";

        objeto.style.userSelect = "none";


        /* =========================
           POSICION INICIAL
        ========================= */

        var x = Math.random() * 70 - 35;

        var y = Math.random() * 50 - 25;

        var z = Math.random() * 80 - 40;


        objeto.dataset.x = x;

        objeto.dataset.y = y;

        objeto.dataset.z = z;


        actualizarPosicion(objeto);


        interior.appendChild(objeto);


        hacerArrastrable(objeto);


        console.log(
            "OBJETO CREADO:",
            tipo,
            "X:", x,
            "Y:", y,
            "Z:", z
        );


        return objeto;

    };


    /* =========================
       POSICION 3D
    ========================= */

    function actualizarPosicion(objeto) {

        var x = Number(objeto.dataset.x);

        var y = Number(objeto.dataset.y);

        var z = Number(objeto.dataset.z);


        objeto.style.transform =
            "translate3d(" +
            x + "%," +
            y + "%," +
            z + "px)";

    }


    /* =========================
       ARRASTRE X / Y
    ========================= */

    function hacerArrastrable(objeto) {

        var moviendo = false;

        var inicioX = 0;

        var inicioY = 0;


        objeto.addEventListener(
            "mousedown",
            function(e) {

                e.preventDefault();

                e.stopPropagation();

                moviendo = true;

                inicioX = e.clientX;

                inicioY = e.clientY;

                objeto.style.cursor = "grabbing";

            }
        );


        document.addEventListener(
            "mousemove",
            function(e) {

                if (!moviendo) {
                    return;
                }


                var dx =
                    e.clientX - inicioX;

                var dy =
                    e.clientY - inicioY;


                var x =
                    Number(objeto.dataset.x);

                var y =
                    Number(objeto.dataset.y);


                x += dx * 0.20;

                y += dy * 0.20;


                x =
                    Math.max(
                        -45,
                        Math.min(45, x)
                    );


                y =
                    Math.max(
                        -40,
                        Math.min(40, y)
                    );


                objeto.dataset.x = x;

                objeto.dataset.y = y;


                inicioX = e.clientX;

                inicioY = e.clientY;


                actualizarPosicion(objeto);

            }
        );


        document.addEventListener(
            "mouseup",
            function() {

                if (!moviendo) {
                    return;
                }

                moviendo = false;

                objeto.style.cursor = "grab";

            }
        );

    }

});
```
