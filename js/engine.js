/* =====================================
   ACUARIO DESIGNER V4
   MOTOR PRINCIPAL
===================================== */


// DATOS DEL ACUARIO

let aquariumData = {

    largo:70,
    ancho:30,
    alto:40,
    litros:84,
    cristal:6

};





// CREAR ACUARIO

function crearAcuario(){


    let largo =
    Number(
    document.getElementById("largo").value
    );


    let ancho =
    Number(
    document.getElementById("ancho").value
    );


    let alto =
    Number(
    document.getElementById("alto").value
    );


    let cristal =
    Number(
    document.getElementById("cristal").value
    );



    let litros =
    (largo * ancho * alto) / 1000;



    aquariumData.largo=largo;
    aquariumData.ancho=ancho;
    aquariumData.alto=alto;
    aquariumData.litros=litros;
    aquariumData.cristal=cristal;



    document
    .getElementById("liters")
    .innerHTML=
    litros.toFixed(1)+" L";



    document
    .getElementById("infoCristal")
    .innerHTML=
    cristal+" mm";



    comprobarCristal();



}







// COMPROBAR GROSOR CRISTAL


function comprobarCristal(){



let largo =
Number(
document.getElementById("largo").value
);


let alto =
Number(
document.getElementById("alto").value
);


let cristal =
Number(
document.getElementById("cristal").value
);



let recomendado=6;



if(largo>100 || alto>50){

    recomendado=10;

}

else if(largo>80 || alto>45){

    recomendado=8;

}





let caja =
document.getElementById("resultadoCristal");




if(cristal < recomendado){


caja.innerHTML=

"❌ Cristal insuficiente<br>"+
"Recomendado: "+
recomendado+
" mm";


caja.style.color="#ef4444";


}



else if(cristal==recomendado){


caja.innerHTML=

"✅ Grosor correcto<br>"+
"Recomendado para este acuario";


caja.style.color="#22c55e";


}



else{


caja.innerHTML=

"⭐ Cristal reforzado<br>"+
"Grosor superior al recomendado";


caja.style.color="#38bdf8";


}



}







// BOTON CREAR


document
.querySelector(".create")
.onclick=
crearAcuario;





// ACTUALIZAR AL CAMBIAR DATOS


document
.getElementById("cristal")
.addEventListener(
"input",
comprobarCristal
);


document
.getElementById("largo")
.addEventListener(
"input",
comprobarCristal
);


document
.getElementById("alto")
.addEventListener(
"input",
comprobarCristal
);



window.onload=function(){

    comprobarCristal();

};
