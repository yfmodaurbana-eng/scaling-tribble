```javascript
/* ==================================================
   ACUARIO DESIGNER STUDIO V8.5
   OBJETOS 3D - MOTOR BASE
================================================== */

console.log("OBJECTS ENGINE V8.5 CARGADO");


document.addEventListener("DOMContentLoaded", function () {

    var tanque = document.querySelector(".tank-3d");


    if (!tanque) {

        console.error("NO EXISTE .tank-3d");

        return;

    }


    /* ==================================================
       CREAR OBJETO
    ================================================== */

    window.crearObjeto = function (tipo, icono) {

        var objeto =
            document.createElement("div");


        objeto.className =
            "objeto " + tipo;


        objeto.innerHTML =
            icono;


        /* POSICIÓN */

        objeto.dataset.x =
            50;


        objeto.dataset.y =
            50;


        objeto.dataset.z =
            50;


        /* ESTILO */

        objeto.style.position =
            "absolute";


        objeto.style.left =
            "0px";


        objeto.style.top =
            "0px";


        objeto.style.transformStyle =
            "preserve-3d";


        objeto.style.transform =
            "translate3d(50%, 50%, 50px)";


        objeto.style.zIndex =
            "200";


        objeto.style.fontSize =
            "40px";


        objeto.style.cursor =
            "grab";


        /* AÑADIR */

        tanque.appendChild(
            objeto
        );


        console.log(
            "OBJETO 3D CREADO:",
            tipo
        );


        return objeto;

    };


    /* ==================================================
       BOTONES
    ================================================== */

    document.querySelectorAll(".tool")
    .forEach(function (boton) {


        boton.addEventListener(
            "click",
            function () {


                var texto =
                    boton.innerText;


                if (
                    texto.indexOf("Roca") !== -1
                ) {

                    crearObjeto(
                        "roca",
                        "🪨"
                    );

                }


                if (
                    texto.indexOf("Planta") !== -1
                ) {

                    crearObjeto(
                        "planta",
                        "🌱"
                    );

                }


                if (
                    texto.indexOf("Pez") !== -1
                ) {

                    crearObjeto(
                        "pez",
                        "🐟"
                    );

                }

            }

        );

    });


});
```

