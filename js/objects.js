console.log("OBJECTS ENGINE V11");

window.crearObjeto = function(tipo, icono) {

    var tanque = document.querySelector(".tank-3d");

    if (!tanque) {
        console.error("NO EXISTE TANK-3D");
        return;
    }

    var objeto = document.createElement("div");

    objeto.className = "objeto " + tipo;

    objeto.textContent = icono;

    objeto.style.position = "absolute";
    objeto.style.left = "0px";
    objeto.style.top = "0px";
    objeto.style.zIndex = "500";
    objeto.style.fontSize = "40px";
    objeto.style.transformStyle = "preserve-3d";
    objeto.style.cursor = "grab";
    objeto.style.userSelect = "none";

    var x = Math.random() * 60 + 20;
    var y = Math.random() * 50 + 25;
    var z = Math.random() * 60 - 30;

    objeto.dataset.x = x;
    objeto.dataset.y = y;
    objeto.dataset.z = z;

    actualizarPosicion(objeto);

    tanque.appendChild(objeto);

    hacerArrastrable(objeto);

    return objeto;
};


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


function hacerArrastrable(objeto) {

    var moviendo = false;

    var inicioX = 0;
    var inicioY = 0;

    objeto.addEventListener("mousedown", function(e) {

        e.preventDefault();
        e.stopPropagation();

        moviendo = true;

        inicioX = e.clientX;
        inicioY = e.clientY;

        objeto.style.cursor = "grabbing";
    });


    document.addEventListener("mousemove", function(e) {

        if (!moviendo) return;

        var dx = e.clientX - inicioX;
        var dy = e.clientY - inicioY;

        var x = Number(objeto.dataset.x);
        var y = Number(objeto.dataset.y);

         x -= dx * 0.20;
         y -= dy * 0.20;

        x = Math.max(5, Math.min(95, x));
        y = Math.max(5, Math.min(95, y));

        objeto.dataset.x = x;
        objeto.dataset.y = y;

        inicioX = e.clientX;
        inicioY = e.clientY;

        actualizarPosicion(objeto);
    });


    document.addEventListener("mouseup", function() {

        moviendo = false;

        objeto.style.cursor = "grab";
    });
}


document.addEventListener("DOMContentLoaded", function() {

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

});
