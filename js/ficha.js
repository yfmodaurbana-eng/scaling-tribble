/* ==================================================
   ACUARIO DESIGNER STUDIO V6
   FICHA TECNICA PROFESIONAL V4
   GENERADOR + COPIAR
================================================== */


console.log("FICHA TECNICA V4 CARGADA");



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

alert("Primero diseña el acuario");

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



Volumen bruto:

${a.volumen.toFixed(1)} litros





🪟 CRISTAL ESTRUCTURAL

================================


Tipo:

${a.cristal.tipo}



Sistema:

Acuario de vidrio pegado mediante silicona estructural



Grosor recomendado:

${a.cristal.grosor} mm



Estado del diseño:

${a.cristal.estado}





📐 CORTE DE CRISTALES

================================


${a.cortes}





🔩 SISTEMA DE REFUERZO

================================


Estado:

${a.tirantes.estado}



Cantidad:

${a.tirantes.cantidad}



Medida:

${a.tirantes.medida}



Tipo:

${a.tirantes.tipo}



Ubicación:

Refuerzo superior transversal





🛡 SEGURIDAD ESTRUCTURAL

================================


Nivel:

${a.seguridad.nivel}



Evaluación:

${a.seguridad.mensaje}





⚖ PESO ESTIMADO

================================


Peso del cristal:

${a.peso.cristal.toFixed(1)} kg



Peso total aproximado:

${a.peso.total.toFixed(1)} kg





🧴 MONTAJE RECOMENDADO

================================


Silicona:

Silicona específica para fabricación de acuarios



Preparación:

Cristales limpios, secos y desengrasados



Curado:

Mínimo 7 días antes del llenado





📌 RECOMENDACIONES

================================


✔ Usar mueble perfectamente nivelado


✔ Colocar base de apoyo adecuada


✔ Utilizar cantos pulidos


✔ No reducir el grosor recomendado


✔ Realizar prueba de estanqueidad antes de introducir animales





================================

FIN DE FICHA TÉCNICA

`;





let salida =
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


alert("Ficha técnica copiada correctamente");


})


.catch(()=>{


alert("No se pudo copiar la ficha");


});



}
