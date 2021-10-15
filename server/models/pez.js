const mongoose = require("mongoose");



const EsquemaPez = new mongoose.Schema({
    nombre:{
        type:String,
        required:true,
    },
    foto:{
        type:String,
        //Por definir
        //default:"Por definir",
        required:false,
    },
    clicks:{
        type:Number,
        default:0,
        required:false,
    }
});



const ModeloPez = mongoose.model('pez',EsquemaPez);
module.exports = ModeloPez; 