/* ==========================================
   ACUARIO DESIGNER STUDIO
   MOTOR 3D INTELIGENTE V4
   URNA REALISTA
========================================== */


console.log("3D ENGINE V4 CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const acuario =
document.querySelector(".aquarium");


const largo =
document.getElementById("largo");


const ancho =
document.getElementById("ancho");


const alto =
document.getElementById("alto");



if(!acuario || !largo || !ancho || !alto){

console.error("Faltan elementos 3D");

return;

}




function actualizar3D(){



let L = Number(largo.value)||70;
let A = Number(ancho.value)||30;
let H = Number(alto.value)||40;



/* ===============================
   ESCALADO PROPORCIONAL
================================ */


let escalaBase = 5;



let anchoVisual =
L * escalaBase;



let altoVisual =
H * escalaBase;



/*
 límites pantalla
*/


anchoVisual =
Math.min(Math.max(anchoVisual,260),850);


altoVisual =
Math.min(Math.max(altoVisual,180),500);





acuario.style.width =
anchoVisual+"px";



acuario.style.height =
altoVisual+"px";






/* ===============================
   AGUA
================================ */


let agua =
acuario.querySelector(".water");


if(agua){

agua.style.height="82%";

}





let arena =
acuario.querySelector(".sand");


if(arena){

arena.style.height="18%";

}





/* ===============================
   DATOS
================================ */


acuario.dataset.medidas =
`${L} x ${A} x ${H} cm`;





/* ===============================
   TIRANTES
   SOLO SI SON NECESARIOS
================================ */


document
.querySelectorAll(".tirante3d")
.forEach(e=>e.remove());




let litros =
(L*A*H)/1000;



if(litros>150){


let tirante =
document.createElement("div");


tirante.className="tirante3d";


tirante.style.top="-8px";


tirante.style.left="15%";


tirante.style.width="70%";


tirante.style.height="10px";


acuario.appendChild(tirante);


}





console.log(
"3D:",
L,
A,
H,
litros.toFixed(1)+"L"
);



}




[largo,ancho,alto]
.forEach(input=>{


input.addEventListener(
"input",
actualizar3D
);


});




actualizar3D();



});
