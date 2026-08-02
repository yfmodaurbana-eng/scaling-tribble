/* =====================================
   ACUARIO DESIGNER STUDIO V7
   FICHA + SEGURIDAD COMPLETA
===================================== */

console.log("FICHA.JS SEGURIDAD CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const botonCrear=document.getElementById("crearAcuario");


if(!botonCrear)return;



botonCrear.addEventListener("click",()=>{


let largo=Number(document.getElementById("largo").value);

let ancho=Number(document.getElementById("ancho").value);

let alto=Number(document.getElementById("alto").value);



let litros=(largo*ancho*alto)/1000;



/* CRISTAL */

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





/* TIRANTES */

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






/* SEGURIDAD */

let estado="🟢 Estructura correcta";

let mensaje="Diseño dentro de parámetros normales";

let carga="Baja";



if(alto>45){

carga="Media";

}



if(alto>55){

carga="Alta";

}



if(largo>200){

estado="🟡 Revisar diseño";

mensaje="Longitud elevada. Requiere fabricación especializada";

}



if(alto>70 || litros>1000){

estado="🔴 Diseño especial";

mensaje="Medidas fuera de rango estándar";

}





/* PESOS */

let pesoAgua=litros;

let pesoTotal=
litros+(litros*0.15)+(cristal*2);






/* ==========================
   ACTUALIZAR SEGURIDAD
========================== */


cambiar("cristal",cristal+" mm");

cambiar("infoCristal",cristal+" mm");

cambiar("pesoAgua",pesoAgua.toFixed(1)+" kg");

cambiar("pesoTotal",pesoTotal.toFixed(1)+" kg");

cambiar("litros",litros.toFixed(1)+" L");

cambiar("infoLitros",litros.toFixed(1)+" L");

cambiar("infoMedidas",
`${largo} × ${ancho} × ${alto} cm`
);


cambiar("tirantes",tirantes);

cambiar("nivelCarga",carga);

cambiar("estadoSeguridad",estado);






let resultado=
document.getElementById("resultadoCristal");


if(resultado){

resultado.innerHTML=
estado+"<br>"+mensaje;

}






/* FICHA */


let ficha=document.getElementById("fichaTecnica");


if(ficha){


ficha.innerHTML=`

<b>🐠 FICHA TÉCNICA ACUARIO</b><br><br>

📐 ${largo} × ${ancho} × ${alto} cm<br><br>

💧 Volumen:
${litros.toFixed(1)} L<br><br>

🪟 Cristal:
${cristal} mm<br><br>

🛡 Tirantes:
${tirantes}<br>

Cantidad:
${cantidad}<br>

Medida:
${ancho} cm ancho<br>

Grosor:
${cristal} mm<br><br>

⚖️ Peso agua:
${pesoAgua.toFixed(1)} kg<br><br>

🚦 Estado:<br>

<b>${estado}</b><br>

${mensaje}

`;

}



});




function cambiar(id,texto){

let elemento=document.getElementById(id);

if(elemento){

elemento.textContent=texto;

}

}



});
