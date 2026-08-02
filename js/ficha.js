/* =====================================
   ACUARIO DESIGNER STUDIO V8
   FICHA FABRICACION
===================================== */

console.log("FICHA FABRICACION V8 CARGADA");


document.addEventListener("DOMContentLoaded",()=>{


const boton=document.getElementById("crearAcuario");


if(!boton) return;



boton.addEventListener("click",()=>{


let largo=
Number(document.getElementById("largo").value);


let ancho=
Number(document.getElementById("ancho").value);


let alto=
Number(document.getElementById("alto").value);




let litros=(largo*ancho*alto)/1000;




/* ==========================
 CRISTAL
========================== */


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





/* ==========================
 TIRANTES
========================== */


let cantidadTirantes=0;

let estadoTirantes="Sin tirantes";



if(largo>80){

cantidadTirantes=1;
estadoTirantes="1 tirante recomendado";

}



if(largo>100){

cantidadTirantes=2;
estadoTirantes="2 tirantes necesarios";

}



if(largo>150){

cantidadTirantes=3;
estadoTirantes="3 tirantes diseño especial";

}





/* ==========================
 SEGURIDAD
========================== */


let estado="🟢 Diseño correcto";


if(largo>200){

estado="🟡 Longitud elevada";

}


if(largo>300 || alto>80){

estado="🔴 Diseño especial";

}







/* ==========================
 PESOS
========================== */


let pesoAgua=litros;

let pesoTotal=
litros+
(litros*0.15)+
(cristal*2);






/* ==========================
 TEXTO FICHA
========================== */


let texto=`

🐠 ACUARIO DESIGNER
FICHA DE FABRICACIÓN

====================

📐 MEDIDAS

Exterior:
${largo} × ${ancho} × ${alto} cm


💧 VOLUMEN

${litros.toFixed(1)} litros


====================

🪟 LISTADO DE CRISTALES

Frontal:
${largo} × ${alto} cm
${cristal} mm

Trasera:
${largo} × ${alto} cm
${cristal} mm

Lateral izquierdo:
${ancho} × ${alto} cm
${cristal} mm

Lateral derecho:
${ancho} × ${alto} cm
${cristal} mm

Base:
${largo} × ${ancho} cm
${cristal} mm


====================

🛡 REFUERZOS

${estadoTirantes}

Cantidad:
${cantidadTirantes}


Medida tirante:

Ancho:
${ancho} cm

Grosor:
${cristal} mm


====================

⚖️ PESOS

Agua:
${pesoAgua.toFixed(1)} kg

Peso total aproximado:
${pesoTotal.toFixed(1)} kg


====================

🚦 ESTADO

${estado}


`;






/* MOSTRAR */

let caja=document.getElementById("fichaTecnica");


if(caja){

caja.innerText=texto;

}





/* GUARDAR PARA COPIAR */


window.fichaActual=texto;



});





/* ==========================
 COPIAR
========================== */


let copiar=document.getElementById("copiarFicha");


if(copiar){


copiar.addEventListener("click",()=>{


if(window.fichaActual){


navigator.clipboard.writeText(window.fichaActual);


alert("Ficha copiada correctamente");


}



});


}



});
