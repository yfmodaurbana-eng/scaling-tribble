/* =====================================
   ACUARIO DESIGNER V7
   FICHA TECNICA PROFESIONAL
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const boton=document.getElementById("crearAcuario");


if(!boton){

console.log("Botón crear no encontrado");

return;

}



boton.addEventListener("click",()=>{


let largo=Number(document.getElementById("largo").value);
let ancho=Number(document.getElementById("ancho").value);
let alto=Number(document.getElementById("alto").value);



let litros=(largo*ancho*alto)/1000;



/* ==========================
   CRISTAL
========================== */


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




/* ==========================
   TIRANTES
========================== */


let cantidadTirantes=0;

let tirantes="No necesarios";



if(largo>80){

cantidadTirantes=1;

tirantes="Recomendados";

}


if(largo>100){

cantidadTirantes=2;

tirantes="Necesarios";

}


if(largo>150){

cantidadTirantes=3;

tirantes="Diseño especial";

}







/* ==========================
   VALIDACION
========================== */


let estado="🟢 DISEÑO CORRECTO";

let motivo="Medidas dentro de parámetros normales";




if(largo>200){

estado="🟡 REVISAR DISEÑO";

motivo="Longitud elevada. Se recomienda fabricación especializada";

}



if(alto>60){

estado="🟡 REVISAR DISEÑO";

motivo="Altura elevada. Aumenta la presión del agua";

}



if(litros>500){

estado="🟡 REVISAR DISEÑO";

motivo="Gran volumen. Revisar cristales, mesa y refuerzos";

}




if(largo>300 || alto>80 || litros>1000){


estado="🔴 DISEÑO ESPECIAL";

motivo="Medidas fuera de rango para un acuario estándar";


}




if(alto >= largo){


estado="🔴 PROPORCIÓN PELIGROSA";

motivo="La altura no debe superar o igualar al largo";


}







/* ==========================
   PESOS
========================== */


let pesoAgua=litros;


let pesoTotal=

pesoAgua+

(litros*0.15)+

(cristal*2);







/* ==========================
   FICHA
========================== */


let ficha=document.getElementById("fichaTecnica");



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

${litros.toFixed(1)} litros


<br><br>


🪟 CRISTALES

<br>

Grosor:

<b>${cristal} mm</b>


<br><br>


🛡 TIRANTES

<br>

Estado:

${tirantes}

<br>

Cantidad:

${cantidadTirantes}

<br>

Ancho:

${ancho} cm

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

${motivo}



`;

}



});


});
