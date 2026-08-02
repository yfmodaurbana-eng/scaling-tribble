/* =====================================
   ACUARIO DESIGNER V6
   CRISTAL INTELIGENTE
===================================== */


function calcularCristal(largo, ancho, alto){


let cristal = 6;
let tirantes = "No necesarios";
let carga = "Baja";



// reglas conservadoras

if(alto > 45){

    cristal = 8;
    tirantes = "Recomendados";
    carga = "Media";

}


if(alto > 55){

    cristal = 10;
    tirantes = "Necesarios";
    carga = "Alta";

}


if(largo > 120){

    tirantes = "Recomendados";

}



return {

cristal,
tirantes,
carga

};


}






function actualizarSeguridad(){


let largo =
Number(document.getElementById("largo").value);


let ancho =
Number(document.getElementById("ancho").value);


let alto =
Number(document.getElementById("alto").value);




let resultado =
calcularCristal(largo,ancho,alto);





let cristal =
document.getElementById("cristal");


if(cristal){

cristal.textContent =
resultado.cristal+" mm";

}




let info =
document.getElementById("infoCristal");


if(info){

info.textContent =
resultado.cristal+" mm";

}




let tirantes =
document.getElementById("tirantes");


if(tirantes){

tirantes.textContent =
resultado.tirantes;

}




let carga =
document.getElementById("nivelCarga");


if(carga){

carga.textContent =
resultado.carga;

}





let estado =
document.getElementById("resultadoCristal");


if(estado){


estado.textContent =
"🟢 Cristal recomendado: "+
resultado.cristal+" mm";


}



}





document.addEventListener(
"DOMContentLoaded",
()=>{


["largo","ancho","alto"].forEach(id=>{


let input =
document.getElementById(id);


if(input){


input.addEventListener(
"input",
actualizarSeguridad
);


}



});



actualizarSeguridad();


});
