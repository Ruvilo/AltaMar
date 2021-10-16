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
    {useNewUrlParser: true}
);

app.post("/crearUsuario", async (req, res) => {
    const telefono = req.body.telefono;
    let clave = await bcryptjs.hash(req.body.clave,8); 
    const nombre = req.body.nombre;
    const cedula = req.body.cedula;
    const ubicacion = req.body.ubicacion;
    const rol = req.body.rol;
    const comercio = req.body.comercio;
    const producto = new ModeloUsuario({telefono : telefono, clave:clave, nombre:nombre, cedula:cedula,ubicacion:ubicacion,rol:rol,comercio:comercio});
    await producto.save()
    res.send("Success");
});

app.post("/insertaPez", async (req, res) => {
    const nombre = req.body.nombre;
    const foto = req.body.foto;
    const producto = new ModeloPez({nombre:nombre, foto:foto});
    await producto.save()
    res.send("Success");
});

app.post("/insert", async (req, res) => {
    const tel = req.body.tel;
    const tipo = req.body.tipo;
    const cantidad = req.body.cantidad;
    const precio = req.body.precio;
    const fecha = req.body.fecha;
    const localizacion = req.body.localizacion;
    const estado = req.body.estado;
    const publicaciones = {tipo : tipo, cantidad: cantidad, precio: precio, fecha: fecha, localizacion: localizacion, estado: estado};
    //const publicaciones = {tipo:"pargo",cantidad:1,precio:1000,fecha:"21-08-2019",localizacion:"[11.4242,54.32432]",estado:"activo"};
    //const producto = new ModeloProducto({telefono : "83388498",publicaciones: publicaciones });
    const producto = new ModeloProducto({telefono: tel, publicaciones: publicaciones});
    await producto.save();
    res.send("Inserted data");
});

app.get("/read", async (req, res) => {
    ModeloProducto.find({}, (err, result) => {
        if (err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});

app.get("/read/peces", async (req, res) => {
    ModeloPez.find({}, (err, result) => {
        if (err){
            res.send(err);
        }
        else{
            res.send(result);
        }
    });
});

app.get("/read/top", async (req, res) => {
    ModeloPez.find({}, {nombre:1, _id:0}, {sort: {'clicks':-1},  limit: 3}, function(err, result) {
        if (err){
            res.send(err);
        }
        else{
            res.send(result);
            console.log(result);
        }
    });
});

app.put("/update", async (req, res) => {
    const newTel = req.body.newTel;
    const id = req.body.id;
    console.log(newTel, id);
    try{
        await ModeloProducto.findById(id, (error, productoUpdate) => {
            productoUpdate.telefono = newTel;
            productoUpdate.save();
        });

    } catch(err){
        console.log(err); 
    }

    res.send("Updated");
});

app.delete("/delete/:id", async(req, res)=> {
    const id = req.params.id;
    await ModeloProducto.findByIdAndRemove(id).exec();
    res.send("Deleted");
});

app.get("/read/:id", async (req, res) => {
    const id = req.params.id;
    ModeloProducto.findOne({_id:id},function(err,user){
        if(err){res.send(err);}
        if(user){
            res.send("True");
        }
        
        else{res.send("False");}
    })
});

app.post("/verificarNum", async (req, res) => {
    const telefono = req.body.telefono;
    ModeloUsuario.findOne({telefono:telefono},function(err,user){
        
        if(err){res.send(err);}
        if(user){
            res.send("True");
        }
        
        else{res.send("False");}
    })
  });

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



  app.post("/login", async (req, res) => {
    const telefono = req.body.telefono;
    const clave = req.body.clave;
    
    ModeloUsuario.findOne({telefono:telefono},function(err,user){
        
        if(err){res.send(err);}
        if(user){
            let compare = bcryptjs.compareSync(clave,user["clave"]);
            if(compare){res.send("True");}
            else{res.send("False");}
        }
        
        else{res.send("False");}
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