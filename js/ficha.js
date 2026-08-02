/* =====================================
   ACUARIO DESIGNER STUDIO V7
   FICHA TECNICA + VALIDACION
===================================== */

console.log("FICHA.JS V7 CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const botonCrear=document.getElementById("crearAcuario");


if(!botonCrear){

console.log("No existe crearAcuario");

return;

}



botonCrear.addEventListener("click",()=>{


const largo=
Number(document.getElementById("largo").value);


const ancho=
Number(document.getElementById("ancho").value);


const alto=
Number(document.getElementById("alto").value);



const litros=
(largo*ancho*alto)/1000;




/* =========================
   CRISTAL
========================= */


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





/* =========================
   TIRANTES
========================= */


let tirantes="No necesarios";

let cantidad=0;



if(largo>80){

tirantes="Recomendados";

cantidad=1;

}


if(largo>100){

tirantes="Necesarios";

cantidad=2;

}


if(largo>150){

tirantes="Diseño especial";

cantidad=3;

}






/* =========================
   VALIDACION
========================= */


let estado="🟢 DISEÑO CORRECTO";

let mensaje=
"Medidas adecuadas para un acuario estándar";




if(largo>200){

estado="🟡 REVISAR DISEÑO";

mensaje=
"Longitud grande. Se recomienda fabricación especializada";

}



if(alto>60){

estado="🟡 REVISAR DISEÑO";

mensaje=
"Altura elevada. Aumenta la presión sobre los cristales";

}



if(litros>500){

estado="🟡 REVISAR DISEÑO";

mensaje=
"Gran volumen. Revisar estructura y soporte";

}




if(largo>300 || alto>80 || litros>1000){

estado="🔴 DISEÑO ESPECIAL";

mensaje=
"Fuera de medidas estándar. Requiere cálculo profesional";

}




if(alto>=largo){

estado="🔴 PROPORCIÓN PELIGROSA";

mensaje=
"La altura no debe ser igual o superior al largo";

}






/* =========================
   PESOS
========================= */


const pesoAgua=litros;


const pesoTotal=
litros+
(litros*0.15)+
(cristal*2);







/* =========================
   MOSTRAR FICHA
========================= */


const ficha=
document.getElementById("fichaTecnica");



if(ficha){


ficha.innerHTML=`

<b>🐠 FICHA TÉCNICA ACUARIO</b>

<br><br>


📐 MEDIDAS

<br>

${largo} × ${ancho} × ${alto} cm


<br><br>


💧 VOLUMEN

<br>

${litros.toFixed(1)} L


<br><br>


🪟 CRISTALES

<br>

Grosor recomendado:

<b>${cristal} mm</b>


<br><br>


🛡 TIRANTES

<br>

Estado:

${tirantes}

<br>

Cantidad:

${cantidad}

<br>

Medida:

${ancho} cm ancho

<br>

Grosor:

${cristal} mm


<br><br>


⚖️ PESO

<br>

Agua:

${pesoAgua.toFixed(1)} kg

<br>

Total aprox:

${pesoTotal.toFixed(1)} kg


<br><br>


🚦 VALIDACIÓN

<br>

<b>${estado}</b>

<br>

${mensaje}


`;

}


});



});
