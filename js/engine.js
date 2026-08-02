/* =====================================
   ACUARIO DESIGNER STUDIO V6.2
   MOTOR REALISTA DE CALCULO
   VOLUMEN + PESO + CRISTAL + TIRANTES
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const largo = document.getElementById("largo");
const ancho = document.getElementById("ancho");
const alto = document.getElementById("alto");


if(!largo || !ancho || !alto){
    console.error("Faltan medidas");
    return;
}




function calcular(){


let L = Number(largo.value);
let A = Number(ancho.value);
let H = Number(alto.value);



// VOLUMEN

let litros = (L*A*H)/1000;



// PESO AGUA

let pesoAgua = litros;




// ===============================
// CRISTAL RECOMENDADO
// BASE REALISTA
// ===============================


let cristal = 3;


// Acuarios pequeños

if(litros <= 20){

    cristal = 3;

}



// 20-60 litros

if(litros > 20){

    cristal = 4;

}



// 60-120 litros

if(litros > 60){

    cristal = 6;

}



// 120-250 litros

if(litros > 120){

    cristal = 8;

}



// grandes

if(litros > 250){

    cristal = 10;

}



// altura manda más que litros


if(H > 45 && cristal < 8){

    cristal = 8;

}


if(H > 55){

    cristal = 10;

}



if(H > 70){

    cristal = 12;

}




// ===============================
// TIRANTES
// ===============================


let tirantes="No necesarios";


if(L > 80){

    tirantes="Recomendables";

}


if(L > 100){

    tirantes="Necesarios";

}


if(L > 150){

    tirantes="Diseño especial";

}





// ===============================
// NIVEL DE CARGA
// ===============================


let carga="Baja";


if(litros>100){

    carga="Media";

}


if(litros>250){

    carga="Alta";

}


if(litros>500){

    carga="Muy alta";

}





// ===============================
// SEGURIDAD
// ===============================


let estado="🟢 Estructura correcta";


if(H>70 || L>180){

    estado="🔴 Revisar diseño";

}





// ===============================
// PESO TOTAL
// ===============================


let pesoCristal =
(((L*A*2)+(L*H*2)+(A*H*2))/10000)
*2.5
*cristal;


let pesoDecoracion =
litros*0.15;


let pesoTotal =
pesoAgua+pesoCristal+pesoDecoracion;




// ===============================
// ACTUALIZAR HTML
// ===============================



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
`${L} × ${A} × ${H} cm`);




let resultado =
document.getElementById("resultadoCristal");


if(resultado){

resultado.innerHTML =
"🟢 Cristal recomendado: <b>"+cristal+" mm</b>";

}



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



calcular();


});
