const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId
const ProductoVenta = new mongoose.Schema({
    tipo:{
        type:String,
        required:true,
    },
    cantidad:{
        type:Number,
        required:true,
    },
    precio:{
        type:Number,
        required:true,
    },
    fecha:{
        type:String,
        required:true,
    },
    localizacion:{
        type:String,
        required:false,
    },
    estado:{
        type:String,
        required:true,
    }
});


const EsquemaProducto = new mongoose.Schema({
    telefono:{
        type:String,
        required:true,
    },
    publicaciones:{
        type:[ProductoVenta],
        required:false,
    },
    favoritos:{
        type:[ObjectId],
        required:false,
    }
});

const ModeloProducto = mongoose.model('producto',EsquemaProducto);
module.exports = ModeloProducto; 
