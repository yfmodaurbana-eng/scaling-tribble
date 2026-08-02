/* =====================================
   ACUARIO DESIGNER STUDIO V9
   FICHA PROFESIONAL FABRICACION
===================================== */

console.log("FICHA V9 PROFESIONAL CARGADA");


document.addEventListener("DOMContentLoaded",()=>{


const boton =
document.getElementById("crearAcuario");


if(!boton) return;



boton.addEventListener("click",()=>{



const largo =
Number(document.getElementById("largo").value);


const ancho =
Number(document.getElementById("ancho").value);


const alto =
Number(document.getElementById("alto").value);



const litros =
(largo*ancho*alto)/1000;




/* ======================
   CRISTAL
====================== */


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





/* ======================
   SEGURIDAD
====================== */


let seguridad=
"🟢 DISEÑO CORRECTO";


let aviso=
"Medidas estándar";



if(largo>200){

seguridad=
"🟡 REVISAR DISEÑO";

aviso=
"Longitud elevada";

}



if(largo>300 || alto>80 || litros>1000){

seguridad=
"🔴 DISEÑO ESPECIAL";

aviso=
"Requiere cálculo estructural";

}






/* ======================
   TIRANTES
====================== */


let numTirantes=0;

let tirantes=
"Sin tirantes";



if(largo>80){

numTirantes=1;

tirantes="1 tirante recomendado";

}


if(largo>100){

numTirantes=2;

tirantes="2 tirantes necesarios";

}


if(largo>150){

numTirantes=3;

tirantes="3 tirantes diseño especial";

}






/* ======================
   PESO
====================== */


let pesoAgua=litros;


let pesoCristal=
(
(largo*alto*2)+
(ancho*alto*2)+
(largo*ancho)
)
*
(cristal/1000)
*
2.5;



let pesoTotal=
pesoAgua+
pesoCristal+
(litros*0.10);






/* ======================
   FICHA
====================== */


let numero =
Date.now().toString().slice(-6);



let ficha=`

🐠 ACUARIO DESIGNER STUDIO

FICHA FABRICACIÓN Nº ${numero}


==============================

📐 MEDIDAS ACUARIO

Largo:
${largo} cm

Ancho:
${ancho} cm

Alto:
${alto} cm


Volumen:
${litros.toFixed(1)} litros


==============================

🪟 LISTA DE CORTE CRISTALES


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



==============================

🛡 REFUERZOS


${tirantes}


Cantidad:
${numTirantes}


Cada tirante:

Ancho:
${ancho} cm

Grosor:
${cristal} mm



==============================

⚖️ PESOS


Agua:
${pesoAgua.toFixed(1)} kg


Cristal:
${pesoCristal.toFixed(1)} kg


Peso total estimado:

${pesoTotal.toFixed(1)} kg



==============================

🚦 SEGURIDAD


${seguridad}


${aviso}


==============================

`;





const caja =
document.getElementById("fichaTecnica");


if(caja){

caja.innerHTML=
`
<pre style="
white-space:pre-wrap;
font-family:Arial;
font-size:13px;
">
${ficha}
</pre>
`;

}



window.fichaActual=ficha;



});






const copiar=
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
