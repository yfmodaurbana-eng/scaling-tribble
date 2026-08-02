/* =====================================
   ACUARIO DESIGNER STUDIO V6
   ENGINE PRINCIPAL
   CALCULO ACUARIO + SEGURIDAD
===================================== */


document.addEventListener("DOMContentLoaded", () => {


const largo = document.getElementById("largo");
const ancho = document.getElementById("ancho");
const alto = document.getElementById("alto");



if(!largo || !ancho || !alto){

console.error("No se encuentran los campos de medidas");

return;

}




function calcularAcuario(){



let L = Number(largo.value) || 0;
let A = Number(ancho.value) || 0;
let H = Number(alto.value) || 0;




// ======================
// VOLUMEN
// ======================


let litros = (L * A * H) / 1000;




// ======================
// PESOS
// ======================


// agua 1 litro = 1 kg

let pesoAgua = litros;



// peso aproximado cristal

let superficieCristal =
((L*A)*2)+
((L*H)*2)+
((A*H)*2);



let pesoCristal =
superficieCristal *
0.006 *
2.5;



// sustrato + decoración estimado

let pesoDecoracion =
litros * 0.15;



let pesoTotal =
pesoAgua +
pesoCristal +
pesoDecoracion;





// ======================
// SEGURIDAD CRISTAL
// ======================


let cristal = 6;

let tirantes = "No necesarios";

let carga = "Baja";

let estado =
"🟢 Estructura correcta";





if(H > 45){

cristal = 8;

tirantes =
"Recomendados";

carga =
"Media";

}



if(H > 55){

cristal = 10;

tirantes =
"Necesarios";

carga =
"Alta";

}



if(L > 120){

tirantes =
"Recomendados";

}




if(L > 150 || H > 70){

cristal = 12;

tirantes =
"Diseño especial";

carga =
"Muy alta";

estado =
"🔴 Revisar estructura";

}





// ======================
// ACTUALIZAR PANTALLA
// ======================


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

resultado.textContent =
"🟢 Cristal recomendado: "+cristal+" mm";

}



}





function actualizar(id,valor){


let elemento =
document.getElementById(id);



if(elemento){

elemento.textContent = valor;

}


}





// detectar cambios

[largo,ancho,alto].forEach(campo=>{


campo.addEventListener(
"input",
calcularAcuario
);


});



// cálculo inicial

calcularAcuario();



});
