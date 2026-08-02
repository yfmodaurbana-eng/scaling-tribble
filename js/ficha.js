/* ==================================================
   ACUARIO DESIGNER STUDIO
   FICHA TECNICA PROFESIONAL V5
   GENERADOR + COPIAR
================================================== */


console.log("FICHA TECNICA V5 CARGADA");



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



let volumenUtil =
a.volumenUtil || (a.volumen * 0.85);



let tiranteTexto =
a.tirantes.estado;



if(tiranteTexto==="No necesarios"){

tiranteTexto=
"No requiere tirantes superiores";

}





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



Volumen útil estimado:

${volumenUtil.toFixed(1)} litros





🪟 CRISTAL ESTRUCTURAL

================================


Tipo:

${a.cristal.tipo}



Sistema:

Construcción mediante silicona estructural específica para acuarios



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

${tiranteTexto}



Cantidad:

${a.tirantes.cantidad}



Medidas:

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





⚖ CARGAS ESTIMADAS

================================


Peso del cristal:

${a.peso.cristal.toFixed(1)} kg



Carga estimada sobre soporte:

${a.peso.total.toFixed(1)} kg





🧴 MONTAJE RECOMENDADO

================================


Silicona:

Silicona específica para fabricación de acuarios



Preparación:

Cristales limpios, secos y correctamente desengrasados



Curado:

Mínimo 7 días antes del llenado completo





📌 RECOMENDACIONES

================================


✔ Utilizar superficie perfectamente nivelada


✔ Verificar resistencia del mueble


✔ Colocar apoyo inferior adecuado


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
