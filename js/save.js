/* =====================================
   ACUARIO DESIGNER V3.0
   GUARDAR Y CARGAR PROYECTOS
===================================== */


function guardarAcuario(){


let objetos = document.querySelectorAll(".objeto");


let datos = {


    medidas: window.acuario,

    objetos: []

};



objetos.forEach(function(obj){


    datos.objetos.push({


        tipo: obj.innerHTML,

        x: obj.style.left,

        y: obj.style.bottom || obj.style.top


    });


});



localStorage.setItem(

    "miAcuario",

    JSON.stringify(datos)

);



alert("Acuario guardado correctamente");


}





function cargarAcuario(){



// limpiar escena antes de cargar

document
.querySelectorAll(".objeto")
.forEach(o=>o.remove());



let datos = JSON.parse(

localStorage.getItem("miAcuario")

);



if(!datos){


    alert("No hay ningún diseño guardado");

    return;


}




datos.objetos.forEach(function(obj){



    if(obj.tipo=="🪨"){

        crearObjeto("roca","🪨");

    }



    if(obj.tipo=="🌱"){

        crearObjeto("planta","🌱");

    }



    if(obj.tipo=="🐟"){

        crearObjeto("pez","🐟");

    }



    let lista =
    document.querySelectorAll(".objeto");


    let nuevo =
    lista[lista.length-1];



    if(nuevo){


        nuevo.style.left = obj.x;

        nuevo.style.bottom = obj.y;


    }



});



alert("Diseño cargado");


}







// =========================
// BOTONES V9
// =========================


document.addEventListener("DOMContentLoaded",()=>{



const btnNuevo =
document.getElementById("nuevo");


const btnGuardar =
document.getElementById("guardar");


const btnCargar =
document.getElementById("cargar");


const btnExportar =
document.getElementById("exportar");





if(btnGuardar){

    btnGuardar.onclick = guardarAcuario;

}



if(btnCargar){

    btnCargar.onclick = cargarAcuario;

}



if(btnNuevo){

    btnNuevo.onclick = ()=>{

        location.reload();

    };

}



if(btnExportar){

    btnExportar.onclick = ()=>{

        alert("Exportación próximamente disponible.");

    };

}



});
