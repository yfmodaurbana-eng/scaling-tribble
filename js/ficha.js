/* ==================================================
   ACUARIO DESIGNER STUDIO
   FICHA TECNICA PROFESIONAL V7
   GENERADOR + COPIAR
================================================== */


console.log("FICHA TECNICA V7 CARGADA");



document.addEventListener("DOMContentLoaded",()=>{


const generar =
document.getElementById("generarFicha");


const copiar =
document.getElementById("copiarFicha");



if(generar){

generar.onclick = generarFicha;

}


if(copiar){

copiar.onclick = copiarFicha;

}


});








function generarFicha(){



let a = window.acuario;



if(!a){

alert("Diseña primero el acuario");

return;

}



let fecha =
new Date().toLocaleDateString("es-ES");



let volumenUtil =
a.volumenUtil || (a.volumen * 0.85);





/* =========================
   REFUERZOS
========================= */


let estadoRefuerzo;
let cantidad;
let medida;
let tipo;
let ubicacion;



if(
a.tirantes.cantidad===0 ||
a.tirantes.cantidad==="0"
){


estadoRefuerzo =
"No requiere tirantes superiores";


cantidad =
"0";


medida =
"No aplica";


tipo =
"Sin refuerzo";


ubicacion =
"No aplica";


}else{


estadoRefuerzo =
a.tirantes.estado;


cantidad =
a.tirantes.cantidad;


medida =
a.tirantes.medida;


tipo =
a.tirantes.tipo;


ubicacion =
"Refuerzo superior transversal";


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

${estadoRefuerzo}



Cantidad:

${cantidad}



Medida:

${medida}



Tipo:

${tipo}



Ubicación:

${ubicacion}





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

Cristales limpios, secos y desengrasados



Curado:

Mínimo 7 días antes del llenado completo





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


alert("Ficha técnica copiada correctamente");


})

.catch(()=>{


alert("Error al copiar la ficha");


});


}
