/* =====================================
   ACUARIO DESIGNER STUDIO V17
   SAVE SYSTEM 3D OBJECTS
===================================== */


console.log("SAVE ENGINE V17 CARGADO");



function guardarAcuario(){


let objetos =
document.querySelectorAll(".objeto");



let datos={


medidas:
window.acuario,


objetos:[]



};



objetos.forEach(obj=>{


datos.objetos.push({


tipo:
obj.innerHTML,


x:
obj.dataset.x,


y:
obj.dataset.y,


z:
obj.dataset.z



});


});



localStorage.setItem(
"miAcuario",
JSON.stringify(datos)
);



alert("Acuario guardado correctamente");


}




window.guardarAcuario =
guardarAcuario;





function cargarAcuario(){



document
.querySelectorAll(".objeto")
.forEach(o=>o.remove());



let datos =
JSON.parse(
localStorage.getItem("miAcuario")
);



if(!datos){

alert("No hay diseño guardado");

return;

}



datos.objetos.forEach(obj=>{



let nuevo;



if(obj.tipo=="🌱"){

crearObjeto(
"planta",
"🌱"
);

}


if(obj.tipo=="🪨"){

crearObjeto(
"roca",
"🪨"
);

}


if(obj.tipo=="🐟"){

crearObjeto(
"pez",
"🐟"
);

}



nuevo =
document.querySelectorAll(".objeto");



nuevo =
nuevo[nuevo.length-1];



nuevo.dataset.x =
obj.x;


nuevo.dataset.y =
obj.y;


nuevo.dataset.z =
obj.z;



nuevo.style.transform =

`
translate3d(
${obj.x}%,
${obj.y}%,
${obj.z}px
)
`;



});



alert("Diseño cargado");


}



window.cargarAcuario =
cargarAcuario;





/* =========================
   BOTONES
========================= */


const btnNuevo =
document.getElementById("nuevo");


const btnGuardar =
document.getElementById("guardar");


const btnCargar =
document.getElementById("cargar");


const btnExportar =
document.getElementById("exportar");



if(btnGuardar){

btnGuardar.onclick =
guardarAcuario;

}



if(btnCargar){

btnCargar.onclick =
cargarAcuario;

}



if(btnNuevo){

btnNuevo.onclick =
()=>location.reload();

}



if(btnExportar){

btnExportar.onclick =
()=>alert(
"Exportación próximamente disponible"
);

}
