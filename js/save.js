/* =====================================
   ACUARIO DESIGNER V3.0
   GUARDAR Y CARGAR PROYECTOS
===================================== */



function guardarAcuario(){


    let objetos =
    document.querySelectorAll(".objeto");


    let datos = {


        medidas: aquariumData,


        objetos:[]


    };



    objetos.forEach(function(obj){


        datos.objetos.push({


            tipo:obj.innerHTML,

            x:obj.style.left,

            y:obj.style.top


        });


    });



    localStorage.setItem(

        "miAcuario",

        JSON.stringify(datos)

    );



    alert("Acuario guardado correctamente");


}




function cargarAcuario(){


    let datos =
    JSON.parse(

    localStorage.getItem("miAcuario")

    );



    if(!datos){

        alert("No hay ningún diseño guardado");

        return;

    }



    datos.objetos.forEach(function(obj){


        let nuevo;


        if(obj.tipo=="🪨"){

            crearObjeto("roca");

        }


        if(obj.tipo=="🌱"){

            crearObjeto("planta");

        }


        if(obj.tipo=="🐟"){

            crearObjeto("pez");

        }



        nuevo =
        document
        .querySelectorAll(".objeto");



        nuevo =
        nuevo[nuevo.length-1];



        nuevo.style.left=obj.x;

        nuevo.style.top=obj.y;



    });



    alert("Diseño cargado");


}




// Botones superiores


document
.querySelectorAll(".top-buttons button")[1]
.onclick=guardarAcuario;


document
.querySelectorAll(".top-buttons button")[0]
.onclick=function(){

    location.reload();

};



