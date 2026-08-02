/* ==================================================
   ACUARIO DESIGNER STUDIO V9
   MOTOR ESTRUCTURAL PROFESIONAL
================================================== */


console.log("ENGINE V9 PROFESIONAL CARGADO");



document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");



if(!largo || !ancho || !alto){

console.error("Faltan campos del diseño");

return;

}





function calcular(){


let L=Number(largo.value)||0;
let A=Number(ancho.value)||0;
let H=Number(alto.value)||0;



// ==========================
// VOLUMEN
// ==========================


let litros=(L*A*H)/1000;





// ==========================
// CATEGORIA
// ==========================


let categoria;


if(litros<=30){

categoria="Nano acuario";

}

else if(litros<=120){

categoria="Acuario doméstico";

}

else if(litros<=300){

categoria="Acuario medio";

}

else if(litros<=600){

categoria="Acuario grande";

}

else{

categoria="Acuario gigante";

}





// ==========================
// CRISTAL
// ==========================


let cristal=6;

let motivo=
"Dimensiones dentro de parámetros normales.";



if(L<=100 && H<=45){

cristal=6;

}



if((L>100 && L<=150) || H>45){

cristal=8;

motivo=
"Mayor longitud frontal o altura de agua.";

}



if(L>150 || H>=60){

cristal=10;

motivo=
"Dimensiones elevadas. Necesita mayor rigidez estructural.";

}



if(L>200 || H>=70){

cristal=12;

motivo=
"Dimensiones extremas. Requiere diseño profesional.";

}





// ==========================
// CORTES
// ==========================


let lateral=
A-(cristal/10*2);


let base=
A-(cristal/10*2);



let cortes=

`Frontal: ${L} × ${H} cm | `+
`Trasera: ${L} × ${H} cm | `+
`Laterales: ${lateral.toFixed(1)} × ${H} cm | `+
`Base: ${L} × ${base.toFixed(1)} cm`;







// ==========================
// REFUERZOS
// ==========================


let tirantes=
"No necesarios";


let medida=
"No aplica";


let tipo=
"Sin refuerzo";





if(L>100 && L<=120){

tirantes=
"1 tirante transversal superior recomendado";

medida=
`${lateral.toFixed(1)} × 5 cm`;

tipo=
"Tirante transversal superior central";

}




if(L>120 && L<=150){

tirantes=
"1 tirante transversal superior recomendado";

medida=
`${lateral.toFixed(1)} × 5 cm`;

tipo=
"Tirante transversal superior central";

}





if(L>150 && L<=200){

tirantes=
"2 tirantes transversales superiores recomendados";

medida=
`${lateral.toFixed(1)} × 6 cm`;

tipo=
"Dos tirantes transversales superiores";

}





if(L>200){

tirantes=
"Refuerzo estructural obligatorio";

medida=
`${lateral.toFixed(1)} × 8 cm`;

tipo=
"Refuerzo perimetral + tirantes transversales";

}







// ==========================
// SEGURIDAD
// ==========================


let nivel=
"🟢 Diseño doméstico seguro";


let mensajeSeguridad=
"Acuario dentro de parámetros habituales. Cristal adecuado para uso residencial.";





if(L>100 || H>50){


nivel=
"🟡 Diseño con refuerzo recomendado";


mensajeSeguridad=
"Mayor longitud o altura. Se recomienda refuerzo superior para reducir flexión del cristal.";

}





if(L>150 || H>=60){


nivel=
"🟠 Diseño avanzado";


mensajeSeguridad=
"Dimensiones medias-altas. Requiere cristal aumentado y sistema de refuerzo superior.";

}





if(L>200 || H>=70){


nivel=
"🔴 Diseño profesional especial";


mensajeSeguridad=
"Dimensiones fuera del rango doméstico. Requiere diseño estructural y fabricación especializada.";

}







// ==========================
// PESO
// ==========================


let pesoCristal=

(((L*H*2)+(A*H*2)+(L*A))/10000)
*
cristal
*
2.5;



let pesoTotal=

litros+
pesoCristal+
(litros*0.15);








// ==========================
// ACTUALIZAR PANEL
// ==========================



actualizar(
"infoLitros",
litros.toFixed(1)+" litros"
);



actualizar(
"infoMedidas",
`${L} × ${A} × ${H} cm`
);



actualizar(
"cristalDiseño",
cristal+" mm"
);



actualizar(
"infoCristal",
`Vidrio float recocido ${cristal} mm`
);



actualizar(
"cortesCristalDiseño",
cortes
);



actualizar(
"cortesCristal",
cortes
);



actualizar(
"tirantesDiseño",
tirantes
);



actualizar(
"tirantes",
tirantes
);



actualizar(
"medidaTirante",
medida
);



actualizar(
"tipoRefuerzo",
tipo
);



actualizar(
"nivelEstructural",
nivel
);



actualizar(
"motivoSeguridad",
mensajeSeguridad
);



actualizar(
"estadoSeguridad",
nivel
);



actualizar(
"pesoTotal",
pesoTotal.toFixed(1)+" kg"
);



actualizar(
"riesgo",
nivel
);



actualizar(
"soporte",
"Base nivelada y soporte preparado para el peso total"
);







// ==========================
// DATOS PARA FICHA
// ==========================


window.acuario={


categoria:categoria,


dimensiones:{

largo:L,

ancho:A,

alto:H

},



volumen:litros,



cristal:{

grosor:cristal,

tipo:`Vidrio float recocido ${cristal} mm`,

estado:nivel

},



cortes:cortes,



tirantes:{

estado:tirantes,

medida:medida,

tipo:tipo

},



seguridad:{

nivel:nivel,

mensaje:mensajeSeguridad

},



peso:{

cristal:pesoCristal,

total:pesoTotal

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




calcular();



});
