/* ==========================================
   ACUARIO DESIGNER STUDIO
   MOTOR 3D INTELIGENTE V6
   REAL VOLUME ENGINE
========================================== */

console.log("3D ENGINE V6 CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const acuario =
document.querySelector(".aquarium");

const tanque =
document.querySelector(".tank-3d");


const largo =
document.getElementById("largo");

const ancho =
document.getElementById("ancho");

const alto =
document.getElementById("alto");


if(!acuario || !tanque || !largo || !ancho || !alto){

console.error("Faltan elementos del motor 3D");

return;

}



/* =====================================
   CÁMARA 3D GLOBAL
===================================== */


window.camera3D={

rotX:-10,
rotY:-25,
zoom:1

};



/* =====================================
   ACTUALIZAR VOLUMEN
===================================== */


function actualizar3D(){


let L =
Number(largo.value)||70;


let A =
Number(ancho.value)||30;


let H =
Number(alto.value)||40;



let escala = 5;



let anchoVisual =
L * escala;


let altoVisual =
H * escala;



anchoVisual =
Math.min(
Math.max(anchoVisual,260),
850
);



altoVisual =
Math.min(
Math.max(altoVisual,180),
500
);



let profundidad =
A * escala;



profundidad =
Math.min(
Math.max(profundidad,80),
400
);




/*
 CONTENEDOR
*/


acuario.style.width =
anchoVisual+"px";


acuario.style.height =
altoVisual+"px";



/*
 PROFUNDIDAD REAL DEL CUBO
*/


tanque.style.setProperty(
"--depth",
profundidad+"px"
);



acuario.style.setProperty(
"--profundidad",
profundidad+"px"
);



acuario.dataset.medidas =
`${L} x ${A} x ${H} cm`;



/*
 TIRANTE
*/


document
.querySelectorAll(".tirante3d")
.forEach(e=>e.remove());



let litros =
(L*A*H)/1000;



if(litros>150){


let tirante =
document.createElement("div");


tirante.className =
"tirante3d";



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



window.actualizar3D =
actualizar3D;



[largo,ancho,alto]
.forEach(input=>{

input.addEventListener(
"input",
actualizar3D
);

});





/* =====================================
   VISTA 3D
===================================== */


function actualizarVista(){


let cam =
window.camera3D;



tanque.style.transform =

`
translateZ(0px)
rotateX(${cam.rotX}deg)
rotateY(${cam.rotY}deg)
scale(${cam.zoom})
`;



}



window.actualizarVista =
actualizarVista;





let pulsado=false;

let inicioX=0;

let inicioY=0;



tanque.addEventListener(
"mousedown",
(e)=>{


pulsado=true;


inicioX=e.clientX;

inicioY=e.clientY;


tanque.style.cursor="grabbing";


});





document.addEventListener(
"mousemove",
(e)=>{


if(!pulsado)return;



let cam =
window.camera3D;



let dx =
e.clientX-inicioX;


let dy =
e.clientY-inicioY;



cam.rotY += dx*0.4;

cam.rotX -= dy*0.3;



cam.rotX =
Math.max(
-45,
Math.min(45,cam.rotX)
);



inicioX=e.clientX;

inicioY=e.clientY;



actualizarVista();



});





document.addEventListener(
"mouseup",
()=>{


pulsado=false;


tanque.style.cursor="grab";


});





/* ZOOM */


tanque.addEventListener(
"wheel",
(e)=>{


e.preventDefault();



let cam =
window.camera3D;



cam.zoom +=
e.deltaY*-0.001;



cam.zoom =
Math.max(
0.6,
Math.min(1.6,cam.zoom)
);



actualizarVista();



},
{
passive:false
});





tanque.style.cursor="grab";



actualizar3D();

actualizarVista();



});
