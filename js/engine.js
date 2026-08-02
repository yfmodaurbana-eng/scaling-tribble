/* ==================================================
   ACUARIO DESIGNER STUDIO V15
   MOTOR ESTRUCTURAL PROFESIONAL
   CRISTAL + REFUERZOS + SEGURIDAD
================================================== */


console.log("ENGINE V15 PROFESIONAL CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");


if(!largo || !ancho || !alto){

console.error("Campos de medidas no encontrados");
return;

}



function actualizar(id,texto){

let elemento=document.getElementById(id);

if(elemento){

elemento.textContent=texto;

}

}





function calcular(){



let L=Number(largo.value)||0;
let A=Number(ancho.value)||0;
let H=Number(alto.value)||0;



if(!L || !A || !H)return;





/* =========================
   VOLUMEN
========================= */


let litros=(L*A*H)/1000;

let volumenUtil=litros*0.85;







/* =========================
   CATEGORIA
========================= */


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







/* =========================
   CRISTAL
   MÍNIMO RECOMENDADO 6 mm
========================= */


let cristal=6;


let motivo=
"Dimensiones dentro de parámetros domésticos normales.";





if((L>100 && L<=150) || H>45){


cristal=8;


motivo=
"Longitud o altura elevada. Se aumenta el grosor recomendado.";


}





if(L>150 || H>=60){


cristal=10;


motivo=
"Mayor carga estructural. Se requiere mayor rigidez del vidrio.";


}





if(L>250 || H>=70){


cristal=12;


motivo=
"Dimensiones especiales. Requiere diseño estructural avanzado.";


}







/* =========================
   CORTES
========================= */


let lateral=

A-(cristal/10*2);



let cortes=

`Frontal: ${L} × ${H} cm | `+
`Trasera: ${L} × ${H} cm | `+
`Laterales: ${lateral.toFixed(1)} × ${H} cm | `+
`Base: ${L} × ${lateral.toFixed(1)} cm`;







/* =========================
   REFUERZOS
========================= */


let tirantes=
"No requiere tirantes superiores";


let medida=
"No aplica";


let tipo=
"Sin refuerzo";


let cantidad=0;




if(L>120 && L<=180){


tirantes=
"1 tirante transversal superior";


medida=
`${A} × 5 cm | Cristal ${cristal} mm`;


tipo=
"Tirante superior central transversal";


cantidad=1;


}





if(L>180 && L<=250){


tirantes=
"2 tirantes transversales superiores";


medida=
`${A} × 6 cm | Cristal ${cristal} mm`;


tipo=
"Dos tirantes superiores transversales";


cantidad=2;


}





if(L>250){


tirantes=
"Refuerzo estructural obligatorio";


medida=
`${A} × 8 cm | Cristal ${cristal} mm`;


tipo=
"Refuerzo perimetral + tirantes transversales";


cantidad=
"Según diseño";


}







/* =========================
   SEGURIDAD
========================= */


let nivel=
"🟢 Diseño doméstico seguro";


let seguridad=
motivo;





if(L>120 && cantidad>0){


nivel=
"🟢 Diseño correcto con refuerzo superior";


seguridad=
"Refuerzo transversal superior calculado según dimensiones del acuario.";


}






if(L>180 || H>=60){


if(cantidad>0){


nivel=
"🟢 Diseño avanzado con refuerzo instalado";


seguridad=
"Acuario de grandes dimensiones con refuerzo superior calculado.";


}else{


nivel=
"🟡 Diseño avanzado";


seguridad=
"Mayor carga estructural. Se recomienda refuerzo superior.";


}


}







if(L>250 || H>=70){


nivel=
"🔴 Diseño profesional especial";


seguridad=
"Dimensiones fuera del rango doméstico. Requiere diseño especializado.";


}








/* =========================
   PESO
========================= */


let pesoCristal=

(((L*H*2)+(A*H*2)+(L*A))/10000)

*

cristal

*

2.5;



let cargaTotal=

litros+

pesoCristal;









/* =========================
   ACTUALIZAR PANEL
========================= */


actualizar("infoLitros",`${litros.toFixed(1)} litros`);

actualizar("infoMedidas",`${L} × ${A} × ${H} cm`);

actualizar("cristalDiseño",`${cristal} mm`);

actualizar("tipoCristal",`Vidrio float recocido ${cristal} mm`);

actualizar("infoCristal",`Vidrio float recocido ${cristal} mm`);

actualizar("cortesCristalDiseño",cortes);

actualizar("tirantesDiseño",tirantes);

actualizar("medidaTirante",medida);

actualizar("tipoRefuerzo",tipo);

actualizar("nivelEstructural",nivel);

actualizar("motivoSeguridad",seguridad);

actualizar("estadoSeguridad",nivel);

actualizar("pesoTotal",`${cargaTotal.toFixed(1)} kg`);

actualizar("riesgo",nivel);

actualizar("soporte","Soporte preparado para carga total");







/* =========================
   DATOS PARA FICHA
========================= */


window.acuario={


categoria,


dimensiones:{


largo:L,

ancho:A,

alto:H


},



volumen:litros,


volumenUtil,



cristal:{


grosor:cristal,


tipo:`Vidrio float recocido ${cristal} mm`,


estado:nivel


},



cortes,



tirantes:{


estado:tirantes,

cantidad,

medida,

tipo


},



seguridad:{


nivel,

mensaje:seguridad


},



peso:{


cristal:pesoCristal,

total:cargaTotal


}



};



}







[largo,ancho,alto].forEach(input=>{


input.addEventListener(
"input",
calcular
);


});



calcular();



});
