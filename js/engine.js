/* =====================================
   ACUARIO DESIGNER STUDIO V7
   MOTOR ESTRUCTURAL REALISTA
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");


if(!largo || !ancho || !alto){
console.error("Faltan medidas");
return;
}




function calcular(){


let L=Number(largo.value);
let A=Number(ancho.value);
let H=Number(alto.value);



// VOLUMEN

let litros=(L*A*H)/1000;



// PESO AGUA

let pesoAgua=litros;



// PESO APROX CRISTAL

let superficie=
((L*A)*2)+
((L*H)*2)+
((A*H)*2);


let pesoCristal=
(superficie/10000)*2.5*1.2;



let pesoDecoracion=
litros*0.15;


let pesoTotal=
pesoAgua+pesoCristal+pesoDecoracion;





// ==========================
// CALCULO CRISTAL
// ==========================


let cristal=3;



if(H>25){
cristal=4;
}


if(H>35){
cristal=6;
}


if(H>45){
cristal=8;
}


if(H>55){
cristal=10;
}


if(H>70){
cristal=12;
}





// compensación por longitud


if(L>100 && cristal<8){
cristal=8;
}


if(L>150){
cristal=12;
}





// ==========================
// TIRANTES
// ==========================


let tirantes="No necesarios";


if(L>80){
tirantes="Recomendados";
}


if(L>100){
tirantes="Necesarios";
}


if(L>150){
tirantes="Diseño especial";
}




// NIVEL CARGA


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




let estado="🟢 Estructura correcta";


if(H>70 || L>180){
estado="🔴 Revisar diseño";
}




// ACTUALIZAR


poner("litros",litros.toFixed(1)+" L");

poner("infoLitros",litros.toFixed(1)+" L");


poner("pesoAgua",
pesoAgua.toFixed(1)+" kg");


poner("pesoTotal",
pesoTotal.toFixed(1)+" kg");



poner("cristal",
cristal+" mm");


poner("infoCristal",
cristal+" mm");



poner("tirantes",
tirantes);


poner("nivelCarga",
carga);


poner("estadoSeguridad",
estado);



poner("infoMedidas",
`${L} × ${A} × ${H} cm`);




poner("resultadoCristal",
"🟢 Cristal recomendado: "+cristal+" mm");



}





function poner(id,texto){

let elemento=document.getElementById(id);

if(elemento){

elemento.textContent=texto;

}

}




[largo,ancho,alto].forEach(e=>{

e.addEventListener("input",calcular);

});



calcular();



});
