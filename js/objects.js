```javascript id="v7q2ms"
/* ==========================================
   OBJECTS ENGINE V8.5 - PRUEBA 2
========================================== */

console.log("OBJECTS V8.5 PRUEBA 2");


window.crearObjeto = function(tipo, icono) {

    var tanque =
        document.querySelector(".tank-3d");


    if (!tanque) {

        console.error(
            "NO SE ENCUENTRA .tank-3d"
        );

        return;

    }


    var objeto =
        document.createElement("div");


    objeto.className =
        "objeto " + tipo;


    objeto.innerHTML =
        icono;


    objeto.style.position =
        "absolute";


    objeto.style.left =
        "50%";


    objeto.style.top =
        "50%";


    objeto.style.zIndex =
        "300";


    objeto.style.fontSize =
        "40px";


    objeto.style.transform =
        "translate(-50%, -50%)";


    tanque.appendChild(
        objeto
    );


    console.log(
        "OBJETO CREADO CORRECTAMENTE"
    );


    return objeto;

};
```

