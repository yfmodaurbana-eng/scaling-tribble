// =====================================
// CALCULO GROSOR CRISTAL
// =====================================


function comprobarCristal(){


let largo =
Number(document.getElementById("largo").value);


let alto =
Number(document.getElementById("alto").value);


let grosor =
Number(document.getElementById("cristal").value);



let resultado =
document.getElementById("resultadoCristal");



let recomendado = 6;



if(largo > 100 || alto > 50){

    recomendado = 10;

}

else if(largo > 80 || alto > 45){

    recomendado = 8;

}



if(grosor < recomendado){

resultado.innerHTML =
"❌ Cristal insuficiente<br>"+
"Recomendado: "+recomendado+" mm";


resultado.style.color="#ef4444";


}



else if(grosor == recomendado){


resultado.innerHTML =
"✅ Grosor recomendado<br>"+
"Correcto para este acuario";


resultado.style.color="#22c55e";


}


else{


resultado.innerHTML =
"⭐ Cristal sobredimensionado<br>"+
"Muy resistente";


resultado.style.color="#38bdf8";


}



}



// actualizar al cambiar valores

document
.getElementById("cristal")
.addEventListener(
"input",
comprobarCristal
);



document
.getElementById("alto")
.addEventListener(
"input",
comprobarCristal
);



document
.getElementById("largo")
.addEventListener(
"input",
comprobarCristal
);



comprobarCristal();
