/* =====================================
   ACUARIO DESIGNER STUDIO V5
   FICHA TECNICA PROFESIONAL
===================================== */


console.log("FICHA TECNICA V5 CARGADA");



function generarFicha(){


let a = window.acuario;


if(!a){

alert("No hay datos del acuario");

return;

}



let ficha = `

====================================

🐠 ACUARIO DESIGNER STUDIO V5

FICHA TÉCNICA PROFESIONAL

====================================


📐 DIMENSIONES

Largo:
${a.dimensiones.largo} cm

Ancho:
${a.dimensiones.ancho} cm

Alto:
${a.dimensiones.alto} cm



💧 VOLUMEN

${a.volumen.toFixed(1)} litros



====================================

🪟 CRISTAL


Espesor recomendado:

${a.cristal.grosor} mm


Tipo:

${a.cristal.tipo}



====================================

✂️ CORTES DE VIDRIO


Frontal:

${a.cortes.frontal}


Trasera:

${a.cortes.trasera}


Laterales:

${a.cortes.laterales}


Base:

${a.cortes.base}



====================================

🛡 SEGURIDAD


Estado:

${a.seguridad.nivel}


Refuerzos:

${a.tirantes.estado}



====================================

⚖️ PESO ESTIMADO


Agua:

${a.peso.agua.toFixed(1)} kg


Cristal:

${a.peso.cristal.toFixed(1)} kg


Decoración:

${a.peso.decoracion.toFixed(1)} kg


TOTAL:

${a.peso.total.toFixed(1)} kg



====================================

🏠 SOPORTE


${a.soporte.tipo}



====================================

🧴 MONTAJE


Silicona:

Silicona neutra específica para acuarios


Curado recomendado:

7 días mínimo



====================================

🔧 RECOMENDACIONES


✔ Cristal con cantos pulidos

✔ Superficie totalmente nivelada

✔ Limpiar vidrio con alcohol isopropílico antes de pegar

✔ Respetar tiempo de curado


====================================

FIN DE FICHA

`;



let salida=document.getElementById("fichaTecnica");


if(salida){


salida.innerHTML=

"<pre>"+ficha+"</pre>";


}


window.fichaActual=ficha;



}
