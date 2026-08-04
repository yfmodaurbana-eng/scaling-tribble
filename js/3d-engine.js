/* ==========================================
   ACUARIO DESIGNER STUDIO
   MOTOR 3D INTELIGENTE V5
   VISOR INTERACTIVO
========================================== */


console.log("3D ENGINE V5 CARGADO");


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

console.error("Faltan elementos 3D");

return;

}





/* ==========================================
   TAMAÑO DINÁMICO
========================================== */


function actualizar3D(){


let L = Number(largo.value)||70;
let A = Number(ancho.value)||30;
let H = Number(alto.value)||40;



let escalaBase = 5;



let anchoVisual =
L * escalaBase;


let altoVisual =
H * escalaBase;



anchoVisual =
Math.min(Math.max(anchoVisual,260),850);


altoVisual =
Math.min(Math.max(altoVisual,180),500);



acuario.style.width =
anchoVisual+"px";


acuario.style.height =
altoVisual+"px";



acuario.dataset.medidas =
`${L} x ${A} x ${H} cm`;





/* TIRANTES */

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





/* ==========================================
   CONTROL VISOR 3D
========================================== */


let rotX = 0;
let rotY = 0;

let zoom = 1;


let pulsado = false;

let inicioX = 0;
let inicioY = 0;



function actualizarVista(){


tanque.style.transform =
`
scale(${zoom})
rotateX(${rotX}deg)
rotateY(${rotY}deg)
`;

}




tanque.addEventListener(
"mousedown",
(e)=>{


pulsado=true;


inicioX=e.clientX;
inicioY=e.clientY;


tanque.style.cursor="grabbing";


}
);





document.addEventListener(
"mousemove",
(e)=>{


if(!pulsado)return;



let movimientoX =
e.clientX-inicioX;


let movimientoY =
e.clientY-inicioY;



rotY += movimientoX * 0.4;

rotX -= movimientoY * 0.3;



rotX =
Math.max(-40,Math.min(40,rotX));


inicioX=e.clientX;
inicioY=e.clientY;



actualizarVista();


}
);





document.addEventListener(
"mouseup",
()=>{


pulsado=false;


tanque.style.cursor="grab";


}
);






/* ZOOM */

tanque.addEventListener(
"wheel",
(e)=>{


e.preventDefault();



zoom += e.deltaY * -0.001;



zoom =
Math.max(
0.6,
Math.min(1.5,zoom)
);



actualizarVista();


},
{passive:false}

);





tanque.style.cursor="grab";



actualizar3D();


actualizarVista();



});
