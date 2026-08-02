/* =====================================
   ACUARIO DESIGNER STUDIO V7
   MOTOR 3D ACUARIO
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const aquarium = document.querySelector(".aquarium");


if(!aquarium){

console.error("No existe el acuario 3D");

return;

}



// ================================
// ROTACION 3D
// ================================


let rotX = 0;
let rotY = 0;
let zoom = 1;



function actualizarVista(){


aquarium.style.transform =
`
perspective(900px)
rotateX(${rotX}deg)
rotateY(${rotY}deg)
scale(${zoom})
`;

}




// ================================
// CONTROL RATON
// ================================


let pulsado=false;

let inicioX=0;
let inicioY=0;



aquarium.addEventListener(
"mousedown",
(e)=>{


pulsado=true;


inicioX=e.clientX;
inicioY=e.clientY;


});




document.addEventListener(
"mouseup",
()=>{


pulsado=false;


});





document.addEventListener(
"mousemove",
(e)=>{


if(!pulsado)return;



let movimientoX =
e.clientX-inicioX;


let movimientoY =
e.clientY-inicioY;



rotY += movimientoX*0.4;

rotX -= movimientoY*0.3;



if(rotX>40) rotX=40;

if(rotX<-40) rotX=-40;



actualizarVista();



inicioX=e.clientX;
inicioY=e.clientY;



});





// ================================
// ZOOM RUEDA RATON
// ================================


aquarium.addEventListener(
"wheel",
(e)=>{


e.preventDefault();



if(e.deltaY<0){

zoom+=0.05;

}else{

zoom-=0.05;

}



if(zoom>1.5)
zoom=1.5;


if(zoom<0.7)
zoom=0.7;



actualizarVista();



},
{passive:false}
);






// ================================
// BOTONES CAMARA
// ================================


const botones =
document.querySelectorAll(".camera button");



if(botones.length>=3){



// acercar

botones[0].onclick=()=>{


zoom+=0.1;


if(zoom>1.5)
zoom=1.5;


actualizarVista();


};




// alejar

botones[1].onclick=()=>{


zoom-=0.1;


if(zoom<0.7)
zoom=0.7;


actualizarVista();


};





// reset

botones[2].onclick=()=>{


rotX=0;

rotY=0;

zoom=1;


actualizarVista();


};



}




actualizarVista();



});
