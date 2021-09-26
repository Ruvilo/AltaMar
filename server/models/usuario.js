const mongoose = require("mongoose");



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
    comercio:{
        type:String,
        required:false,
    }
});



const ModeloProducto = mongoose.model('usuario',EsquemaUsuario);
module.exports = ModeloProducto; 