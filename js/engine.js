/* =====================================
   ACUARIO DESIGNER STUDIO V6
   ENGINE SEGURIDAD ESTRUCTURAL
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const largo = document.getElementById("largo");
const ancho = document.getElementById("ancho");
const alto = document.getElementById("alto");



function calcular(){


let L = Number(largo.value);
let A = Number(ancho.value);
let H = Number(alto.value);



// litros

let litros = (L*A*H)/1000;


// peso agua

let pesoAgua = litros;



// cristal seguro

let cristal = 6;
let tirantes = "No necesarios";
let carga = "Baja";
let estado = "🟢 Estructura correcta";



// reglas conservadoras


if(H > 45){

cristal = 8;
tirantes = "Recomendados";
carga = "Media";

}


if(H > 55){

cristal = 10;
tirantes = "Necesarios";
carga = "Alta";

}



if(L > 120){

tirantes = "Recomendados";

}



if(L > 150 || H > 70){

cristal = 12;
tirantes = "Diseño especial";
carga = "Muy alta";
estado = "🔴 Revisar estructura";

}




// actualizar litros


const litrosHTML =
document.getElementById("litros");

if(litrosHTML){

litrosHTML.textContent =
litros.toFixed(1)+" L";

}



// peso agua


const pesoHTML =
document.getElementById("pesoAgua");

if(pesoHTML){

pesoHTML.textContent =
pesoAgua.toFixed(1)+" kg";

}




// cristal


const cristalHTML =
document.getElementById("cristal");

if(cristalHTML){

cristalHTML.textContent =
cristal+" mm";

}



// tirantes


const tirantesHTML =
document.getElementById("tirantes");

if(tirantesHTML){

tirantesHTML.textContent =
tirantes;

}



// carga


const cargaHTML =
document.getElementById("nivelCarga");

if(cargaHTML){

cargaHTML.textContent =
carga;

}



// estado


const estadoHTML =
document.getElementById("estadoSeguridad");

if(estadoHTML){

estadoHTML.textContent =
estado;

}




// panel derecho


const infoLitros =
document.getElementById("infoLitros");


if(infoLitros){

infoLitros.textContent =
litros.toFixed(1)+" L";

}



const infoCristal =
document.getElementById("infoCristal");


if(infoCristal){

infoCristal.textContent =
cristal+" mm";

}




const infoMedidas =
document.getElementById("infoMedidas");


if(infoMedidas){

infoMedidas.textContent =
`${L} × ${A} × ${H} cm`;

}



}




// escuchar cambios


[largo,ancho,alto].forEach(input=>{

input.addEventListener(
"input",
calcular
);

});



// iniciar

calcular();



});
