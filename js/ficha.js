/* =====================================
   ACUARIO DESIGNER STUDIO V12
   FICHA PROFESIONAL FABRICACION
===================================== */


console.log("FICHA V12 PROFESIONAL CARGADA");


document.addEventListener("DOMContentLoaded",()=>{


const crear =
document.getElementById("crearAcuario");


if(!crear)return;



crear.addEventListener("click",()=>{


let largo=parseFloat(
document.getElementById("largo").value
)||0;


let ancho=parseFloat(
document.getElementById("ancho").value
)||0;


let alto=parseFloat(
document.getElementById("alto").value
)||0;



let montaje="interior";


let selector=document.getElementById("montaje");


if(selector){

montaje=selector.value;

}





if(!largo || !ancho || !alto){

alert("Introduce medidas correctas");

return;

}





// ==========================
// CALCULOS
// ==========================


let litros=
(largo*ancho*alto)/1000;




let cristal=6;


if(litros<=20) cristal=3;
else if(litros<=60) cristal=4;
else if(alto>55) cristal=10;
else if(alto>45) cristal=8;







// ==========================
// CORTE
// ==========================


let lateral=ancho;


let base=ancho;



if(montaje==="interior"){


lateral=
ancho-(cristal/10*2);


base=
ancho-(cristal/10*2);

}





// ==========================
// TIRANTES
// ==========================


let numTirantes=0;

let tirantes="No necesarios";


if(largo>80){

numTirantes=1;
tirantes="Recomendados";

}


if(largo>120){

numTirantes=2;
tirantes="Necesarios";

}


if(largo>180){

numTirantes=3;
tirantes="Diseño reforzado";

}





// ==========================
// PESOS
// ==========================


let superficie=(

(largo*alto*2)+
(ancho*alto*2)+
(largo*ancho)

)/10000;



let pesoCristal=
superficie*cristal*2.5;


let decoracion=
litros*0.10;


let pesoFinal=
litros+pesoCristal+decoracion;







// ==========================
// SILICONA
// ==========================


let tubos=1;


if(litros>100){

tubos=2;

}


if(litros>300){

tubos=3;

}







// ==========================
// SEGURIDAD
// ==========================


let estado=
"🟢 Diseño correcto";


let aviso=
"Fabricación estándar";



if(largo>200){

estado="🟡 Revisar diseño";

aviso="Longitud elevada, revisar refuerzos";

}



if(largo>300 || alto>80){

estado="🔴 Diseño especial";

aviso="Requiere cálculo estructural";

}








// ==========================
// FICHA
// ==========================


let ficha=`

🐠 ACUARIO DESIGNER STUDIO

FICHA PROFESIONAL DE FABRICACIÓN


================================


📐 DATOS DEL ACUARIO


Medidas:

${largo} × ${ancho} × ${alto} cm


Volumen:

${litros.toFixed(1)} litros


Tipo montaje:

${montaje==="interior"
?"Base interior"
:"Base exterior"}



================================


🪟 LISTA DE CORTE DE CRISTALES


FRONTAL

1 unidad

${largo*10} × ${alto*10} mm

Cristal:
${cristal} mm



TRASERA

1 unidad

${largo*10} × ${alto*10} mm

Cristal:
${cristal} mm



LATERALES

2 unidades

${lateral*10} × ${alto*10} mm

Cristal:
${cristal} mm



BASE

1 unidad

${largo*10} × ${base*10} mm

Cristal:
${cristal} mm




================================


🛡 REFUERZOS


${tirantes}


Cantidad:

${numTirantes}

`;



if(numTirantes>0){

ficha+=`

Medida tirante:


Largo:

${ancho} cm


Grosor:

${cristal} mm


`;

}




ficha+=`


================================


🧴 MATERIAL MONTAJE


Silicona acuario:

${tubos} tubos de 300 ml


Tipo:

Silicona neutra para acuarios



================================


⚖️ PESOS


Agua:

${litros.toFixed(1)} kg


Cristal:

${pesoCristal.toFixed(1)} kg


Decoración:

${decoracion.toFixed(1)} kg


Peso final estimado:

${pesoFinal.toFixed(1)} kg




================================


🔧 RECOMENDACIONES


✔ Cristal con canto pulido

✔ Superficie perfectamente nivelada

✔ Silicona específica para acuarios

✔ Dejar curado antes de llenar



================================


🚦 SEGURIDAD


${estado}


${aviso}


`;





const caja=
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

copiar.onclick=()=>{


if(window.fichaActual){

navigator.clipboard.writeText(window.fichaActual);

alert("Ficha copiada");

}

};

}



});
