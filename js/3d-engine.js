/* =====================================
   ACUARIO DESIGNER STUDIO
   MOTOR 3D V3 INTELIGENTE
   ESCALADO + DATOS + REFUERZOS 3D
===================================== */


console.log("MOTOR 3D V3 INTELIGENTE CARGADO");



document.addEventListener("DOMContentLoaded",()=>{


const acuario3D =
document.querySelector(".aquarium");


const largo =
document.getElementById("largo");


const ancho =
document.getElementById("ancho");


const alto =
document.getElementById("alto");



if(!acuario3D || !largo || !ancho || !alto){

console.error("Motor 3D: elementos no encontrados");

return;

}





/* =====================================
   ACTUALIZAR INFORMACION
===================================== */


function crearInfo(){


let info =
document.querySelector(".info3d");


if(!info){


info=document.createElement("div");

info.className="info3d";

acuario3D.appendChild(info);


}


return info;


}








/* =====================================
   CREAR REFUERZOS 3D
===================================== */


function limpiarRefuerzos(){


document
.querySelectorAll(".tirante3d,.refuerzo3d")
.forEach(e=>e.remove());


}





function crearRefuerzos(){


limpiarRefuerzos();


let datos =
window.acuario;



if(!datos)return;



let cantidad =
datos.tirantes.cantidad;





// 1 TIRANTE


if(cantidad===1){


let tirante =
document.createElement("div");


tirante.className="tirante3d";


acuario3D.appendChild(tirante);


}







// 2 TIRANTES


if(cantidad===2){



let t1 =
document.createElement("div");


t1.className=
"tirante3d izquierdo";


acuario3D.appendChild(t1);




let t2 =
document.createElement("div");


t2.className=
"tirante3d derecho";


acuario3D.appendChild(t2);



}






// REFUERZO ESPECIAL


if(cantidad==="Según diseño"){


let refuerzo =
document.createElement("div");


refuerzo.className="refuerzo3d";


acuario3D.appendChild(refuerzo);


}




}









/* =====================================
   ACTUALIZAR VISOR
===================================== */


function actualizar3D(){



let L =
Number(largo.value)||70;


let A =
Number(ancho.value)||30;


let H =
Number(alto.value)||40;





/* ESCALA */


let escalaL =
Math.min(Math.max(L/100,0.55),1.8);



let escalaH =
Math.min(Math.max(H/50,0.6),1.4);




acuario3D.style.width =
(escalaL*70)+"%";


acuario3D.style.height =
(escalaH*65)+"%";







/* AGUA */


let agua =
acuario3D.querySelector(".water");


if(agua){

agua.style.height="82%";

}






/* ARENA */


let arena =
acuario3D.querySelector(".sand");


if(arena){

arena.style.height="18%";

}








/* INFORMACION TECNICA */


let datos =
window.acuario;


let info =
crearInfo();



if(datos){


info.innerHTML=`

<b>🐠 ACUARIO DESIGNER</b><br><br>

📐 ${L} × ${A} × ${H} cm<br>

💧 ${datos.volumen.toFixed(1)} L<br>

🪟 Cristal ${datos.cristal.grosor} mm<br>

🔩 ${datos.tirantes.estado}<br>

${datos.seguridad.nivel}

`;



}else{


info.innerHTML=`

<b>🐠 ACUARIO DESIGNER</b><br><br>

📐 ${L} × ${A} × ${H} cm

`;

}



setTimeout(crearRefuerzos,100);





acuario3D.dataset.medidas =
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





setTimeout(actualizar3D,500);



});
