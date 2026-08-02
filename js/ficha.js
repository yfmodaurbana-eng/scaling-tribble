/* =====================================
   ACUARIO DESIGNER STUDIO PRO V9
   GENERADOR DE FICHA TECNICA
===================================== */


console.log("FICHA PRO V9 CARGADA");



document.addEventListener("DOMContentLoaded",()=>{


const boton =
document.getElementById("crearAcuario");


if(!boton)return;



boton.addEventListener("click",()=>{


generarFicha();


});



});





function generarFicha(){



const a =
window.acuario;



if(!a || !a.volumen){

return;

}





let d =
a.dimensiones;


let ficha=`


🐠 ACUARIO DESIGNER STUDIO PRO

FICHA PROFESIONAL DE FABRICACIÓN


================================


📐 DATOS DEL ACUARIO


Medidas exteriores:

${d.largo} × ${d.ancho} × ${d.alto} cm



Volumen:

${a.volumen.toFixed(1)} litros



================================


🪟 CRISTAL RECOMENDADO


Espesor:

${a.cristal.grosor} mm


Estado:

${a.cristal.estado}



================================


🛡 SEGURIDAD ESTRUCTURAL


Estado:

${a.seguridad.nivel}


${a.seguridad.mensaje}



================================


🔩 REFUERZOS


Tirantes:

${a.tirantes.estado}


Cantidad:

${a.tirantes.cantidad}



================================


⚖️ PESOS ESTIMADOS


Agua:

${a.peso.agua.toFixed(1)} kg


Cristal:

${a.peso.cristal.toFixed(1)} kg


Decoración:

${a.peso.decoracion.toFixed(1)} kg



Peso total:

${a.peso.total.toFixed(1)} kg



================================


🧴 MATERIAL DE MONTAJE


Silicona:

Recomendada para acuarios


Curado:

Mínimo 7 días



================================


🔧 RECOMENDACIONES


✔ Cristal con canto pulido


✔ Superficie perfectamente nivelada


✔ Limpiar vidrio antes de silicona


✔ Respetar tiempo de curado



================================


FIN DE FICHA


`;





const salida =
document.getElementById("fichaTecnica");



if(salida){


salida.innerHTML=

`

<pre>

${ficha}

</pre>

`;

}



window.fichaActual=ficha;



}
