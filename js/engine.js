document.addEventListener("DOMContentLoaded",()=>{


const largo=document.getElementById("largo");
const ancho=document.getElementById("ancho");
const alto=document.getElementById("alto");


if(!largo || !ancho || !alto) return;



function calcular(){


let L=Number(largo.value);
let A=Number(ancho.value);
let H=Number(alto.value);



let litros=(L*A*H)/1000;



// PESOS

let pesoAgua=litros;

let pesoCristal=
(((L*A)*2)+((L*H)*2)+((A*H)*2))
*0.006*2.5;


let pesoDecoracion=litros*0.15;


let pesoTotal=
pesoAgua+pesoCristal+pesoDecoracion;



// SEGURIDAD

let cristal=6;
let tirantes="No necesarios";
let nivel="Baja";
let estado="🟢 Estructura correcta";



if(H>45){

cristal=8;
tirantes="Recomendados";
nivel="Media";

}



if(H>55){

cristal=10;
tirantes="Necesarios";
nivel="Alta";

}



if(L>120){

tirantes="Recomendados";

}



if(L>150 || H>70){

cristal=12;
tirantes="Diseño especial";
nivel="Muy alta";
estado="🔴 Revisar estructura";

}




// ACTUALIZAR

cambiar("litros",litros.toFixed(1)+" L");

cambiar("infoLitros",litros.toFixed(1)+" L");


cambiar("pesoAgua",pesoAgua.toFixed(1)+" kg");


cambiar("pesoTotal",pesoTotal.toFixed(1)+" kg");


cambiar("cristal",cristal+" mm");


cambiar("infoCristal",cristal+" mm");


cambiar("tirantes",tirantes);


cambiar("nivelCarga",nivel);


cambiar("estadoSeguridad",estado);



cambiar(
"infoMedidas",
`${L} × ${A} × ${H} cm`
);



cambiar(
"resultadoCristal",
"🟢 Cristal recomendado: "+cristal+" mm"
);



}



function cambiar(id,texto){

let e=document.getElementById(id);

if(e){

e.textContent=texto;

}

}



[largo,ancho,alto].forEach(e=>{

e.addEventListener("input",calcular);

});



calcular();


});
