/* =====================================
   ACUARIO DESIGNER STUDIO V8.5
   ENGINE CALCULO CORREGIDO
===================================== */

console.log("ENGINE V8.5 CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");


if(!largo || !ancho || !alto) return;



function calcular(){


let L=Number(largo.value)||0;
let A=Number(ancho.value)||0;
let H=Number(alto.value)||0;



let litros=(L*A*H)/1000;



// =====================
// CRISTAL
// =====================


let cristal=6;

let estadoCristal="Correcto";


if(litros<=20){

cristal=3;

}

else if(litros<=60){

cristal=4;

}

else if(H<=45){

cristal=6;

}

else if(H<=55){

cristal=8;

}

else{

cristal=10;
estadoCristal="Revisar diseño";

}





// =====================
// TIRANTES
// =====================


let tirantes="No necesarios";


if(L>80){

tirantes="1 recomendado";

}


if(L>120){

tirantes="2 necesarios";

}


if(L>180){

tirantes="3 necesarios";

}





// =====================
// SEGURIDAD
// =====================


let estado="🟢 Diseño correcto";

let aviso="Medidas dentro de parámetros normales";


if(L>200){

estado="🟡 Revisar diseño";

aviso="Longitud elevada, revisar refuerzos";

}


if(L>300 || H>80 || litros>1000){

estado="🔴 Diseño especial";

aviso="Requiere cálculo estructural";

}




// =====================
// PESOS
// =====================


let pesoAgua=litros;


let pesoCristal=
(
((L*H*2)+(A*H*2)+(L*A))
/10000
)
*
cristal
*
2.5;



let decoracion=
litros*0.10;


let pesoTotal=
pesoAgua+
pesoCristal+
decoracion;






// =====================
// ACTUALIZAR PANEL
// =====================


actualizar(
"litros",
litros.toFixed(1)+" L"
);



actualizar(
"infoLitros",
litros.toFixed(1)+" L"
);



actualizar(
"cristal",
cristal+" mm"
);



actualizar(
"infoCristal",
cristal+" mm"
);



actualizar(
"resultadoCristal",
"Estado: "+estadoCristal
);



actualizar(
"pesoAgua",
pesoAgua.toFixed(1)+" kg"
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
"estadoSeguridad",
estado+
"<br>"+
aviso
);



actualizar(
"infoMedidas",
`${L} × ${A} × ${H} cm`
);




// Guardamos datos para ficha

window.datosAcuario={

largo:L,
ancho:A,
alto:H,

litros:litros,

cristal:cristal,

estadoCristal:estadoCristal,

tirantes:tirantes,

pesoAgua:pesoAgua,

pesoCristal:pesoCristal,

pesoTotal:pesoTotal,

seguridad:estado,

aviso:aviso

};



}





function actualizar(id,texto){


let elemento=document.getElementById(id);


if(elemento){

elemento.innerHTML=texto;

}


}





[largo,ancho,alto].forEach(campo=>{


campo.addEventListener(
"input",
calcular
);


});



calcular();



});
