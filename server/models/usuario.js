const mongoose = require("mongoose");

const redesSociales = new mongoose.Schema({
    whatsapp:{
        type:String,
        required:false,
    },
    telegram:{
        type:String,
        required:false
    },
    simpe:{
        type:String,
        required:false
    },
});

const EsquemaUsuario = new mongoose.Schema({
    telefono:{
        type:String,
        required:true,
    },
    clave:{
        type:String,
        required:true,
    },
    nombre:{
        type:String,
        required:true,
    },
    cedula:{
        type:String,
        required:false,
    },
    ubicacion:{
        type:String,
        required:false,
    },
    correo:{
        type:String,
        required:false,
    },
    rol:{
        type:String,
        required:false,
    },
    redesSociales:{
        type:[redesSociales],
        required:false,
    },
});



const ModeloUsuario = mongoose.model('usuario',EsquemaUsuario);
module.exports = ModeloUsuario; 