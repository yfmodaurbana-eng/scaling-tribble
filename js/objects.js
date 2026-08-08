console.log("OBJECTS ENGINE V8");

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
    objeto.style.left = "50%";
    objeto.style.top = "50%";
    objeto.style.zIndex = "300";
    objeto.style.fontSize = "40px";

    tanque.appendChild(objeto);

    console.log("OBJETO CREADO", tipo);

    return objeto;
};
