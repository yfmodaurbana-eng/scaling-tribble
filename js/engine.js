/* =====================================
 ACUARIO DESIGNER STUDIO V5
 ENGINE CALCULO PROFESIONAL
===================================== */


console.log("ENGINE V5 CARGADO");



document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");
const montaje=document.getElementById("montaje");



if(!largo || !ancho || !alto)return;



function calcular(){


let L=parseFloat(largo.value)||0;
let A=parseFloat(ancho.value)||0;
let H=parseFloat(alto.value)||0;



let litros=(L*A*H)/1000;




// =====================
// CRISTAL AUTOMATICO
// =====================


let cristal=6;


if(litros<=30){

cristal=4;

}

else if(litros<=100 && H<=45){

cristal=6;

}

else if(H<=55){

cristal=8;

}

else{

cristal=10;

}




// =====================
// CORTE SEGUN MONTAJE
// =====================


let tipoMontaje="interior";


if(montaje){

tipoMontaje=montaje.value;

}



let lateral=A;

let base=A;



if(tipoMontaje==="interior"){


lateral=A-(cristal/10*2);

base=A-(cristal/10*2);


}







// =====================
// SEGURIDAD
// =====================


let tirantes="No necesarios";


if(L>80){

tirantes="1 recomendado";

}


if(L>120){

tirantes="2 necesarios";

}



if(L>180){

tirantes="Diseño reforzado";

}





let estado="🟢 Diseño correcto";


if(H>60 || L>200){

estado="🟡 Revisar diseño";

}


if(H>80 || L>300){

estado="🔴 Diseño especial";

}








// =====================
// PESOS
// =====================


let pesoCristal=(

(L*H*2)+
(A*H*2)+
(L*A)

)/10000;


pesoCristal*=cristal*2.5;



let decoracion=litros*0.10;


let pesoTotal=

litros+
pesoCristal+
decoracion;









// =====================
// ACTUALIZAR
// =====================



actualizar(
"liters",
litros.toFixed(1)+" L"
);



actualizar(
"infoLitros",
litros.toFixed(1)+" L"
);



actualizar(
"infoMedidas",
`${L} × ${A} × ${H} cm`
);



actualizar(
"cristal",
cristal+" mm"
);



actualizar(
"infoCristal",
cristal+" mm"
);



actualizar(
"pesoTotal",
pesoTotal.toFixed(1)+" kg"
);



actualizar(
"tirantes",
tirantes
);



actualizar(
"estadoSeguridad",
estado
);



actualizar(
"resultadoCristal",
"✅ Cristal recomendado "+cristal+" mm"
);






}



function actualizar(id,texto){


let elemento=document.getElementById(id);


if(elemento){

elemento.textContent=texto;

}


}






[largo,ancho,alto].forEach(input=>{


input.addEventListener(
"input",
calcular
);


});



if(montaje){

montaje.addEventListener(
"change",
calcular
);

}



calcular();



});
