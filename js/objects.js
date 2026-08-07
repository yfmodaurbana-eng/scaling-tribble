/* =====================================
   ACUARIO DESIGNER STUDIO V7
   SISTEMA OBJETOS 3D REAL
===================================== */

console.log("OBJECTS ENGINE V7 CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const tanque =
document.querySelector(".tank-3d");


if(!tanque){

console.error("No existe tank-3d");

return;

}



/* =========================
   BOTONES
========================= */


document.querySelectorAll(".tool")
.forEach(btn=>{


btn.addEventListener("click",()=>{


let texto =
btn.innerText;


if(texto.includes("Roca")){
crearObjeto("roca","🪨");
}


if(texto.includes("Planta")){
crearObjeto("planta","🌱");
}


if(texto.includes("Pez")){
crearObjeto("pez","🐟");
}


if(texto.includes("Luz")){
activarLuz();
}


});


});



/* =========================
   CREAR OBJETO 3D
========================= */


window.crearObjeto=function(tipo,icono){


let objeto =
document.createElement("div");


objeto.className =
"objeto "+tipo;



objeto.innerHTML =
icono;



let x =
Math.random()*60+20;


let y =
60;


let z =
Math.random()*80;



objeto.dataset.x=x;
objeto.dataset.y=y;
objeto.dataset.z=z;



actualizarPosicion3D(objeto);



tanque.appendChild(objeto);



hacerArrastrable3D(objeto);



};



/* =========================
   POSICION 3D
========================= */


function actualizarPosicion3D(obj){


obj.style.transform =
`
translate3d(
${obj.dataset.x}%,
${obj.dataset.y}%,
${obj.dataset.z}px
)
`;



}




/* =========================
   ARRASTRE 3D
========================= */


function hacerArrastrable3D(obj){


let moviendo=false;

let inicioX;
let inicioY;



obj.addEventListener(
"mousedown",
(e)=>{


moviendo=true;

inicioX=e.clientX;
inicioY=e.clientY;


e.stopPropagation();


});




document.addEventListener(
"mouseup",
()=>{

moviendo=false;

});




document.addEventListener(
"mousemove",
(e)=>{


if(!moviendo)return;



let dx =
e.clientX-inicioX;


let dy =
e.clientY-inicioY;



obj.dataset.x =
Number(obj.dataset.x)+dx*0.15;


obj.dataset.y =
Number(obj.dataset.y)+dy*0.15;



obj.dataset.y =
Math.max(
10,
Math.min(
90,
obj.dataset.y
)
);



actualizarPosicion3D(obj);



inicioX=e.clientX;
inicioY=e.clientY;



});



}




/* =========================
   LUZ
========================= */


function activarLuz(){


tanque.classList.toggle("iluminado");


}



});
