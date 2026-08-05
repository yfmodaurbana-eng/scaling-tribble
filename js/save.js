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




// =========================
// BOTONES V8
// =========================

const btnNuevo = document.getElementById("nuevo");
const btnGuardar = document.getElementById("guardar");
const btnExportar = document.getElementById("exportar");

if (btnGuardar) {
    btnGuardar.onclick = guardarAcuario;
}

if (btnNuevo) {
    btnNuevo.onclick = () => location.reload();
}

if (btnExportar) {
    btnExportar.onclick = () => {
        alert("Exportación próximamente disponible.");
    };
}
