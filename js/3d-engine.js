/* =====================================
   ACUARIO DESIGNER STUDIO
   MOTOR 3D V5 INTELIGENTE
   VISOR PROPORCIONAL + DATOS TECNICOS
===================================== */


console.log("MOTOR 3D V5 INTELIGENTE CARGADO");



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

console.error(
"Motor 3D: elementos no encontrados"
);

return;

}





function limitar(valor,min,max){

return Math.min(
Math.max(valor,min),
max
);

}







/* =====================================
   FORMA Y ESCALA 3D
===================================== */


function actualizarForma3D(L,A,H){



let escalaL =
limitar(L/100,0.65,1.8);



let escalaH =
limitar(H/50,0.7,1.4);



let profundidad =
limitar(A/30,0.8,1.6);




acuario3D.style.width =
(escalaL*70)+"%";



acuario3D.style.height =
(escalaH*65)+"%";




acuario3D.style.transform =

`
perspective(1200px)
rotateX(8deg)
rotateY(-8deg)
scale(${profundidad})
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
   INFORMACION 3D
===================================== */


function crearInfo(){



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
   REFUERZOS
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


let t =
document.createElement("div");


t.className="tirante3d";


acuario3D.appendChild(t);


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


let r =
document.createElement("div");


r.className=
"refuerzo3d";


acuario3D.appendChild(r);


}


}









/* =====================================
   ACTUALIZAR MOTOR
===================================== */


function actualizar3D(){



let L =
Number(largo.value)||70;


let A =
Number(ancho.value)||30;


let H =
Number(alto.value)||40;




actualizarForma3D(
L,
A,
H
);



actualizarInterior();



let datos =
window.acuario;



let info =
crearInfo();




if(datos){


info.innerHTML=

`

<b>🐠 ACUARIO DESIGNER</b><br><br>

📐 ${L} × ${A} × ${H} cm<br>

💧 ${datos.volumen.toFixed(1)} L<br>

🪟 Cristal ${datos.cristal.grosor} mm<br>

🔩 ${datos.tirantes.estado}<br>

${datos.seguridad.nivel}

`;



}else{


info.innerHTML=

`

<b>🐠 ACUARIO DESIGNER</b><br><br>

📐 ${L} × ${A} × ${H} cm

`;

}


crearRefuerzos();



acuario3D.dataset.medidas =

`${L} x ${A} x ${H} cm`;



}









/* =====================================
   EVENTOS
===================================== */


[largo,ancho,alto].forEach(input=>{


input.addEventListener(
"input",
()=>{

setTimeout(
actualizar3D,
200
);


}

);


});





setTimeout(
actualizar3D,
700
);



});
