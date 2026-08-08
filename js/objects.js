console.log("OBJECTS ENGINE V8 - 3D");

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
    objeto.style.left = "0";
    objeto.style.top = "0";
    objeto.style.zIndex = "300";
    objeto.style.fontSize = "40px";
    objeto.style.transformStyle = "preserve-3d";

    var x = Math.random() * 60 + 20;
    var y = Math.random() * 60 + 20;
    var z = Math.random() * 100;

    objeto.dataset.x = x;
    objeto.dataset.y = y;
    objeto.dataset.z = z;

    actualizarPosicion(objeto);

    tanque.appendChild(objeto);

    console.log(
        "OBJETO 3D:",
        x,
        y,
        z
    );

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
