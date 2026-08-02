/* =====================================
   ACUARIO DESIGNER STUDIO V7
   MOTOR SEGURIDAD ESTRUCTURAL
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const largo = document.getElementById("largo");
const ancho = document.getElementById("ancho");
const alto = document.getElementById("alto");


if(!largo || !ancho || !alto){

console.error("Faltan medidas");

return;

}




function calcular(){


let L = Number(largo.value) || 0;
let A = Number(ancho.value) || 0;
let H = Number(alto.value) || 0;



// ==========================
// VOLUMEN
// ==========================

let litros = (L*A*H)/1000;



// ==========================
// PESOS
// ==========================


let pesoAgua = litros;


// peso cristal aproximado

let superficie =
(2*(L*H))+
(2*(A*H))+
(L*A);


let pesoCristal =
superficie *
0.006 *
2.5;



let decoracion =
litros*0.15;


let pesoTotal =
pesoAgua+
pesoCristal+
decoracion;




// ==========================
// CRISTAL INTELIGENTE
// ==========================


let cristal = 3;



// NANO

if(litros <=10){

cristal=3;

}



// PEQUEÑOS

else if(litros <=30){

cristal=4;

}



// MEDIOS

else if(litros <=80){

cristal=6;

}



// GRANDES

else{


cristal=6;



if(L>80){

cristal=8;

}


if(L>120){

cristal=10;

}


if(L>150){

cristal=12;

}


}



// altura manda

if(H>45 && cristal<8){

cristal=8;

}


if(H>55 && cristal<10){

cristal=10;

}




// ==========================
// REFUERZOS
// ==========================


let tirantes="No necesarios";

let carga="Baja";

let estado="🟢 Diseño correcto";




if(L>80){

tirantes="Recomendables";

carga="Media";

}



if(L>100){

tirantes="Necesarios";

carga="Media-Alta";

}



if(L>150){

tirantes="Diseño especial";

carga="Alta";

estado="🟡 Requiere refuerzos";

}



if(L>200 || H>70){

tirantes="Diseño profesional";

carga="Muy alta";

estado="🔴 Revisar estructura";

}



// ==========================
// ACTUALIZAR
// ==========================


poner("litros",
litros.toFixed(1)+" L");


poner("infoLitros",
litros.toFixed(1)+" L");


poner("pesoAgua",
pesoAgua.toFixed(1)+" kg");


poner("pesoTotal",
pesoTotal.toFixed(1)+" kg");


poner("cristal",
cristal+" mm");


poner("infoCristal",
cristal+" mm");


poner("tirantes",
tirantes);


poner("nivelCarga",
carga);


poner("estadoSeguridad",
estado);



poner("infoMedidas",
`${L} × ${A} × ${H} cm`);




let resultado =
document.getElementById("resultadoCristal");


if(resultado){


resultado.textContent =
"🟢 Cristal recomendado: "+cristal+" mm";


}



// aviso especial 2 metros

if(L>=150){


resultado.textContent =
"🟡 Cristal "+cristal+
" mm + refuerzos obligatorios";


}




}





function poner(id,texto){


let elemento =
document.getElementById(id);


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
