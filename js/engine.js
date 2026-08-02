/* ==========================================
   ACUARIO DESIGNER STUDIO V6.2
   ENGINE PRINCIPAL
   CALCULO REALISTA ACUARIO
========================================== */


document.addEventListener("DOMContentLoaded",()=>{


const largo = document.getElementById("largo");
const ancho = document.getElementById("ancho");
const alto = document.getElementById("alto");



if(!largo || !ancho || !alto){

console.error("No existen campos de medidas");

return;

}





function calcularAcuario(){


let L = Number(largo.value) || 0;
let A = Number(ancho.value) || 0;
let H = Number(alto.value) || 0;



// ==========================
// VOLUMEN
// ==========================


let litros = (L*A*H)/1000;



// ==========================
// PESOS
// ==========================


// Agua

let pesoAgua = litros;



// Cristal aproximado

let superficieCristal =
(
(L*A)*2 +
(L*H)*2 +
(A*H)*2
)/10000;



let grosorCalculado = 0.006;


let pesoCristal =
superficieCristal *
grosorCalculado *
2500;



// Decoración + sustrato

let pesoDecoracion = litros * 0.15;



let pesoTotal =
pesoAgua +
pesoCristal +
pesoDecoracion;





// ==========================
// CRISTAL INTELIGENTE
// ==========================


let cristal = 3;

let tirantes = "No necesarios";

let carga = "Baja";

let estado =
"🟢 Estructura correcta";





// ALTURA

if(H <= 30){

cristal = 3;

}



else if(H <= 35){

cristal = 4;

}



else if(H <= 45){

cristal = 5;

}



else if(H <= 55){

cristal = 6;

carga="Media";

}



else if(H <= 65){

cristal = 8;

carga="Media";

tirantes="Recomendados";

}



else if(H <= 75){

cristal = 10;

carga="Alta";

tirantes="Necesarios";

}



else{


cristal = 12;

carga="Muy alta";

tirantes="Diseño especial";

estado="🔴 Revisar estructura";


}




// LARGO DEL ACUARIO


if(L > 80){

tirantes="Recomendados";

}



if(L > 100){

tirantes="Necesarios";

}



if(L > 150){

tirantes="Diseño especial";

estado="🟠 Diseño especial";

}





// ==========================
// ACTUALIZAR PANTALLA
// ==========================



actualizar("litros",
litros.toFixed(1)+" L");



actualizar("infoLitros",
litros.toFixed(1)+" L");




actualizar("pesoAgua",
pesoAgua.toFixed(1)+" kg");




actualizar("pesoTotal",
pesoTotal.toFixed(1)+" kg");





actualizar("cristal",
cristal+" mm");




actualizar("infoCristal",
cristal+" mm");




actualizar("tirantes",
tirantes);




actualizar("nivelCarga",
carga);




actualizar("estadoSeguridad",
estado);




actualizar("infoMedidas",
`${L} × ${A} × ${H} cm`);





let resultado =
document.getElementById("resultadoCristal");



if(resultado){


resultado.innerHTML =
"🟢 Cristal recomendado: <b>"+
cristal+
" mm</b>";

}



}





function actualizar(id,valor){


let elemento =
document.getElementById(id);


if(elemento){

elemento.textContent = valor;

}


}





// ACTUALIZAR AL CAMBIAR MEDIDAS


[largo,ancho,alto].forEach(campo=>{


campo.addEventListener(
"input",
calcularAcuario
);


});





// INICIO

calcularAcuario();



});
