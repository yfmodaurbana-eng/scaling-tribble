/* =====================================
   ACUARIO DESIGNER STUDIO V8.1
   FICHA FABRICACION COMPLETA
===================================== */


console.log("FICHA V8.1 CARGADA");


document.addEventListener("DOMContentLoaded", function(){



const botonCrear = document.getElementById("crearAcuario");



if(!botonCrear){

console.log("No existe crearAcuario");

return;

}





botonCrear.addEventListener("click", generarFicha);





function generarFicha(){



let largo =
Number(document.getElementById("largo").value) || 0;


let ancho =
Number(document.getElementById("ancho").value) || 0;


let alto =
Number(document.getElementById("alto").value) || 0;





let litros =
(largo * ancho * alto) / 1000;






// ========================
// CALCULO CRISTAL
// ========================


let cristal = 6;



if(litros <= 20){

cristal = 3;

}

else if(litros <= 60){

cristal = 4;

}

else if(alto <= 45){

cristal = 6;

}

else if(alto <= 55){

cristal = 8;

}

else{

cristal = 10;

}







// ========================
// TIRANTES
// ========================


let numeroTirantes = 0;

let textoTirantes = "Sin tirantes";



if(largo > 80){

numeroTirantes = 1;

textoTirantes="1 tirante recomendado";

}



if(largo > 100){

numeroTirantes = 2;

textoTirantes="2 tirantes necesarios";

}



if(largo > 150){

numeroTirantes = 3;

textoTirantes="3 tirantes diseño especial";

}







// ========================
// SEGURIDAD
// ========================


let estado =
"🟢 DISEÑO CORRECTO";


let aviso =
"Medidas dentro de rango";



if(largo>200){

estado="🟡 REVISAR DISEÑO";

aviso="Longitud grande, fabricación especializada";

}



if(largo>300 || alto>80 || litros>1000){

estado="🔴 DISEÑO ESPECIAL";

aviso="Necesita cálculo profesional";

}








// ========================
// PESO
// ========================


let pesoAgua = litros;


let pesoTotal =
litros +
(litros*0.15);








// ========================
// FICHA FINAL
// ========================


let ficha = `

🐠 ACUARIO DESIGNER

FICHA DE FABRICACIÓN

==========================


📐 MEDIDAS ACUARIO

Largo:
${largo} cm

Ancho:
${ancho} cm

Alto:
${alto} cm



💧 VOLUMEN

${litros.toFixed(1)} litros



==========================


🪟 CRISTALES NECESARIOS


FRONTAL

Cantidad: 1

Medida:

${largo} × ${alto} cm

Grosor:

${cristal} mm



TRASERA

Cantidad: 1

Medida:

${largo} × ${alto} cm

Grosor:

${cristal} mm



LATERALES

Cantidad: 2

Medida:

${ancho} × ${alto} cm

Grosor:

${cristal} mm



BASE

Cantidad: 1

Medida:

${largo} × ${ancho} cm

Grosor:

${cristal} mm



==========================


🛡 TIRANTES


${textoTirantes}


Cantidad:

${numeroTirantes}



Cada tirante:

Ancho:
${ancho} cm


Grosor:
${cristal} mm



==========================


⚖️ PESO ESTIMADO


Agua:

${pesoAgua.toFixed(1)} kg


Peso total aproximado:

${pesoTotal.toFixed(1)} kg



==========================


🚦 SEGURIDAD


${estado}


${aviso}


`;





let caja =
document.getElementById("fichaTecnica");



if(caja){

caja.innerHTML =
"<pre style='white-space:pre-wrap'>" + ficha + "</pre>";

}





window.fichaActual=ficha;



}





const copiar =
document.getElementById("copiarFicha");



if(copiar){


copiar.onclick=function(){


if(window.fichaActual){


navigator.clipboard.writeText(window.fichaActual);


alert("Ficha copiada");

}


};


}



});
