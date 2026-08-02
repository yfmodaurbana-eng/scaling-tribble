/* ======================================
   ACUARIO DESIGNER STUDIO V6
   ENGINE PRINCIPAL
====================================== */


document.addEventListener("DOMContentLoaded",()=>{


const largo = document.getElementById("largo");
const ancho = document.getElementById("ancho");
const alto = document.getElementById("alto");



function calcularAcuario(){


if(!largo || !ancho || !alto) return;



let L = Number(largo.value);
let A = Number(ancho.value);
let H = Number(alto.value);



// litros

let litros = (L*A*H)/1000;



litros = litros.toFixed(1);



// peso agua

let pesoAgua = litros;



// peso aproximado total
// agua + cristal + decoración

let pesoTotal = Math.round(
pesoAgua * 1.15
);





// actualizar litros


let elementosLitros=[

"litros",
"infoLitros",
"volume"

];



elementosLitros.forEach(id=>{

let el=document.getElementById(id);

if(el){

el.textContent =
litros+" L";

}

});





// peso agua


let agua =
document.getElementById("pesoAgua");


if(agua){

agua.textContent =
pesoAgua+" kg";

}





// peso total


let total =
document.getElementById("pesoTotal");


if(total){

total.textContent =
pesoTotal+" kg";

}






// medidas


let medidas =
document.getElementById("infoMedidas");


if(medidas){

medidas.textContent =
`${L} × ${A} × ${H} cm`;

}





// actualizar cristal


calcularCristal(L,A,H);



}





// eventos


[largo,ancho,alto].forEach(input=>{


if(input){

input.addEventListener(
"input",
calcularAcuario
);


}


});




// inicio

calcularAcuario();



});
