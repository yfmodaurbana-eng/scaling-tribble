/* =====================================
   ACUARIO DESIGNER STUDIO
   FICHA TECNICA V1
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const boton =
document.getElementById("crearAcuario");


if(!boton) return;



boton.addEventListener("click", crearFicha);





function crearFicha(){


let largo =
Number(document.getElementById("largo").value);


let ancho =
Number(document.getElementById("ancho").value);


let alto =
Number(document.getElementById("alto").value);





// VOLUMEN

let litros =
(largo * ancho * alto) / 1000;





// CRISTAL

let cristal = 3;


if(litros > 20)
cristal = 5;


if(litros > 100)
cristal = 6;


if(alto > 45)
cristal = 8;


if(alto > 55)
cristal = 10;


if(largo > 200)
cristal = 12;






// TIRANTES


let cantidadTirantes = 0;


if(largo > 80)
cantidadTirantes = 1;


if(largo > 120)
cantidadTirantes = 2;


if(largo > 200)
cantidadTirantes = 3;



let tirantesTexto =
cantidadTirantes === 0
?
"No necesarios"
:
cantidadTirantes+" unidades";






let peso =
litros * 1.4;





let ficha = `

📋 FICHA TÉCNICA

━━━━━━━━━━━━

ACUARIO

${largo} x ${ancho} x ${alto} cm

Volumen:
${litros.toFixed(1)} L

Peso estimado:
${peso.toFixed(1)} kg


━━━━━━━━━━━━

🪟 CRISTALES

Frontal:
${largo} x ${alto} cm

Trasera:
${largo} x ${alto} cm


Laterales:
${ancho} x ${alto} cm

Cantidad:
2


Base:
${largo} x ${ancho} cm


Grosor:
${cristal} mm


━━━━━━━━━━━━

🛡 REFUERZO


Tirantes:
${tirantesTexto}


Medida:

${ancho} cm x 8 cm x ${cristal} mm


Colocación:

Superior transversal


━━━━━━━━━━━━

SILICONA

Neutra especial acuarios

`;





mostrarFicha(ficha);



}





function mostrarFicha(texto){


let zona =
document.getElementById("fichaTecnica");



zona.innerHTML = `


<pre class="texto-ficha">
${texto}
</pre>


<button id="copiarFicha">

📋 Copiar ficha

</button>


`;




document
.getElementById("copiarFicha")
.onclick=()=>{


navigator.clipboard.writeText(texto);


alert("Ficha copiada");

};


}



});
