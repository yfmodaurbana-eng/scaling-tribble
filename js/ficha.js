/* ==================================================
   ACUARIO DESIGNER STUDIO
   FICHA TECNICA PROFESIONAL V2
   GENERADOR + COPIAR
================================================== */


console.log("FICHA TECNICA V2 CARGADA");



document.addEventListener("DOMContentLoaded",()=>{


crearZonaFicha();



});





function crearZonaFicha(){


let panel=document.querySelector(".panel");



if(!panel)return;



let bloque=document.createElement("div");


bloque.className="card ficha";



bloque.innerHTML=`

<h3>
📄 Ficha técnica profesional
</h3>


<button id="generarFicha">
Generar ficha
</button>


<button id="copiarFicha">
📋 Copiar
</button>


<pre id="fichaTecnica">
Pulsa generar ficha...
</pre>


`;



panel.appendChild(bloque);





document
.getElementById("generarFicha")
.addEventListener(
"click",
generarFicha
);



document
.getElementById("copiarFicha")
.addEventListener(
"click",
copiarFicha
);



}





function generarFicha(){


let a=window.acuario;



if(!a){

alert("Primero diseña el acuario");

return;

}





let texto=`


🐠 ACUARIO DESIGNER STUDIO

FICHA TÉCNICA PROFESIONAL
================================


📐 DATOS DEL DISEÑO

Categoría:
${a.categoria}


Medidas:
${a.dimensiones.largo} × ${a.dimensiones.ancho} × ${a.dimensiones.alto} cm


Volumen:
${a.volumen.toFixed(1)} litros




🪟 CRISTAL

Tipo:
${a.cristal.tipo}


Estado:
${a.cristal.estado}




📐 CORTES DE FABRICACIÓN

${a.cortes}




🔩 REFUERZOS ESTRUCTURALES


Necesidad:
${a.tirantes.estado}


Medida:
${a.tirantes.medida}


Tipo:
${a.tirantes.tipo}




🛡 SEGURIDAD


Nivel:
${a.seguridad.nivel}


Evaluación:
${a.seguridad.mensaje}




⚖ PESOS ESTIMADOS


Cristal:
${a.peso.cristal.toFixed(1)} kg


Peso total:
${a.peso.total.toFixed(1)} kg




🧴 MONTAJE


Silicona:
Silicona estructural para acuarios


Preparación:
Cristal limpio y desengrasado


Curado recomendado:
7 días mínimo




⚠ RECOMENDACIONES


✔ Base perfectamente nivelada

✔ Cristal con cantos pulidos

✔ No modificar espesores calculados

✔ Revisar soporte según peso final



================================

FIN DE FICHA TÉCNICA

`;




document
.getElementById("fichaTecnica")
.textContent=texto;



window.fichaActual=texto;



}







function copiarFicha(){



if(!window.fichaActual){

alert("Genera primero la ficha");

return;

}



navigator.clipboard.writeText(
window.fichaActual
);


alert("Ficha copiada al portapapeles");



}
