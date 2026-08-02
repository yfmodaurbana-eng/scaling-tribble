/* ==================================================
   ACUARIO DESIGNER STUDIO V6
   MOTOR ESTRUCTURAL PROFESIONAL
================================================== */

console.log("ENGINE V6 PROFESIONAL CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");
const montaje=document.getElementById("montaje");



if(!largo || !ancho || !alto){
console.error("Faltan medidas");
return;
}




function calcular(){


let L=parseFloat(largo.value)||0;
let A=parseFloat(ancho.value)||0;
let H=parseFloat(alto.value)||0;



// VOLUMEN

let litros=(L*A*H)/1000;




/* =================================
   CALCULO CRISTAL
================================= */


let cristal=6;
let motivo="";


if(L<=80 && H<=45){

cristal=6;
motivo="Acuario doméstico estándar";

}


if((L>80 && L<=150) || H>45){

cristal=8;
motivo="Mayor longitud o presión de agua";

}


if(L>150 || H>60){

cristal=10;
motivo="Dimensiones grandes, requiere refuerzo";

}


if(L>200){

cristal=12;
motivo="Acuario de gran longitud";

}




/* =================================
   CORTES
================================= */


let lateral=A-(cristal/10);

let base=A-(cristal/10);



let cortes=
`
Frontal: ${L} × ${H} cm |
Trasera: ${L} × ${H} cm |
Laterales: ${lateral.toFixed(1)} × ${H} cm |
Base: ${L} × ${base.toFixed(1)} cm
`;





/* =================================
   REFUERZOS
================================= */


let tirantes="No necesarios";

let medida="";

let tipo="";



if(L>100){

tirantes="1 tirante longitudinal recomendado";

medida=`${L} × 5 cm`;

tipo="Tirante superior central";


}



if(L>150){

tirantes="2 tirantes longitudinales recomendados";

medida=`${L} × 6 cm`;

tipo="Doble refuerzo superior";

}



if(L>200){

tirantes="Refuerzo estructural obligatorio";

medida=`${L} × 8 cm`;

tipo="Refuerzo perimetral completo";

}




/* =================================
   SEGURIDAD
================================= */


let nivel="🟢 Diseño doméstico seguro";



if(L>100 || H>50){

nivel="🟡 Diseño con refuerzo recomendado";

}



if(L>180 || H>70){

nivel="🔴 Diseño avanzado";

}




let seguridadMotivo=motivo;




/* =================================
   PESO
================================= */


let pesoCristal=(

(L*H*2)+
(A*H*2)+
(L*A)

)/10000;



pesoCristal*=cristal*2.5;



let pesoTotal=
litros+
pesoCristal+
(litros*0.15);





/* =================================
   ACTUALIZAR PANEL
================================= */


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
"Vidrio float recocido "+cristal+" mm"
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
seguridadMotivo
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
"Base nivelada y resistente"
);






// guardar datos globales para ficha

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
mensaje:seguridadMotivo
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





[largo,ancho,alto].forEach(e=>{

e.addEventListener(
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
