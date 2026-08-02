document.addEventListener("DOMContentLoaded",()=>{


let boton=document.getElementById("crearAcuario");


boton.onclick=function(){


let L=document.getElementById("largo").value;

let A=document.getElementById("ancho").value;

let H=document.getElementById("alto").value;


let litros=(L*A*H)/1000;



document.getElementById("fichaTecnica").innerHTML=

`
<b>🐠 FICHA TÉCNICA</b><br><br>

📐 Medidas:<br>

${L} × ${A} × ${H} cm<br><br>


💧 Volumen:<br>

${litros.toFixed(1)} L<br><br>


🪟 Cristal recomendado:<br>

6 mm<br><br>


🛡 Tirantes:<br>

Ancho: ${A} cm<br>

Grosor: 6 mm

`;



};


});
