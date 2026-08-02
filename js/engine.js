/* =====================================
   ACUARIO DESIGNER V7
   MOTOR CALCULO + FICHA TECNICA
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");

const botonCrear=document.getElementById("crearAcuario");
const copiar=document.getElementById("copiarFicha");



function calcular(){


let L=Number(largo.value);
let A=Number(ancho.value);
let H=Number(alto.value);



let litros=(L*A*H)/1000;



let cristal=6;
let tirantes="No necesarios";
let numeroTirantes=0;
let carga="Baja";



// REGLAS SEGURIDAD

if(litros<=20){

cristal=3;

}

else if(litros<=60){

cristal=4;

}

else if(H>45){

cristal=8;

carga="Media";

}


if(H>55){

cristal=10;

carga="Alta";

}




// TIRANTES SEGUN LONGITUD


if(L>80){

tirantes="Recomendados";

numeroTirantes=1;

}


if(L>100){

tirantes="Necesarios";

numeroTirantes=2;

}


if(L>150){

tirantes="Diseño especial";

numeroTirantes=3;

}




let pesoAgua=litros;

let pesoTotal=
pesoAgua+
(litros*0.15)+
(cristal*2);



actualizar("litros",litros.toFixed(1)+" L");

actualizar("pesoAgua",pesoAgua.toFixed(1)+" kg");

actualizar("pesoTotal",pesoTotal.toFixed(1)+" kg");

actualizar("cristal",cristal+" mm");

actualizar("infoCristal",cristal+" mm");

actualizar("infoLitros",litros.toFixed(1)+" L");

actualizar("infoMedidas",
`${L} × ${A} × ${H} cm`
);

actualizar("tirantes",tirantes);

actualizar("nivelCarga",carga);



return{

L,A,H,

litros,

cristal,

tirantes,

numeroTirantes,

pesoAgua,

pesoTotal

};



}





function actualizar(id,texto){

let e=document.getElementById(id);

if(e){

e.textContent=texto;

}

}







// CREAR FICHA


if(botonCrear){


botonCrear.addEventListener("click",()=>{


let datos=calcular();


let ficha=document.getElementById("fichaTecnica");



if(ficha){


ficha.innerHTML=`

<b>🐠 ACUARIO DESIGNER</b><br><br>


📐 MEDIDAS<br>

Largo: ${datos.L} cm<br>

Ancho: ${datos.A} cm<br>

Alto: ${datos.H} cm<br><br>


💧 VOLUMEN<br>

${datos.litros.toFixed(1)} litros<br><br>


🪟 CRISTALES<br>

Grosor recomendado: ${datos.cristal} mm<br><br>


🛡 SEGURIDAD<br>

Tirantes: ${datos.tirantes}<br>

Cantidad: ${datos.numeroTirantes}<br>

Ancho tirante: ${datos.A} cm<br>

Grosor tirante: ${datos.cristal} mm<br><br>


⚖️ PESOS<br>

Agua: ${datos.pesoAgua.toFixed(1)} kg<br>

Peso total aprox: ${datos.pesoTotal.toFixed(1)} kg


`;

}


});


}







// COPIAR FICHA


if(copiar){


copiar.addEventListener("click",()=>{


let texto=document.getElementById("fichaTecnica").innerText;


navigator.clipboard.writeText(texto);


alert("Ficha copiada");


});


}






[largo,ancho,alto].forEach(i=>{

i.addEventListener("input",calcular);

});



calcular();



});
