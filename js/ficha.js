/* =====================================
   ACUARIO DESIGNER STUDIO V12.1
   FICHA PROFESIONAL FABRICACION
===================================== */

console.log("FICHA V12.1 CARGADA");


document.addEventListener("DOMContentLoaded",()=>{


const crear=document.getElementById("crearAcuario");

if(!crear)return;


crear.addEventListener("click",()=>{


let largo=parseFloat(document.getElementById("largo").value)||0;
let ancho=parseFloat(document.getElementById("ancho").value)||0;
let alto=parseFloat(document.getElementById("alto").value)||0;


let montaje="interior";

const selector=document.getElementById("montaje");

if(selector){
montaje=selector.value;
}



if(largo<=0 || ancho<=0 || alto<=0){

alert("Introduce medidas correctas");
return;

}


// VOLUMEN

let litros=(largo*ancho*alto)/1000;


// CRISTAL

let cristal=6;

if(litros<=20) cristal=3;
else if(litros<=60) cristal=4;
else if(alto>55) cristal=10;
else if(alto>45) cristal=8;



// CORTE

let lateral=ancho;
let base=ancho;


if(montaje==="interior"){

lateral=ancho-(cristal/10*2);
base=ancho-(cristal/10*2);

}



// TIRANTES

let cantidadTirantes=0;
let tipoTirantes="No necesarios";


if(largo>80){

cantidadTirantes=1;
tipoTirantes="Recomendados";

}

if(largo>120){

cantidadTirantes=2;
tipoTirantes="Necesarios";

}

if(largo>180){

cantidadTirantes=3;
tipoTirantes="Refuerzo estructural";

}



// PESOS

let superficie=
(
(largo*alto*2)+
(ancho*alto*2)+
(largo*ancho)
)/10000;


let pesoCristal=superficie*cristal*2.5;

let decoracion=litros*0.10;

let pesoTotal=
litros+pesoCristal+decoracion;



// SILICONA

let tubos=1;

if(litros>100)tubos=2;
if(litros>300)tubos=3;



// SEGURIDAD

let estado="🟢 DISEÑO CORRECTO";
let aviso="Medidas dentro de parámetros normales";


if(largo>200){

estado="🟡 REVISAR DISEÑO";
aviso="Longitud elevada, revisar refuerzos";

}


if(largo>300 || alto>80){

estado="🔴 DISEÑO ESPECIAL";
aviso="Requiere cálculo estructural";

}





// FICHA

let ficha=`

🐠 ACUARIO DESIGNER STUDIO

FICHA PROFESIONAL DE FABRICACIÓN


================================


📐 MEDIDAS


${largo} × ${ancho} × ${alto} cm


Volumen:

${litros.toFixed(1)} litros



================================


🧱 MONTAJE


${montaje==="interior"
?"Base interior"
:"Base exterior"}



================================


🪟 CORTE DE CRISTALES


FRONTAL

1 unidad

${largo*10} × ${alto*10} mm

Grosor:
${cristal} mm



TRASERA

1 unidad

${largo*10} × ${alto*10} mm

Grosor:
${cristal} mm



LATERALES

2 unidades

${lateral*10} × ${alto*10} mm

Grosor:
${cristal} mm



BASE

1 unidad

${largo*10} × ${base*10} mm

Grosor:
${cristal} mm




================================


🛡 TIRANTES


${tipoTirantes}


Cantidad:

${cantidadTirantes}


`;



if(cantidadTirantes>0){

ficha+=`

Medida cada tirante:


Ancho:

${ancho} cm


Grosor:

${cristal} mm


`;

}



ficha+=`


================================


🧴 MATERIAL


Silicona acuario:

${tubos} tubos de 300 ml



================================


⚖️ PESO


Agua:

${litros.toFixed(1)} kg


Cristal:

${pesoCristal.toFixed(1)} kg


Decoración:

${decoracion.toFixed(1)} kg


Peso total:

${pesoTotal.toFixed(1)} kg



================================


🚦 SEGURIDAD


${estado}


${aviso}


`;



const caja=document.getElementById("fichaTecnica");

if(caja){

caja.innerHTML=
`<pre style="white-space:pre-wrap;font-family:Arial">${ficha}</pre>`;

}


window.fichaActual=ficha;



});



const copiar=document.getElementById("copiarFicha");


if(copiar){

copiar.onclick=()=>{

if(window.fichaActual){

navigator.clipboard.writeText(window.fichaActual);

alert("Ficha copiada");

}

};

}



});
