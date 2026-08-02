/* =====================================
   ACUARIO DESIGNER V7
   GENERADOR FICHA TECNICA + VALIDACION
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const boton=document.getElementById("crearAcuario");


if(!boton){

console.log("No existe boton crearAcuario");

return;

}



boton.addEventListener("click",()=>{



let largo =
Number(document.getElementById("largo").value);


let ancho =
Number(document.getElementById("ancho").value);


let alto =
Number(document.getElementById("alto").value);





let litros =
(largo*ancho*alto)/1000;






/* =========================
   CALCULO CRISTAL
========================= */


let cristal=6;



if(litros<=20){

cristal=3;

}

else if(litros<=60){

cristal=4;

}

else if(alto>45){

cristal=8;

}


if(alto>55){

cristal=10;

}



if(largo>200){

cristal=12;

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
   VALIDACION DISEÑO
========================= */


let estadoDiseño =
"🟢 Diseño recomendado";




if(alto>60){

estadoDiseño =
"🟡 Altura elevada. Revisar estructura";

}





if(largo>200){

estadoDiseño =
"🟡 Longitud grande. Fabricación especializada";

}





if(litros>500){

estadoDiseño =
"🟡 Gran volumen. Revisar cristales y soporte";

}





if(alto>80 || largo>300 || litros>1000){

estadoDiseño =
"🔴 Diseño no recomendado sin cálculo profesional";

}





// relación altura / largo


if(alto > largo/2){

estadoDiseño =
"🔴 Proporción peligrosa: demasiada altura";

}







/* =========================
   PESOS
========================= */


let pesoAgua=litros;


let pesoTotal=

pesoAgua+

(litros*0.15)+

(cristal*2);








/* =========================
   CREAR FICHA
========================= */


let ficha=
document.getElementById("fichaTecnica");



if(ficha){


ficha.innerHTML=

`

<b>🐠 ACUARIO DESIGNER</b>

<br>
---------------------

<br><br>


📐 MEDIDAS

<br>

Largo: ${largo} cm

<br>

Ancho: ${ancho} cm

<br>

Alto: ${alto} cm


<br><br>


💧 VOLUMEN

<br>

${litros.toFixed(1)} litros


<br><br>


🪟 CRISTALES

<br>

Grosor recomendado:

<b>${cristal} mm</b>


<br><br>


🛡 REFUERZOS

<br>

Tirantes:

${tirantes}

<br>

Cantidad:

${cantidad}


<br>

Medida tirante:

${ancho} cm ancho

<br>

Grosor:

${cristal} mm


<br><br>


⚖️ PESOS

<br>

Agua:

${pesoAgua.toFixed(1)} kg

<br>

Peso total aprox:

${pesoTotal.toFixed(1)} kg


<br><br>


🚦 VALIDACIÓN

<br>

<b>${estadoDiseño}</b>


`;



}



});



});
