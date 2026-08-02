/* =====================================
   ACUARIO DESIGNER STUDIO V5
   BASE DE DATOS DEL PROYECTO
===================================== */


window.acuario = {

    nombre:"Nuevo acuario",


    dimensiones:{
        largo:0,
        ancho:0,
        alto:0
    },


    volumen:0,


    cristal:{
        grosor:0,
        tipo:"Vidrio float",
        estado:""
    },


    cortes:{},


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
    },


    materiales:{
        silicona:"Silicona neutra para acuarios",
        curado:"7 días recomendado"
    },


    soporte:{
        tipo:""
    }


};


console.log("BASE DE DATOS ACUARIO CARGADA");
