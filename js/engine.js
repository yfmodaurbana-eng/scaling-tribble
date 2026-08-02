/* =====================================
   ACUARIO DESIGNER STUDIO PRO V9
   ENGINE - MOTOR DE CALCULO
===================================== */


console.log("ENGINE PRO V9 CARGADO");


// Datos globales del acuario

window.acuario = {

dimensiones:{
largo:0,
ancho:0,
alto:0
},


volumen:0,


cristal:{
grosor:0,
estado:""
},


peso:{
agua:0,
cristal:0,
decoracion:0,
total:0
},


seguridad:{
nivel:"",
mensaje:""
},


tirantes:{
cantidad:0,
estado:""
}


};





document.addEventListener("DOMContentLoaded",()=>{



const largo =
document.getElementById("largo");


const ancho =
document.getElementById("ancho");


const alto =
document.getElementById("alto");


const boton =
document.getElementById("crearAcuario");



if(!largo||!ancho||!alto)return;




function calcular(){


let L =
Number(largo.value)||0;


let A =
Number(ancho.value)||0;


let H =
Number(alto.value)||0;




// VOLUMEN

let litros =
(L*A*H)/1000;



// CRISTAL

let cristal=6;

let estadoCristal=
"Correcto";


if(litros<=20){

cristal=3;

}


else if(litros<=60){

cristal=4;

}


else if(H<=45){

cristal=6;

}


else if(H<=60){

cristal=8;

}


else{

cristal=10;

estadoCristal=
"Revisar diseño";

}





// TIRANTES

let cantidad=0;

let estadoTirantes=
"No necesarios";


if(L>80){

cantidad=1;

estadoTirantes=
"Recomendados";

}


if(L>120){

cantidad=2;

estadoTirantes=
"Necesarios";

}


if(L>180){

cantidad=3;

estadoTirantes=
"Refuerzo estructural";

}





// PESOS

let pesoAgua=
litros;



let pesoCristal=

(
((L*H*2)+(A*H*2)+(L*A))
/10000
)
*
cristal
*
2.5;



let decoracion=
litros*0.10;



let pesoTotal=
pesoAgua+
pesoCristal+
decoracion;





// SEGURIDAD

let nivel=
"🟢 Diseño correcto";


let mensaje=
"Medidas dentro de parámetros normales";



if(L>200){

nivel=
"🟡 Revisar diseño";


mensaje=
"Longitud elevada, revisar refuerzos";

}



if(L>300 || H>80 || litros>1000){


nivel=
"🔴 Diseño especial";


mensaje=
"Requiere cálculo estructural";

}




// GUARDAR DATOS

window.acuario={


dimensiones:{

largo:L,
ancho:A,
alto:H

},


volumen:litros,


cristal:{

grosor:cristal,
estado:estadoCristal

},


peso:{

agua:pesoAgua,
cristal:pesoCristal,
decoracion:decoracion,
total:pesoTotal

},


seguridad:{

nivel:nivel,
mensaje:mensaje

},


tirantes:{

cantidad:cantidad,
estado:estadoTirantes

}


};




actualizarPanel();



}





function actualizarPanel(){


const a=
window.acuario;



actualizar(
"litros",
a.volumen.toFixed(1)+" L"
);



actualizar(
"cristal",
a.cristal.grosor+" mm"
);



actualizar(
"seguridad",
a.seguridad.nivel+
"<br>"+
a.seguridad.mensaje
);



}



function actualizar(id,texto){


let elemento=
document.getElementById(id);


if(elemento){

elemento.innerHTML=texto;

}


}




[largo,ancho,alto].forEach(input=>{


input.addEventListener(
"input",
calcular
);


});



if(boton){

boton.addEventListener(
"click",
calcular
);

}



calcular();



});
