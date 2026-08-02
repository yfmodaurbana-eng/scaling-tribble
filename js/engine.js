/* =====================================
   ACUARIO DESIGNER STUDIO V5
   ENGINE ESTRUCTURAL PROFESIONAL
===================================== */


console.log("ENGINE ESTRUCTURAL V5 CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");
const montaje=document.getElementById("montaje");


if(!largo || !ancho || !alto){

console.error("Faltan medidas del acuario");
return;

}




function calcular(){


let L=Number(largo.value)||0;
let A=Number(ancho.value)||0;
let H=Number(alto.value)||0;



// =======================
// VOLUMEN
// =======================

let litros=(L*A*H)/1000;



// =======================
// CRISTAL
// =======================

let cristal=6;


if(H<=35){

cristal=4;

}
else if(H<=45){

cristal=6;

}
else if(H<=55){

cristal=8;

}
else if(H<=70){

cristal=10;

}
else{

cristal=12;

}



// aumento por longitud

if(L>120){

cristal+=2;

}


if(L>180){

cristal+=2;

}




// =======================
// CORTES
// =======================


let ajuste=cristal/10*2;


let lateral=A-ajuste;


let cortes=

"Frontal: "+L+" × "+H+" cm | "+
"Trasera: "+L+" × "+H+" cm | "+
"Laterales: "+lateral.toFixed(1)+" × "+H+" cm | "+
"Base: "+L+" × "+lateral.toFixed(1)+" cm";




// =======================
// TIRANTES
// =======================


let tirantes="No necesarios";

let medida="";

let refuerzo="";



if(L>100 && L<=150){

tirantes="1 tirante recomendado";
medida=L+" × 5 cm";
refuerzo="Tirante superior central";

}



if(L>150 && L<=220){

tirantes="1 tirante obligatorio";
medida=L+" × 6 cm";
refuerzo="Tirante longitudinal superior";

}



if(L>220){

tirantes="2 tirantes + travesaños";
medida=L+" × 8 cm";
refuerzo="Refuerzo profesional";

}





// =======================
// SEGURIDAD
// =======================


let seguridad="🟢 Diseño doméstico seguro";

let motivo="Dimensiones dentro de parámetros normales";




if(H>55 || L>150){

seguridad="🟡 Diseño avanzado";

motivo=
"Altura o longitud elevada. Se recomienda reforzar estructura.";

}



if(H>70 || L>250){

seguridad="🔴 Diseño profesional";

motivo=
"Gran volumen y presión elevada. Requiere cálculo especializado.";

}





// =======================
// PESO
// =======================


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



let soporte="Mueble estándar";


if(pesoTotal>300){

soporte="Mueble reforzado";

}


if(pesoTotal>700){

soporte="Estructura profesional";

}





// =======================
// ACTUALIZAR PANEL IZQUIERDO
// =======================


actualizar(
"cristalDiseño",
cristal+" mm"
);



actualizar(
"tipoCristal",
"Vidrio float recocido "+cristal+" mm"
);



actualizar(
"cortesCristalDiseño",
cortes
);



actualizar(
"tirantesDiseño",
tirantes
);



actualizar(
"medidaTirante",
medida || "No aplica"
);



actualizar(
"tipoRefuerzo",
refuerzo || "Sin refuerzo"
);



actualizar(
"nivelEstructural",
seguridad
);



actualizar(
"motivoSeguridad",
motivo
);




// =======================
// PANEL DERECHO
// =======================


actualizar(
"infoLitros",
litros.toFixed(1)+" litros"
);



actualizar(
"infoMedidas",
`${L} × ${A} × ${H} cm`
);



actualizar(
"infoCristal",
cristal+" mm"
);



actualizar(
"cortesCristal",
cortes
);



actualizar(
"pesoTotal",
pesoTotal.toFixed(1)+" kg"
);



actualizar(
"tirantes",
tirantes
);



actualizar(
"riesgo",
seguridad
);



actualizar(
"soporte",
soporte
);





// guardar datos para ficha

window.acuario={

dimensiones:{
largo:L,
ancho:A,
alto:H
},

volumen:litros,

cristal:{
grosor:cristal,
tipo:"Vidrio float recocido",
estado:seguridad
},

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
nivel:seguridad,
mensaje:motivo
}

};



}





function actualizar(id,texto){

let elemento=document.getElementById(id);

if(elemento){

elemento.textContent=texto;

}

}





[largo,ancho,alto].forEach(input=>{

input.addEventListener(
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
