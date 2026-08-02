/* ==================================================
   ACUARIO DESIGNER STUDIO V10
   MOTOR ESTRUCTURAL PROFESIONAL
   CRISTAL + TIRANTES TRANSVERSALES
================================================== */


console.log("ENGINE V10 PROFESIONAL CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");


if(!largo || !ancho || !alto){

console.error("Campos de medidas no encontrados");
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


let categoria="Acuario doméstico";


if(litros<=30)
categoria="Nano acuario";


else if(litros<=120)
categoria="Acuario doméstico";


else if(litros<=300)
categoria="Acuario medio";


else if(litros<=600)
categoria="Acuario grande";


else
categoria="Acuario gigante";







// ==========================
// CRISTAL
// ==========================


let cristal=6;


let motivo=
"Dimensiones dentro de parámetros normales.";





if((L>100 && L<=150) || H>45){

cristal=8;

motivo=
"Mayor longitud o altura de agua.";

}





if(L>150 || H>=60){

cristal=10;

motivo=
"Dimensiones elevadas, necesita mayor rigidez.";

}




if(L>250 || H>=70){

cristal=12;

motivo=
"Dimensiones extremas, requiere fabricación especial.";

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
// TIRANTES TRANSVERSALES
// ==========================


let tirantes=
"No necesarios";


let medida=
"No aplica";


let tipo=
"Sin refuerzo";



let cantidad=0;






if(L>120 && L<=180){


tirantes=
"1 tirante transversal superior recomendado";


medida=
`${lateral.toFixed(1)} cm × ${cristal} mm grosor × 5 cm ancho`;


tipo=
"Tirante transversal superior central";


cantidad=1;


}






if(L>180 && L<=250){


tirantes=
"2 tirantes transversales superiores recomendados";


medida=
`${lateral.toFixed(1)} cm × ${cristal} mm grosor × 6 cm ancho`;


tipo=
"Dos tirantes transversales superiores repartidos";


cantidad=2;


}






if(L>250){


tirantes=
"Refuerzo estructural obligatorio";


medida=
`${lateral.toFixed(1)} cm × ${cristal} mm grosor × 8 cm ancho`;


tipo=
"Refuerzo perimetral + tirantes transversales";


cantidad=
"Según diseño";

}





// ==========================
// SEGURIDAD
// ==========================


let nivel=
"🟢 Diseño doméstico seguro";


let seguridad=
"Acuario dentro de parámetros habituales.";





if(L>120 || H>50){


nivel=
"🟡 Diseño con refuerzo recomendado";


seguridad=
"Longitud o altura elevada. Se recomienda refuerzo superior.";

}





if(L>180 || H>=60){


nivel=
"🟠 Diseño avanzado";


seguridad=
"Requiere cristal aumentado y refuerzo estructural.";

}





if(L>250 || H>=70){


nivel=
"🔴 Diseño profesional especial";


seguridad=
"Fuera de medidas domésticas. Requiere cálculo especializado.";

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
// ACTUALIZAR PANTALLA
// ==========================


actualizar("infoLitros",
litros.toFixed(1)+" litros");



actualizar("infoMedidas",
`${L} × ${A} × ${H} cm`);




actualizar("cristalDiseño",
cristal+" mm");



actualizar("infoCristal",
`Vidrio float recocido ${cristal} mm`);




actualizar("cortesCristalDiseño",
cortes);



actualizar("cortesCristal",
cortes);




actualizar("tirantesDiseño",
tirantes);



actualizar("tirantes",
tirantes);




actualizar("medidaTirante",
medida);



actualizar("tipoRefuerzo",
tipo);



actualizar("nivelEstructural",
nivel);



actualizar("motivoSeguridad",
seguridad);



actualizar("estadoSeguridad",
nivel);



actualizar("pesoTotal",
pesoTotal.toFixed(1)+" kg");



actualizar("riesgo",
nivel);



actualizar("soporte",
"Soporte nivelado preparado para carga total");








// ==========================
// DATOS PARA FICHA TECNICA
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

tipo:tipo,

cantidad:cantidad

},



seguridad:{

nivel:nivel,

mensaje:seguridad

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
