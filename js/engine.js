/* =====================================
   ACUARIO DESIGNER STUDIO V7
   ENGINE PRINCIPAL
   CALCULOS ACUARIO + SEGURIDAD
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");



if(!largo || !ancho || !alto){

console.log("Campos de medidas no encontrados");

return;

}




function calcularAcuario(){



let L=Number(largo.value)||0;

let A=Number(ancho.value)||0;

let H=Number(alto.value)||0;



let litros=(L*A*H)/1000;



/* ==========================
   CRISTAL
========================== */


let cristal=6;



if(litros<=20){

cristal=3;

}

else if(litros<=60){

cristal=4;

}

else if(H<=45){

cristal=6;

}

else if(H<=55){

cristal=8;

}

else{

cristal=10;

}






/* ==========================
   TIRANTES
========================== */


let tirantes="No necesarios";

let cantidad=0;



if(L>80){

tirantes="Recomendados";

cantidad=1;

}


if(L>100){

tirantes="Necesarios";

cantidad=2;

}


if(L>150){

tirantes="Diseño especial";

cantidad=3;

}







/* ==========================
   SEGURIDAD
========================== */


let estado="🟢 Estructura correcta";

let carga="Baja";


if(H>45){

carga="Media";

}


if(H>55){

carga="Alta";

}



if(L>200){

estado="🟡 Revisar diseño";

}



if(L>300 || H>80 || litros>1000){

estado="🔴 Diseño especial";

}





/* ==========================
   PESOS
========================== */


let pesoAgua=litros;


let pesoTotal=

litros+

(litros*0.15)+

(cristal*2);






/* ==========================
   ACTUALIZAR PANTALLA
========================== */


actualizar("litros",
litros.toFixed(1)+" L");


actualizar("infoLitros",
litros.toFixed(1)+" L");


actualizar("pesoAgua",
pesoAgua.toFixed(1)+" kg");


actualizar("pesoTotal",
pesoTotal.toFixed(1)+" kg");


actualizar("cristal",
cristal+" mm");


actualizar("infoCristal",
cristal+" mm");


actualizar("tirantes",
tirantes);


actualizar("nivelCarga",
carga);


actualizar("estadoSeguridad",
estado);


actualizar("infoMedidas",
`${L} × ${A} × ${H} cm`
);



let resultado=
document.getElementById("resultadoCristal");


if(resultado){

resultado.innerHTML=
estado;

}





}




function actualizar(id,texto){

let elemento=document.getElementById(id);


if(elemento){

elemento.textContent=texto;

}


}





[largo,ancho,alto].forEach(campo=>{


campo.addEventListener(
"input",
calcularAcuario
);


});



calcularAcuario();



});
