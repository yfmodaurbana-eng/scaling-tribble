/* =====================================
 ACUARIO DESIGNER STUDIO V8
 MOTOR DE CALCULO
===================================== */


console.log("ENGINE CALCULO V8 CARGADO");


document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");


if(!largo||!ancho||!alto)return;



function calcular(){


let L=Number(largo.value)||0;
let A=Number(ancho.value)||0;
let H=Number(alto.value)||0;


let litros=(L*A*H)/1000;



// CRISTAL

let cristal=6;


if(litros<=20){

cristal=3;

}else if(litros<=60){

cristal=4;

}else if(H<=45){

cristal=6;

}else if(H<=55){

cristal=8;

}else{

cristal=10;

}




// TIRANTES

let tirantes="No necesarios";


if(L>80){

tirantes="1 recomendado";

}


if(L>100){

tirantes="2 necesarios";

}


if(L>150){

tirantes="Diseño especial (3 tirantes)";

}




// SEGURIDAD

let estado="🟢 Estructura correcta";

let carga="Baja";


if(H>45)carga="Media";

if(H>55)carga="Alta";


if(L>200){

estado="🟡 Revisar diseño";

}


if(L>300 || H>80 || litros>1000){

estado="🔴 Diseño especial";

}





// PESOS

let pesoAgua=litros;

let pesoTotal=
litros+(litros*0.15);





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


}



function actualizar(id,texto){

let e=document.getElementById(id);

if(e)e.textContent=texto;

}



[largo,ancho,alto].forEach(x=>{

x.addEventListener("input",calcular);

});


calcular();


});
/* =====================================
   SELECTOR MONTAJE ESTILO APP
===================================== */


document.addEventListener("DOMContentLoaded",()=>{


const selector =
document.getElementById("selectorMontaje");


if(!selector)return;



const boton =
selector.querySelector(".select-button");


const opciones =
selector.querySelectorAll(".select-options div");


const campo =
document.getElementById("montaje");


const texto =
document.getElementById("montajeTexto");



boton.addEventListener("click",()=>{

selector.classList.toggle("active");

});




opciones.forEach(opcion=>{


opcion.addEventListener("click",()=>{


campo.value =
opcion.dataset.value;


texto.textContent =
opcion.textContent;


selector.classList.remove("active");



});



});



});
