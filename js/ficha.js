/* ==================================================
   ACUARIO DESIGNER STUDIO
   FICHA TECNICA PROFESIONAL V3
   GENERADOR + COPIAR
================================================== */


console.log("FICHA TECNICA V3 CARGADA");



document.addEventListener("DOMContentLoaded",()=>{


const botonGenerar =
document.getElementById("generarFicha");


const botonCopiar =
document.getElementById("copiarFicha");



if(botonGenerar){

botonGenerar.addEventListener(
"click",
generarFicha
);

}



if(botonCopiar){

botonCopiar.addEventListener(
"click",
copiarFicha
);

}



});







function generarFicha(){


let a = window.acuario;



if(!a){

alert("Primero modifica las medidas del acuario");

return;

}




let fecha =
new Date().toLocaleDateString("es-ES");





let ficha = `

🐠 ACUARIO DESIGNER STUDIO

FICHA TÉCNICA PROFESIONAL
================================


📅 Fecha:
${fecha}



📐 DATOS GENERALES
================================


Categoría:

${a.categoria}



Dimensiones exteriores:

${a.dimensiones.largo} × ${a.dimensiones.ancho} × ${a.dimensiones.alto} cm



Volumen aproximado:

${a.volumen.toFixed(1)} litros





🪟 CRISTAL ESTRUCTURAL
================================


Tipo:

${a.cristal.tipo}



Grosor recomendado:

${a.cristal.grosor} mm



Estado del diseño:

${a.cristal.estado}





📐 CORTE DE CRISTALES
================================


${a.cortes}





🔩 SISTEMA DE REFUERZO
================================


Necesidad:

${a.tirantes.estado}



Cantidad:

${a.tirantes.cantidad}



Medidas:

${a.tirantes.medida}



Tipo:

${a.tirantes.tipo}





🛡 SEGURIDAD ESTRUCTURAL
================================


Nivel:

${a.seguridad.nivel}



Evaluación:

${a.seguridad.mensaje}





⚖ PESO ESTIMADO
================================


Peso cristal:

${a.peso.cristal.toFixed(1)} kg



Peso total aproximado:

${a.peso.total.toFixed(1)} kg





🧴 MONTAJE RECOMENDADO
================================


Silicona:

Silicona específica para acuarios



Preparación:

Cristales limpios, secos y desengrasados



Curado:

Mínimo 7 días antes del llenado





📌 RECOMENDACIONES
================================


✔ Usar superficie perfectamente nivelada


✔ Revisar soporte del mueble


✔ Utilizar cantos pulidos


✔ No reducir el grosor calculado


✔ Realizar prueba de estanqueidad antes de instalar





================================

FIN DE FICHA TÉCNICA

`;





const salida =
document.getElementById("fichaTecnica");



if(salida){

salida.textContent=ficha;

}



window.fichaActual=ficha;



}







function copiarFicha(){



if(!window.fichaActual){


alert("Primero genera la ficha técnica");


return;


}



navigator.clipboard.writeText(
window.fichaActual
)
.then(()=>{


alert("Ficha copiada correctamente");


})
.catch(()=>{


alert("No se pudo copiar");


});



}
