/* =====================================
   ACUARIO DESIGNER STUDIO V5
   ENGINE PROFESIONAL ESTABLE
===================================== */


console.log("ENGINE V5 ESTABLE CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const largo = document.getElementById("largo");
const ancho = document.getElementById("ancho");
const alto = document.getElementById("alto");
const montaje = document.getElementById("montaje");


if(!largo || !ancho || !alto){

console.error("Faltan campos de medidas");

return;

}



function calcular(){


let L = Number(largo.value) || 0;
let A = Number(ancho.value) || 0;
let H = Number(alto.value) || 0;



// ======================
// VOLUMEN
// ======================

let litros = (L*A*H)/1000;



// ======================
// CRISTAL
// ======================

let cristal = 6;


if(H <= 35){

cristal = 4;

}
else if(H <= 45){

cristal = 6;

}
else if(H <= 60){

cristal = 8;

}
else if(H <= 70){

cristal = 10;

}
else{

cristal = 12;

}



// aumento por largo

if(L > 120){

cristal += 2;

}

if(L > 180){

cristal += 2;

}



// ======================
// CORTES
// ======================


let lateral = A - ((cristal/10)*2);



let cortes =

"Frontal: "+L+" × "+H+" cm\n"+
"Trasera: "+L+" × "+H+" cm\n"+
"Laterales: "+lateral.toFixed(1)+" × "+H+" cm\n"+
"Base: "+L+" × "+lateral.toFixed(1)+" cm";




// ======================
// REFUERZOS
// ======================


let tirantes="No necesarios";


if(L>100){

tirantes="1 tirante recomendado";

}


if(L>150){

tirantes="2 tirantes recomendados";

}


if(L>200){

tirantes="Diseño reforzado";

}





// ======================
// SEGURIDAD
// ======================


let seguridad="🟢 Diseño correcto";


if(H>60 || L>150){

seguridad="🟡 Revisar refuerzos";

}


if(H>70 || L>250){

seguridad="🔴 Requiere cálculo avanzado";

}





// ======================
// PESO
// ======================


let superficie=(

(L*H*2)+
(A*H*2)+
(L*A)

)/10000;



let pesoCristal=
superficie*cristal*2.5;



let decoracion=
litros*0.12;



let pesoTotal=
litros+pesoCristal+decoracion;



// ======================
// SOPORTE
// ======================


let soporte="Mueble estándar";


if(pesoTotal>300){

soporte="Mueble reforzado";

}


if(pesoTotal>700){

soporte="Soporte profesional";

}




// ======================
// GUARDAR DATOS PARA FICHA
// ======================


window.acuario={


dimensiones:{
largo:L,
ancho:A,
alto:H
},


volumen:litros,


cristal:{
grosor:cristal,
tipo:"Vidrio float para acuarios",
estado:seguridad
},


cortes:cortes,


peso:{
agua:litros,
cristal:pesoCristal,
decoracion:decoracion,
total:pesoTotal
},


tirantes:{
estado:tirantes
},


seguridad:{
nivel:seguridad
},


soporte:{
tipo:soporte
}


};




// ======================
// ACTUALIZAR PANTALLA
// ======================


actualizar("infoLitros",
litros.toFixed(1)+" litros");


actualizar("infoMedidas",
`${L} × ${A} × ${H} cm`);



actualizar("infoCristal",
cristal+" mm");



actualizar("cristalDiseño",
cristal+" mm");



actualizar("pesoTotal",
pesoTotal.toFixed(1)+" kg");



actualizar("tirantes",
tirantes);



actualizar("refuerzosDiseño",
tirantes);



actualizar("riesgo",
seguridad);



actualizar("seguridadDiseño",
seguridad);



actualizar("soporte",
soporte);



actualizar("cortesCristal",
cortes);



}



function actualizar(id,texto){


let elemento=document.getElementById(id);


if(elemento){

elemento.textContent=texto;

}


}





[largo,ancho,alto].forEach(campo=>{


campo.addEventListener(
"input",
calcular
);


});



if(montaje){

montaje.addEventListener(
"change",
calcular
);

}



calcular();



});
