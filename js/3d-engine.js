/* =====================================
   ACUARIO DESIGNER STUDIO
   MOTOR 3D V2 INTELIGENTE
   ESCALADO + DATOS TECNICOS
===================================== */


console.log("MOTOR 3D V2 INTELIGENTE CARGADO");



document.addEventListener("DOMContentLoaded",()=>{


const acuario3D =
document.querySelector(".aquarium");


const largo =
document.getElementById("largo");


const ancho =
document.getElementById("ancho");


const alto =
document.getElementById("alto");



if(!acuari o3D && !largo){

console.error("Motor 3D: elementos no encontrados");

return;

}





function actualizar3D(){



let L =
Number(largo.value)||70;


let A =
Number(ancho.value)||30;


let H =
Number(alto.value)||40;





/* =========================
   ESCALA VISUAL
========================= */


let escalaL =
Math.min(Math.max(L/100,0.55),1.8);



let escalaH =
Math.min(Math.max(H/50,0.6),1.4);



acuario3D.style.width =
(escalaL*70)+"%";


acuari o3D.style.height =
(escalaH*65)+"%";







/* =========================
   AGUA
========================= */


let agua =
acuari o3D.querySelector(".water");


if(agua){

agua.style.height="82%";

}






/* =========================
   ARENA
========================= */


let arena =
acuari o3D.querySelector(".sand");


if(arena){

arena.style.height="18%";

}







/* =========================
   DATOS TECNICOS
========================= */


let datos =
window.acuario;



let info =
document.querySelector(".info3d");



if(!info){


info=document.createElement("div");


info.className="info3d";


acuari o3D.appendChild(info);


}





if(datos){


info.innerHTML=`

<b>🐠 ACUARIO DESIGNER</b><br><br>

📐 ${L} × ${A} × ${H} cm<br>

💧 ${datos.volumen.toFixed(1)} L<br>

🪟 Cristal ${datos.cristal.grosor} mm<br>

${datos.seguridad.nivel}

`;



}else{


info.innerHTML=`

<b>🐠 ACUARIO DESIGNER</b><br><br>

📐 ${L} × ${A} × ${H} cm

`;

}


 





/* =========================
   DATOS DOM
========================= */


acuari o3D.dataset.medidas =
`${L} x ${A} x ${H} cm`;





console.log(
"3D actualizado:",
L,
A,
H
);



}








[largo,ancho,alto].forEach(input=>{


input.addEventListener(
"input",
()=>{

setTimeout(actualizar3D,50);

}

);


});





actualizar3D();





});
