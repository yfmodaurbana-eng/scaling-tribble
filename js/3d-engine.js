/* =====================================
   ACUARIO DESIGNER STUDIO
   MOTOR 3D V4 INTELIGENTE
   VISOR ESTABLE + DATOS TECNICOS
===================================== */


console.log("MOTOR 3D V4 INTELIGENTE CARGADO");



document.addEventListener("DOMContentLoaded",()=>{


const acuario3D =
document.querySelector(".aquarium");


const visor =
document.querySelector(".viewer");


const largo =
document.getElementById("largo");


const ancho =
document.getElementById("ancho");


const alto =
document.getElementById("alto");



if(!acuario3D || !visor || !largo || !ancho || !alto){


console.error(
"Motor 3D V4: elementos no encontrados"
);


return;


}






/* =====================================
   CONFIGURACION VISUAL
===================================== */


let escalaBase = 1;



function limitar(valor,min,max){


return Math.min(
Math.max(valor,min),
max
);


}
   /* =====================================
   ESCALADO 3D ESTABLE
===================================== */


function actualizarEscala(L,A,H){


/*
 No cambia el tamaño real del contenedor.
 Solo escala visualmente.
*/


let escalaL =
limitar(L/100,0.65,1.35);



let escalaH =
limitar(H/50,0.75,1.25);



let escalaA =
limitar(A/35,0.75,1.20);




escalaBase =
(escalaL + escalaH + escalaA) / 3;



acuario3D.style.transform =

`
perspective(900px)
rotateX(5deg)
scale(${escalaBase})
`;



}








/* =====================================
   AGUA Y ARENA
===================================== */


function actualizarInterior(){


let agua =
acuario3D.querySelector(".water");


let arena =
acuario3D.querySelector(".sand");



if(agua){

agua.style.height="82%";

}



if(arena){

arena.style.height="18%";

}


}
   /* =====================================
   PANEL TECNICO 3D
===================================== */


function crearInfo3D(){


let info =
acuario3D.querySelector(".info3d");



if(!info){


info=document.createElement("div");


info.className="info3d";


acuario3D.appendChild(info);


}


return info;


}







/* =====================================
   REFUERZOS 3D
===================================== */


function limpiarRefuerzos(){


acuario3D
.querySelectorAll(
".tirante3d,.refuerzo3d"
)
.forEach(e=>e.remove());


}






function crearRefuerzos(){


limpiarRefuerzos();



let datos =
window.acuario;



if(!datos)return;



let cantidad =
datos.tirantes.cantidad;




if(cantidad===1){


let tirante =
document.createElement("div");


tirante.className=
"tirante3d";


acuario3D.appendChild(tirante);


}





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





if(cantidad==="Según diseño"){


let refuerzo =
document.createElement("div");


refuerzo.className=
"refuerzo3d";


acuario3D.appendChild(refuerzo);


}


}







/* =====================================
   ACTUALIZACION PRINCIPAL
===================================== */


function actualizar3D(){


let L =
Number(largo.value)||70;


let A =
Number(ancho.value)||30;


let H =
Number(alto.value)||40;



actualizarEscala(
L,
A,
H
);



actualizarInterior();




let datos =
window.acuario;



let info =
crearInfo3D();



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


crearRefuerzos();


acuario3D.dataset.medidas =
`${L} x ${A} x ${H} cm`;



}







/* =====================================
   SINCRONIZACION
===================================== */


[largo,ancho,alto].forEach(input=>{


input.addEventListener(
"input",
()=>{

setTimeout(
actualizar3D,
150
);


}

);


});



setTimeout(
actualizar3D,
500
);



});
