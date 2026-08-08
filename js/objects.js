```javascript
console.log("OBJECTS PASO 3");

window.crearObjeto = function(tipo, icono) {

    console.log("CREANDO:", tipo);

    var tanque =
        document.querySelector(".tank-3d");

    console.log("TANQUE:", tanque);

    var objeto =
        document.createElement("div");

    objeto.className =
        "objeto " + tipo;

    objeto.textContent =
        icono;

    tanque.appendChild(objeto);

    console.log("OBJETO AÑADIDO:", objeto);

    return objeto;
};
```
