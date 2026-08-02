/* =====================================
   ACUARIO DESIGNER V7
   GENERADOR FICHA TECNICA
===================================== */


document.addEventListener("DOMContentLoaded", function(){


const boton = document.getElementById("crearAcuario");


if(!boton){

console.log("No existe boton crearAcuario");

return;

}



boton.addEventListener("click", function(){



let largo =
Number(document.getElementById("largo").value);


let ancho =
Number(document.getElementById("ancho").value);


let alto =
Number(document.getElementById("alto").value);




let litros =
(largo*ancho*alto)/1000;



let cristal = 6;


if(litros <= 20){

cristal = 3;

}

else if(litros <= 60){

cristal = 4;

}

else if(alto > 45){

cristal = 8;

}

else if(alto > 55){

cristal = 10;

}




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




let ficha=document.getElementById("fichaTecnica");



ficha.innerHTML=`

<b>🐠 ACUARIO DESIGNER</b><br>

----------------------<br>

📐 MEDIDAS<br>

Largo: ${largo} cm<br>

Ancho: ${ancho} cm<br>

Alto: ${alto} cm<br><br>


💧 VOLUMEN<br>

${litros.toFixed(1)} litros<br><br>


🪟 CRISTALES<br>

Grosor: ${cristal} mm<br><br>


🛡 TIRANTES<br>

Estado: ${tirantes}<br>

Cantidad: ${cantidad}<br>

Ancho: ${ancho} cm<br>

Grosor: ${cristal} mm<br><br>


⚖️ PESO AGUA<br>

${litros.toFixed(1)} kg


`;



});



});
