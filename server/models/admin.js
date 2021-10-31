const mongoose = require("mongoose");
const Schema = mongoose.Schema

const ObjectId = Schema.Types.ObjectId

const EsquemaAdmin = new mongoose.Schema({

    clave:{
        type:String,
        required:true,
    },
    usuario:{
        type:String,
        required:true,
    },
    idPadre:{
        type:ObjectId,
        required:false,
    }
});



const ModeloAdmin = mongoose.model('admin',EsquemaAdmin);
module.exports = ModeloAdmin; 