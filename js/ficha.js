/* =====================================
   ACUARIO DESIGNER STUDIO V11
   FICHA FABRICACION + CORTE AUTOMATICO
===================================== */

alert("ESTOY EN FICHA V11");

console.log("FICHA V11 CARGADA");


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



let montaje="exterior";


const selector =
document.getElementById("montaje");


if(selector){

montaje=selector.value;

}





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
// CORTE AUTOMATICO
// ======================


let frontalLargo=largo;
let frontalAlto=alto;

let lateralAncho=ancho;
let lateralAlto=alto;

let baseLargo=largo;
let baseAncho=ancho;



if(montaje==="interior"){


lateralAncho =
ancho-(cristal/10*2);


baseAncho =
ancho-(cristal/10*2);


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


if(largo>120){

cantidadTirantes=2;

textoTirantes="Necesarios";

}


if(largo>180){

cantidadTirantes=3;

textoTirantes="Diseño especial";

}







// ======================
// PESOS
// ======================


let superficie =

(
(largo*alto*2)+
(ancho*alto*2)+
(largo*ancho)

)/10000;



let pesoCristal =
superficie*cristal*2.5;



let pesoDecoracion =
litros*0.10;



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


let nombreMontaje =
montaje==="interior"
?
"Base interior"
:
"Base exterior";



let ficha=`

🐠 ACUARIO DESIGNER STUDIO

FICHA DE FABRICACIÓN


================================


📐 MEDIDAS EXTERIORES


${largo} × ${ancho} × ${alto} cm


Volumen:

${litros.toFixed(1)} litros



================================


🧱 TIPO DE MONTAJE


${nombreMontaje}



================================


🪟 LISTA DE CORTE DE CRISTALES


FRONTAL

Cantidad: 1

Medida:

${frontalLargo*10} × ${frontalAlto*10} mm

Grosor:

${cristal} mm



TRASERA

Cantidad: 1

Medida:

${frontalLargo*10} × ${frontalAlto*10} mm

Grosor:

${cristal} mm



LATERALES

Cantidad: 2

Medida:

${lateralAncho*10} × ${lateralAlto*10} mm

Grosor:

${cristal} mm



BASE

Cantidad: 1

Medida:

${baseLargo*10} × ${baseAncho*10} mm

Grosor:

${cristal} mm



================================


🛡 REFUERZOS


${textoTirantes}


`;



if(cantidadTirantes>0){

ficha+=`

Cantidad:

${cantidadTirantes}


Cada tirante:

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





const caja =
document.getElementById("fichaTecnica");


if(caja){

caja.innerHTML=
`
<pre style="white-space:pre-wrap;font-family:Arial">
${ficha}
</pre>
`;

}



window.fichaActual=ficha;



});





const copiar =
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
