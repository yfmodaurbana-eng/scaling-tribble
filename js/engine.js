/* ==================================================
   ACUARIO DESIGNER STUDIO V8
   MOTOR ESTRUCTURAL PROFESIONAL
   CALCULO CRISTAL + REFUERZOS
================================================== */

console.log("ENGINE V8 ESTRUCTURAL CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");


if(!largo || !ancho || !alto){

console.error("Faltan medidas del acuario");
return;

}



function calcular(){


let L=Number(largo.value)||0;
let A=Number(ancho.value)||0;
let H=Number(alto.value)||0;



// VOLUMEN

let litros=(L*A*H)/1000;



/* ============================
   CATEGORIA
============================ */


let categoria="Acuario doméstico";


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




/* ============================
   CRISTAL
============================ */


let cristal=6;
let motivo="Dimensiones dentro de parámetros normales";



if(L<=100 && H<=45){

cristal=6;

}



if((L>100 && L<=150) || H>45){

cristal=8;

motivo="Mayor longitud frontal o altura de agua";

}



if(L>150 || H>=60){

cristal=10;

motivo="Dimensiones elevadas, necesita mayor rigidez";

}



if(L>200 || H>=70){

cristal=12;

motivo="Acuario grande, requiere fabricación reforzada";

}







/* ============================
   CORTES CRISTAL
============================ */


let lateral=A-(cristal/10*2);

let base=A-(cristal/10*2);



let cortes=

`Frontal: ${L} × ${H} cm | `+
`Trasera: ${L} × ${H} cm | `+
`Laterales: ${lateral.toFixed(1)} × ${H} cm | `+
`Base: ${L} × ${base.toFixed(1)} cm`;






/* ============================
   TIRANTES TRANSVERSALES
============================ */


let tirantes="No necesarios";

let medida="No aplica";

let tipo="Sin refuerzo";




if(L>100 && L<=120 && H>=45){

tirantes="1 tirante transversal superior recomendado";

medida=`${(A-(cristal/10*2)).toFixed(1)} × 5 cm`;

tipo="Tirante transversal superior central";


}



if(L>120 && L<=150){

tirantes="1 tirante transversal superior recomendado";

medida=`${(A-(cristal/10*2)).toFixed(1)} × 5 cm`;

tipo="Tirante transversal superior central";


}



if(L>150 && L<=200){

tirantes="2 tirantes transversales superiores recomendados";

medida=`${(A-(cristal/10*2)).toFixed(1)} × 6 cm`;

tipo="Dos tirantes transversales superiores";


}



if(L>200){

tirantes="Refuerzo estructural completo";

medida=`${(A-(cristal/10*2)).toFixed(1)} × 8 cm`;

tipo="Refuerzo perimetral + tirantes transversales";


}





/* ============================
   SEGURIDAD
============================ */


let nivel="🟢 Diseño doméstico seguro";


if(L>100 || H>50){

nivel="🟡 Diseño con refuerzo recomendado";

}


if(L>150 || H>=60){

nivel="🟠 Diseño avanzado";

}


if(L>200 || H>=70){

nivel="🔴 Diseño profesional obligatorio";

}







/* ============================
   PESO
============================ */


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






/* ============================
   ACTUALIZAR PANEL
============================ */


poner("infoLitros",
litros.toFixed(1)+" litros"
);



poner("infoMedidas",
`${L} × ${A} × ${H} cm`
);



poner("cristalDiseño",
cristal+" mm"
);



poner("infoCristal",
`Vidrio float recocido ${cristal} mm`
);



poner("cortesCristalDiseño",
cortes
);



poner("cortesCristal",
cortes
);



poner("tirantesDiseño",
tirantes
);



poner("tirantes",
tirantes
);



poner("medidaTirante",
medida
);



poner("tipoRefuerzo",
tipo
);



poner("nivelEstructural",
nivel
);



poner("motivoSeguridad",
motivo
);



poner("estadoSeguridad",
nivel
);



poner("pesoTotal",
pesoTotal.toFixed(1)+" kg"
);



poner("riesgo",
nivel
);



poner("soporte",
"Base nivelada y soporte adecuado para el peso"
);







/* ============================
   DATOS PARA FICHA TECNICA
============================ */


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

mensaje:motivo

},



peso:{

cristal:pesoCristal,

total:pesoTotal

}



};



}




function poner(id,texto){

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
