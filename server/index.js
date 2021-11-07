const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ModeloProducto = require("./models/producto.js");
const ModeloUsuario = require("./models/usuario.js");
const ModeloPez = require("./models/pez.js");
const bcryptjs = require("bcryptjs");

app.use(cors())
app.use(express.json())

mongoose.connect(
    "mongodb://127.0.0.1:27017/TEST1?directConnection=true&serverSelectionTimeoutMS=2000",
    { useNewUrlParser: true }
);

app.post("/crearUsuario", async (req, res) => {
    const telefono = req.body.telefono;
    let clave = await bcryptjs.hash(req.body.clave, 8);
    const nombre = req.body.nombre;
    const cedula = req.body.cedula;
    const ubicacion = req.body.ubicacion;
    const rol = req.body.rol;
    const whatsapp = req.body.whatsapp;
    const telegram = req.body.telegram;
    const simpe = req.body.simpe;
    const redesSociales = { whatsapp: whatsapp, telegram: telegram, simpe: simpe };
    if(telefono === '' || nombre === '' || clave === '' || cedula === '' || ubicacion === ''){
        res.send("Falta");
    }
    const usuario = new ModeloUsuario({ telefono: telefono, clave: clave, nombre: nombre, cedula: cedula, ubicacion: ubicacion, rol: rol, redesSociales: redesSociales });
    await usuario.save();
    res.send("Success");
});

app.get("/readUser", async (req, res) => {
    ModeloUsuario.find({}, (err, result) => {
        if (err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});

app.put("/editarUsuario", async (req, res) => {
    const telefono = req.body.telefono;
    const nombre = req.body.nombre;
    let clave = await bcryptjs.hash(req.body.clave, 8); 
    const cedula = req.body.cedula;
    const ubicacion = req.body.ubicacion;
    const rol = req.body.rol;
    await ModeloUsuario.updateMany({ telefono: telefono },
        {
            $set:
            {
                'nombre' : nombre,
                'clave': clave,
                'cedula': cedula,
                'ubicacion': ubicacion,
                'rol':rol
            }
        }, function (error, productoUpdate) {
            if (error) { res.send("Failed") }
            else { 
                res.send("Updated");
            }
        }
)});

app.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id;
    ModeloUsuario.findByIdAndDelete(req.params.id).then(data => {
        if(!blog){
            return res.status(404).send();
        }
        res.send(data);
    }).catch(error => {
        res.status(500).send(error);
    })
});

 app.post("/InsertaFav", async (req, res) => {
    const telefono = req.body.telefono;
    const favorito = req.body.favorito; // object id de usuario
    ModeloUsuario.findOne({telefono:telefono},function(err,user){
        
        if(err){res.send(err);}
        if(user){
            //console.log(telefono);    
            ModeloUsuario.findOneAndUpdate(
                { telefono : telefono}, 
                { $push: {
                    favoritos: favorito}},
                    function (error, success) {
                     if (error) {
                        res.send("False");
                     } else {
                        res.send("True");
                     }
                 }); 

        }
        else{res.send("ERROR");}
    })
  });


app.post("/InsertaFavProd", async (req, res) => {
    const telefono = req.body.telefono;
    const favorito = req.body.favorito; //obj id de publicacion 
    ModeloProducto.findOne({telefono:telefono},function(err,user){
        
        if(err){res.send(err);}
        if(user){
            //console.log(telefono);    
            ModeloProducto.findOneAndUpdate(
                { telefono : telefono}, 
                { $push: {
                    favoritos: favorito}},
                    function (error, success) {
                       // console.log(success);
                     if (error) {
                        res.send("False");
                     } else {
                        res.send("True");
                     }
                 }); 

        }
        else{res.send("ERROR");}
    })
  });


app.post("/insert", async (req, res) => {
    const tel = req.body.tel;
    const tipo = req.body.tipo;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    const fecha = req.body.fecha;
    const localizacion = req.body.localizacion;
    const estado = req.body.estado;
    const publicaciones = { tipo: tipo, cantidad: cantidad, precio: precio, fecha: fecha, localizacion: localizacion, estado: estado };
    //const publicaciones = {tipo:"pargo",cantidad:1,precio:1000,fecha:"21-08-2019",localizacion:"[11.4242,54.32432]",estado:"activo"};
    //const producto = new ModeloProducto({telefono : "83388498",publicaciones: publicaciones });
    const producto = new ModeloProducto({ telefono: tel, publicaciones: publicaciones });
    await producto.save();
    res.send("Inserted data");
});

app.get("/read", async (req, res) => {
    ModeloProducto.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

{/*app.get("/read/:id", async (req, res) => {
    await ModeloProducto.find({_id: req.body.id}, {publicaciones:1, _id:0}, function(err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});*/}

app.post("/insertaPez", async (req, res) => {
    const nombre = req.body.nombre;
    const foto = req.body.foto;
    const producto = new ModeloPez({nombre:nombre, foto:foto});
    await producto.save()
    res.send("Success");
});

app.get("/readPeces", async (req, res) => {
    ModeloPez.find({}, (err, result) => {
        if (err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});

app.get("/readTop", async (req, res) => {
    ModeloPez.find({}, {nombre:1, _id:0}, {sort: {'clicks':-1},  limit: 3}, function(err, result) {
        if (err){
            res.send(err);
        }
        else{
            res.send(result);
            //console.log(result);
        }
    });
});

app.delete("/deletePez/:id", async (req, res) => {
    const id = req.params.id;
    ModeloPez.findByIdAndDelete(req.params.id).then(data => {
        if(!blog){
            return res.status(404).send();
        }
        res.send(data);
    }).catch(error => {
        res.status(500).send(error);
    })
});

app.put("/editarPez", async (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const foto = req.body.foto;
    await ModeloPez.updateMany({ _id: id },
        {
            $set:
            {
                nombre : nombre,
                foto: foto,
            }
        }, function (error, productoUpdate) {
            if (error) { res.send("Failed") }
            else { res.send("Updated") }
        });

    res.send("Updated");
});


app.put("/aumentarPez", async (req, res) => {
    const nombre = req.body.nombre;
    ModeloPez.findOneAndUpdate({ nombre: nombre },{$inc: {clicks: 1}}, function (error, success) {
        if (error) {
            res.send("False");
        } else {
            res.send("True");
        }
    });
});
         
{/*app.get("/readPromP", async (req, res) => {
    ModeloProducto.find({}, {'publicaciones.precio':1, _id:0}, {sort: {'publicaciones.precio':-1},  limit: 1}, function(err, result) {
        if (err){
            res.send(err);
        }
        else{
            res.send(result);
            //console.log(result);
        }
    });
});*/}

app.get("/readPromP", async(req, res) => {
    ModeloProducto.aggregate([
        {$unwind:"$publicaciones"}, 
        {$group:{"_id":"_id", promedio:{$avg:"$publicaciones.precio"}}}
    ],function(err,user){
        if(err){res.send(err);}
        else{
            res.send(user);
            }
        }
    )
})

app.get("/readMaxP", async(req, res) => {
    ModeloProducto.aggregate([
        {$unwind:"$publicaciones"},{$sort:{"publicaciones.precio":-1}}, {$project: {_id: 0, 'publicaciones.precio': 1}}
        
    ],function(err,user){
        if(err){res.send(err);}
        else{
            res.send(user[0]);
            }
        }
    )
})

app.post("/insertaProducto", async (req, res) => {
    const telefono = req.body.telefono;
    const tipo = req.body.tipo;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    const fecha = req.body.fecha;
    const localizacion = req.body.localizacion;
    const estado = req.body.estado;
    const publicaciones = { tipo: tipo, cantidad: cantidad, precio: precio, fecha: fecha, localizacion: localizacion, estado: estado };
    ModeloProducto.findOne({ telefono: telefono }, function (err, user) {
        if (err) { res.send(err); }
        if (user) { // el usuario ya tiene almenos 1 publicacion
            ModeloProducto.findOneAndUpdate(
                { telefono: telefono },
                {
                    $push: {
                        publicaciones: publicaciones
                    }
                },
                function (error, success) {
                    if (error) {
                        res.send("False");
                    } else {
                        res.send("True");
                    }
                });
        }
        else {//no hay publicaciones
            const producto = new ModeloProducto({ telefono: telefono, publicaciones: publicaciones });
            producto.save();
            res.send("True");
        }
    })
});

app.put("/update", async (req, res) => {
    const newTel = req.body.newTel;
    const id = req.body.id;
    //console.log(newTel, id);
    try {
        await ModeloProducto.findById(id, (error, productoUpdate) => {
            productoUpdate.telefono = newTel;
            productoUpdate.save();
        });

    } catch (err) {
        console.log(err);
    }

    res.send("Updated");
});

app.delete("/delete/:id", async (req, res) => {
    ModeloProducto.updateOne({'publicaciones._id':req.params.id}, 
    {$pull:{'publicaciones':{'_id':req.params.id}}
    }, function (error, prod) {
        if (error) { res.send("Failed") }
        else { res.send("Deleted") }
    });
});

{/*
app.delete("/delete/:id", async (req, res) => {
    try{
        ModeloProducto.updateOne({'publicaciones._id':req.params.id}, 
        {$pull:{'publicaciones':{'_id':req.params.id}}})
    }catch(error){
        res.send(error);
    }

    res.send("Deleted");
});
*/}

    app.get("/read/:id", async (req, res) => {
        const id = req.params.id;
        await ModeloProducto.findById(req.params.id, {publicaciones:1, _id:0},function(err,user){
            if(user){
                res.send(user);
            }
            else{
                res.send(error);
            }
            
        }
        
    )});

    app.get("/readRedes/:telefono", async (req, res) => {
        const id = req.params.telefono;
        await ModeloUsuario.findOne({telefono:req.params.telefono}, {redesSociales:1, _id:0},function(err,user){
            if(user){
                res.send(user);
            }
            else{
                res.send(err);
            }   
        }
    )});

    app.post("/verificarNum", async (req, res) => {
        const telefono = req.body.telefono;
        ModeloUsuario.findOne({ telefono: telefono }, function (err, user) {

            if (err) { res.send(err); }
            if (user) {
                res.send("True");
            }

            else { res.send("False"); }
        })
    });

    app.get("/Filtro", async (req, res) => {
        const mayor = req.body.mayor;
        const menor = req.body.menor;
        ModeloProducto.aggregate([
            { $unwind: "$publicaciones" }, 
            { $match: { $and: [{ "publicaciones.precio": {$gt:menor} }, 
            { "publicaciones.precio":{$lt:mayor}}] } }, 
            {$project: {_id: 0, publicaciones: 1}}
        ], function(err, prods){
            if(err){res.send("Error");}
            else{
                res.send(prods);
            }
        })
    })
  app.post("/verificarProducto", async (req, res) => {
    const telefono = req.body.telefono;
    ModeloProducto.find({telefono:telefono},function(err,result){
        if (err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    })
  });

  app.post("/insertaProducto", async (req, res) => {
    const telefono = req.body.telefono;
    const tipo = req.body.tipo;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    const fecha = req.body.fecha;
    const localizacion = req.body.localizacion;
    const estado = req.body.estado;
    const publicaciones = { tipo: tipo, cantidad: cantidad, precio: precio, fecha: fecha, localizacion: localizacion, estado: estado };
    ModeloProducto.findOne({ telefono: telefono }, function (err, user) {
        if (err) { res.send(err); }
        if (user) { // el usuario ya tiene almenos 1 publicacion
            ModeloProducto.findOneAndUpdate(
                { telefono: telefono },
                {
                    $push: {
                        publicaciones: publicaciones
                    }
                },
                function (error, success) {
                    if (error) {
                        res.send("False");
                    } else {
                        res.send("True");
                    }
                });
        }
        else {//no hay publicaciones
            const producto = new ModeloProducto({ telefono: telefono, publicaciones: publicaciones });
            producto.save();
            res.send("True");
        }
    })
});

app.put("/editarProducto", async (req, res) => {
    const id = req.body.id;
    const tipo = req.body.tipo;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    const fecha = req.body.fecha;
    const localizacion = req.body.localizacion;
    const estado = req.body.estado;
    await ModeloProducto.updateMany({ 'publicaciones._id': id },
        {
            $set:
            {
                'publicaciones.$.tipo': tipo,
                'publicaciones.$.cantidad': cantidad,
                'publicaciones.$.precio': precio,
                'publicaciones.$.fecha': fecha,
                'publicaciones.$.localizacion': localizacion,
                'publicaciones.$.estado': estado
            }
        }, function (error, productoUpdate) {
            if (error) { res.send("Failed") }
            else { res.send("Updated") }
        });

    res.send("Updated");
});

app.get("/readRedes/:telefono", async (req, res) => {
    const id = req.params.telefono;
    await ModeloUsuario.find({telefono:req.params.telefono}, {redesSociales:1, _id:0},function(err,user){
        if(user){
            res.send(user);
        }
        else{
            res.send(err);
        }
        
    }
    
)});

app.get("/getFavProd/:telefono", async (req, res) => {
    const telefono = req.params.telefono;
    var dict  ={};
    ModeloProducto.findOne({telefono:telefono},{favoritos: 1, _id: 0},function(err,user){
        
        if(err){res.send(err);}
        if(user){

            ModeloProducto.aggregate([
                {$unwind:"$publicaciones"},{$match:{"publicaciones._id":{ $in:user.favoritos}}}
                 
            ],function(err,user){
                if(err){res.send(err);}
                    if(user){
                        user.map(function(i) {
                            
                            //console.log(i);
                            
                            
                        });
                        res.send("True")

                    }
                }
            
            )


        }
        
        else{res.send("False");}
    })
  });

app.get("/getFav/:telefono", async (req, res) => {
    const telefono = req.params.telefono;
    ModeloUsuario.findOne({telefono:telefono},{favoritos: 1, _id: 0},function(err,user){
        
        if(err){res.send(err);}
        if(user){

            ModeloUsuario.find({ "_id":{ $in:user.favoritos}},{nombre: 1,telefono:1, _id: 0},function(err,user){
        
                if(err){res.send(err);}
                if(user){
                    //console.log(user);
                    res.send(user);
                }
                
                else{res.send("False");}
            }).sort({nombre:1})


        }
        
        else{res.send("False");}
    })
  });


app.post("/login", async (req, res) => {
    const telefono = req.body.telefono;
    const clave = req.body.clave;

    ModeloUsuario.findOne({ telefono: telefono }, function (err, user) {

        if (err) { res.send(err); }
        if (user) {
            let compare = bcryptjs.compareSync(clave, user["clave"]);
            if (compare) { res.send("True"); }
            else { res.send("False"); }
        }

        else { res.send("False"); }
    })

  });
  app.post("/insertaProducto", async (req, res) => {
    const telefono = req.body.telefono;
    const tipo = req.body.tipo;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    const fecha = req.body.fecha;
    const localizacion = req.body.localizacion;
    const estado = req.body.estado;
    const publicaciones = {tipo : tipo, cantidad: cantidad, precio: precio, fecha: fecha, localizacion: localizacion, estado: estado};
    ModeloProducto.findOne({telefono:telefono},function(err,user){
        if(err){res.send(err);}
        if(user){ // el usuario ya tiene almenos 1 publicacion 
            ModeloProducto.findOneAndUpdate(
                { telefono : telefono}, 
                { $push: {
                    publicaciones: publicaciones}},
               function (error, success) {
                     if (error) {
                        res.send("False");
                     } else {
                        res.send("True");
                     }
                 }); 
        }
        else{//no hay publicaciones
            const producto = new ModeloProducto({telefono: telefono, publicaciones: publicaciones});
             producto.save();
            res.send("True");
        }
    })
  });

app.listen (3001, () => {
    console.log("Conectado");
});