/* =====================================
   ACUARIO DESIGNER STUDIO V10
   FICHA FABRICACION PROFESIONAL
===================================== */

console.log("FICHA V10 CARGADA");


document.addEventListener("DOMContentLoaded",()=>{


const boton =
document.getElementById("crearAcuario");


if(!boton)return;



boton.addEventListener("click",()=>{


const largo =
Number(document.getElementById("largo").value);

const ancho =
Number(document.getElementById("ancho").value);

const alto =
Number(document.getElementById("alto").value);



const litros =
(largo*ancho*alto)/1000;



// =====================
// CRISTAL
// =====================

let cristal=6;


if(litros<=20){

cristal=3;

}else if(litros<=60){

cristal=4;

}else if(alto<=45){

cristal=6;

}else if(alto<=55){

cristal=8;

}else{

cristal=10;

}




// =====================
// TIRANTES
// =====================


let tirantes="No necesarios";

let cantidadTirantes=0;



if(largo>80){

tirantes="Recomendados";

cantidadTirantes=1;

}

if(largo>100){

tirantes="Necesarios";

cantidadTirantes=2;

}

if(largo>150){

tirantes="Diseño especial";

cantidadTirantes=3;

}






// =====================
// PESO CRISTAL
// =====================


let areaCristal=

(
(largo*alto*2)+
(ancho*alto*2)+
(largo*ancho)
)/10000;



let pesoCristal=

areaCristal *
cristal *
2.5;



let pesoDecoracion=
litros*0.10;



let pesoTotal=

litros+
pesoCristal+
pesoDecoracion;






// =====================
// SEGURIDAD
// =====================


let estado=
"🟢 DISEÑO CORRECTO";


let aviso=
"Medidas dentro de rango estándar";



if(largo>200){

estado="🟡 REVISAR DISEÑO";

aviso=
"Longitud elevada, revisar refuerzos";

}



if(largo>300 || alto>80){

estado="🔴 DISEÑO ESPECIAL";

aviso=
"Requiere fabricación especializada";

}





// =====================
// FICHA
// =====================


let ficha=`

🐠 ACUARIO DESIGNER STUDIO

FICHA DE FABRICACIÓN


================================


📐 MEDIDAS EXTERIORES


${largo} × ${ancho} × ${alto} cm


Volumen:
${litros.toFixed(1)} litros



================================


🪟 LISTA DE CORTE DE CRISTALES


FRONTAL

Cantidad: 1

Medida:
${largo*10} × ${alto*10} mm

Grosor:
${cristal} mm



TRASERA

Cantidad: 1

Medida:
${largo*10} × ${alto*10} mm

Grosor:
${cristal} mm



LATERALES

Cantidad: 2

Medida:
${ancho*10} × ${alto*10} mm

Grosor:
${cristal} mm



BASE

Cantidad: 1

Medida:
${largo*10} × ${ancho*10} mm

Grosor:
${cristal} mm



================================


🛡 REFUERZOS


${tirantes}


`;



if(cantidadTirantes>0){

ficha+=`

Cantidad:
${cantidadTirantes}


Medida tirante:

Ancho:
${ancho} cm


Grosor:
${cristal} mm

`;

}



ficha+=`


================================


⚖️ PESOS


Agua:
${litros.toFixed(1)} kg


Cristal:
${pesoCristal.toFixed(1)} kg


Decoración:
${pesoDecoracion.toFixed(1)} kg


Peso final aproximado:

${pesoTotal.toFixed(1)} kg



================================


🔧 RECOMENDACIÓN FABRICACIÓN


Silicona:
Acuarios


Cristal:
Canto pulido seguridad


Tolerancia:
±1 mm



================================


🚦 SEGURIDAD


${estado}


${aviso}


`;





const caja=
document.getElementById("fichaTecnica");


if(caja){

caja.innerHTML=
`<pre style="white-space:pre-wrap">${ficha}</pre>`;

}



window.fichaActual=ficha;



});





const copiar=
document.getElementById("copiarFicha");


if(copiar){

copiar.onclick=()=>{


if(window.fichaActual){

navigator.clipboard.writeText(window.fichaActual);

alert("Ficha copiada");

}


};

}



});
