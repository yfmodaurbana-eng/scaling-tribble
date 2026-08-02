/* ==================================================
   ACUARIO DESIGNER STUDIO V5
   ENGINE PROFESIONAL V2
   CALCULO ESTRUCTURAL
================================================== */


console.log("ENGINE PROFESIONAL V2 CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");
const montaje=document.getElementById("montaje");


if(!largo || !ancho || !alto){

console.error("Faltan campos de medidas");

return;

}




function calcular(){


let L=parseFloat(largo.value)||0;
let A=parseFloat(ancho.value)||0;
let H=parseFloat(alto.value)||0;



// ==========================
// VOLUMEN
// ==========================


let litros=(L*A*H)/1000;



// ==========================
// CRISTAL
// ==========================


let cristal=6;


if(H<=35){

    cristal=4;

}


else if(H<=45){

    cristal=6;

}


else if(H<=60){

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



// ==========================
// CORTES
// ==========================


let descuento=cristal/10;


let lateral=A-(descuento*2);


let cortes=

`
Frontal: ${L} × ${H} cm
Trasera: ${L} × ${H} cm
Laterales: ${lateral.toFixed(1)} × ${H} cm
Base: ${L} × ${lateral.toFixed(1)} cm
`;




// ==========================
// TIRANTES
// ==========================


let tirantes="No necesarios";


if(L>100){

tirantes="1 recomendado";

}


if(L>150){

tirantes="2 recomendados";

}


if(L>200){

tirantes="Diseño reforzado";

}





// ==========================
// SEGURIDAD
// ==========================


let riesgo="🟢 Diseño doméstico correcto";


let nivel=0;



if(H>50){

nivel+=30;

}


if(H>60){

nivel+=30;

}


if(L>120){

nivel+=20;

}


if(L>180){

nivel+=30;

}


if(litros>500){

nivel+=30;

}



if(nivel>=70){

riesgo="🔴 Riesgo alto. Requiere revisión estructural";


}

else if(nivel>=40){

riesgo="🟡 Atención. Recomendado reforzar";


}





// ==========================
// PESOS
// ==========================


// vidrio aproximado


let superficie=

(
(L*H*2)+
(A*H*2)+
(L*A)

)/10000;



let pesoCristal=

superficie*cristal*2.5;



let decoracion=

litros*0.12;



let pesoTotal=

litros+
pesoCristal+
decoracion;



// ==========================
// SOPORTE
// ==========================


let soporte="Mueble estándar";


if(pesoTotal>300){

soporte="Mueble reforzado";

}


if(pesoTotal>700){

soporte="Soporte profesional";

}



// ==========================
// DATOS GLOBALES PARA FICHA
// ==========================


window.acuario={


volumen:litros,


dimensiones:{

largo:L,
ancho:A,
alto:H

},


cristal:{

grosor:cristal,
estado:riesgo

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

nivel:riesgo

},


soporte:soporte


};




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
riesgo
);



actualizar(
"soporte",
soporte
);



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
