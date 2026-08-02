/* =====================================
   ACUARIO DESIGNER STUDIO V10.1
   FICHA FABRICACION PROFESIONAL
===================================== */

console.log("FICHA V10.1 CARGADA");


document.addEventListener("DOMContentLoaded",()=>{


const boton =
document.getElementById("crearAcuario");


if(!boton){
console.log("Botón crear no encontrado");
return;
}



boton.addEventListener("click",()=>{



let largo =
parseFloat(document.getElementById("largo").value) || 0;


let ancho =
parseFloat(document.getElementById("ancho").value) || 0;


let alto =
parseFloat(document.getElementById("alto").value) || 0;





if(largo<=0 || ancho<=0 || alto<=0){

alert("Introduce medidas válidas");

return;

}





// ======================
// VOLUMEN
// ======================

let litros =
(largo*ancho*alto)/1000;





// ======================
// CRISTAL
// ======================

let cristal=6;


if(litros<=20){

cristal=3;

}
else if(litros<=60){

cristal=4;

}
else if(alto<=45){

cristal=6;

}
else if(alto<=55){

cristal=8;

}
else{

cristal=10;

}





// ======================
// TIRANTES
// ======================

let cantidadTirantes=0;

let textoTirantes="No necesarios";


if(largo>80){

cantidadTirantes=1;
textoTirantes="Recomendados";

}


if(largo>100){

cantidadTirantes=2;
textoTirantes="Necesarios";

}


if(largo>150){

cantidadTirantes=3;
textoTirantes="Diseño especial";

}





// ======================
// PESO CRISTAL
// ======================


// superficie aproximada en m2

let superficie =

(
(largo*alto*2)+
(ancho*alto*2)+
(largo*ancho)

)/10000;



let pesoCristal =

superficie *
cristal *
2.5;



let pesoDecoracion = litros*0.10;


let pesoTotal =

litros+
pesoCristal+
pesoDecoracion;







// ======================
// SEGURIDAD
// ======================

let estado=
"🟢 DISEÑO CORRECTO";


let aviso=
"Medidas dentro de rango estándar";



if(largo>200){

estado="🟡 REVISAR DISEÑO";

aviso="Longitud elevada, revisar refuerzos";

}



if(largo>300 || alto>80 || litros>1000){

estado="🔴 DISEÑO ESPECIAL";

aviso="Requiere fabricación especializada";

}








// ======================
// FICHA
// ======================


let ficha = `

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


${textoTirantes}


`;



if(cantidadTirantes>0){

ficha += `

Cantidad:

${cantidadTirantes}


Medida tirante:


Ancho:

${ancho} cm


Grosor:

${cristal} mm


`;

}



ficha += `


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






// MOSTRAR FICHA

const caja =
document.getElementById("fichaTecnica");


if(caja){

caja.innerHTML=
`
<pre style="
white-space:pre-wrap;
font-family:Arial;
">${ficha}</pre>
`;

}



window.fichaActual=ficha;



});





// COPIAR

const copiar =
document.getElementById("copiarFicha");


if(copiar){


copiar.addEventListener("click",()=>{


if(window.fichaActual){


navigator.clipboard.writeText(window.fichaActual);


alert("Ficha copiada correctamente");


}


});


}



});
