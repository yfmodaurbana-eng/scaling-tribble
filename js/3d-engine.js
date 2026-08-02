/* =====================================
   ACUARIO DESIGNER STUDIO
   MOTOR 3D V1
   ESCALADO AUTOMATICO
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const acuario = document.querySelector(".aquarium");

const largo = document.getElementById("largo");
const ancho = document.getElementById("ancho");
const alto = document.getElementById("alto");



if(!acuario || !largo || !ancho || !alto){

console.error("Motor 3D: elementos no encontrados");

return;

}




function actualizar3D(){


let L = Number(largo.value) || 70;
let A = Number(ancho.value) || 30;
let H = Number(alto.value) || 40;




// ==========================
// ESCALA VISUAL
// ==========================


// largo controla anchura
let escalaL =
Math.min(Math.max(L / 100,0.55),1.8);


// alto controla altura
let escalaH =
Math.min(Math.max(H / 50,0.6),1.4);





// tamaño del acuario


acuario.style.width =
(escalaL * 70) + "%";



acuario.style.height =
(escalaH * 65) + "%";





// ==========================
// AGUA
// ==========================


const agua =
document.querySelector(".water");


if(agua){

agua.style.height="82%";

}





// ==========================
// ARENA
// ==========================


const arena =
document.querySelector(".sand");


if(arena){

arena.style.height="18%";

}




// guardar medidas

acuario.dataset.medidas =
`${L} x ${A} x ${H} cm`;





console.log(
"3D actualizado:",
L,A,H
);



}





// escuchar cambios


[largo,ancho,alto].forEach(input=>{


input.addEventListener(
"input",
actualizar3D
);


});





// iniciar

actualizar3D();



});
