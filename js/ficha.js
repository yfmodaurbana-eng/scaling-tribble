/* =====================================
   ACUARIO DESIGNER STUDIO
   GENERADOR FICHA TECNICA
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const boton =
document.getElementById("crearAcuario");


if(!boton) return;



boton.addEventListener("click", generarFicha);





function generarFicha(){


let largo =
Number(document.getElementById("largo").value);


let ancho =
Number(document.getElementById("ancho").value);


let alto =
Number(document.getElementById("alto").value);



// litros

let litros =
(largo*ancho*alto)/1000;



// cristal

let cristal = 6;


if(litros <=20){

cristal = 3;

}

else if(alto >45){

cristal = 8;

}

else if(alto >55){

cristal = 10;

}

else if(largo >150){

cristal = 10;

}





// tirantes

let tirantes = 0;


if(largo >80){

tirantes = 1;

}


if(largo >120){

tirantes = 2;

}


if(largo >200){

tirantes = 3;

}



// peso

let peso =
litros + (litros*0.4);





// crear ficha


let ficha = `

📋 FICHA TÉCNICA ACUARIO

━━━━━━━━━━━━━━

MEDIDAS

${largo} × ${ancho} × ${alto} cm


VOLUMEN

${litros.toFixed(1)} litros


PESO ESTIMADO

${peso.toFixed(1)} kg


━━━━━━━━━━━━━━

🪟 CRISTALES

Frontal:
${largo} × ${alto} mm

1 unidad


Trasero:
${largo} × ${alto} mm

1 unidad


Laterales:
${ancho} × ${alto} mm

2 unidades


Base:
${largo} × ${ancho} mm

1 unidad


Grosor:

${cristal} mm


━━━━━━━━━━━━━━


🛡 TIRANTES


Cantidad:

${tirantes}



Medida tirante:

Ancho acuario:
${ancho} mm


Ancho tirante:
80 mm


Grosor:

${cristal} mm


━━━━━━━━━━━━━━


SILICONA

Silicona neutra especial acuarios



`;





mostrarFicha(ficha);



}





function mostrarFicha(texto){


let contenedor =
document.getElementById("fichaTecnica");



if(!contenedor){


contenedor =
document.createElement("div");


contenedor.id="fichaTecnica";


contenedor.innerHTML=`

<h3>📋 Ficha técnica</h3>

<pre id="textoFicha"></pre>

<button id="copiarFicha">
📋 Copiar ficha
</button>

`;



document.body.appendChild(contenedor);


}



document.getElementById("textoFicha").textContent=texto;




document.getElementById("copiarFicha")
.onclick=()=>{


navigator.clipboard.writeText(texto);


alert("Ficha copiada");


};



}



});
