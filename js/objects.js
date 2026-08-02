/* =====================================
   ACUARIO DESIGNER STUDIO V6
   SISTEMA DE OBJETOS 3D
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const aquarium =
document.querySelector(".aquarium");



if(!aquarium){

console.error("No existe el acuario 3D");

return;

}




// BOTONES HERRAMIENTAS

const herramientas =
document.querySelectorAll(".tool");



herramientas.forEach(btn=>{


btn.addEventListener("click",()=>{


let tipo =
btn.innerText.trim();



if(tipo.includes("Roca")){

crearObjeto("roca","🪨");

}



if(tipo.includes("Planta")){

crearObjeto("planta","🌱");

}



if(tipo.includes("Pez")){

crearObjeto("pez","🐟");

}



if(tipo.includes("Luz")){

activarLuz();

}



if(tipo.includes("Agua")){

activarAgua();

}



});


});






function crearObjeto(tipo,icono){



let objeto =
document.createElement("div");



objeto.className =
"objeto "+tipo;



objeto.innerHTML =
icono;



objeto.style.left =
Math.random()*70+10+"%";



objeto.style.bottom =
"20%";



aquarium.appendChild(objeto);



hacerArrastrable(objeto);



}







function hacerArrastrable(elemento){



let moviendo=false;



elemento.addEventListener(
"mousedown",
()=>{

moviendo=true;

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



let rect =
aquarium.getBoundingClientRect();



let x =
e.clientX-rect.left;



let y =
e.clientY-rect.top;



elemento.style.left =
x-20+"px";



elemento.style.top =
y-20+"px";



elemento.style.bottom =
"auto";



});



}







function activarLuz(){


aquarium.classList.toggle("iluminado");


}





function activarAgua(){


aquarium.classList.toggle("agua-activa");


}





});
