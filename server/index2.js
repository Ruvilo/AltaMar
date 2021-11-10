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
    if (telefono === '' || nombre === '' || clave === '' || cedula === '' || ubicacion === '') {
        res.send("Falta");
    }
    const usuario = new ModeloUsuario({ telefono: telefono, clave: clave, nombre: nombre, cedula: cedula, ubicacion: ubicacion, rol: rol, redesSociales: redesSociales });
    await usuario.save();
    res.send("Success");
});

const existe = (path) => {
    path = ".//" + path;
    console.log("--------" + path);
    const fs = require('fs');
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
            console.error(err);
            return 0;
        }
        return 1;
    });

}
app.get('/getImg/:nombre', async (req, res) => {

    const nombre = req.params.nombre;

    ModeloPez.findOne({ nombre: nombre }, (err, result) => {
        if (err) {
            res.sendFile("img/default.png", { root: __dirname });
        }
        else if (result) {
            console.log("#######" + result.foto)
            if (existe(result.foto)) {
                res.sendFile(result.foto, { root: __dirname });
            }
            else {
                res.sendFile("img/default.png", { root: __dirname });
            }
        }
        else {
            res.sendFile("img/default.png", { root: __dirname });

        }
    });
});



app.post("/InsertaFav", async (req, res) => {
    const telefono = req.body.telefono;
    const favorito = req.body.favorito; // object id de usuario
    ModeloUsuario.findOne({ telefono: telefono }, function (err, user) {

        if (err) { res.send(err); }
        if (user) {
            //console.log(telefono);    
            ModeloUsuario.findOneAndUpdate(
                { telefono: telefono },
                {
                    $push: {
                        favoritos: favorito
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
        else { res.send("ERROR"); }
    })
});


app.post("/InsertaFavProd", async (req, res) => {
    const telefono = req.body.telefono;
    const favorito = req.body.favorito; //obj id de publicacion 
    ModeloProducto.findOne({ telefono: telefono }, function (err, user) {

        if (err) { res.send(err); }
        if (user) {
            //console.log(telefono);    
            ModeloProducto.findOneAndUpdate(
                { telefono: telefono },
                {
                    $push: {
                        favoritos: favorito
                    }
                },
                function (error, success) {
                    // console.log(success);
                    if (error) {
                        res.send("False");
                    } else {
                        res.send("True");
                    }
                });

        }
        else { res.send("ERROR"); }
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
    const producto = new ModeloPez({ nombre: nombre, foto: foto });
    await producto.save()
    res.send("Success");
});

app.get("/readPeces", async (req, res) => {
    ModeloPez.find({}, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    });
});

app.get("/readTop", async (req, res) => {
    ModeloPez.find({}, { nombre: 1, _id: 0 }, { sort: { 'clicks': -1 }, limit: 3 }, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
            //console.log(result);
        }
    });
});

app.delete("/deletePez/:id", async (req, res) => {
    const id = req.params.id;
    ModeloPez.findByIdAndDelete(req.params.id).then(data => {
        if (!blog) {
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
                nombre: nombre,
                foto: foto,
            }
        }, function (error, productoUpdate) {
            if (error) { res.send("Failed") }
            else { res.send("Updated") }
        });

    res.send("Updated");
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
    const id = req.params.id;
    await ModeloProducto.findByIdAndRemove(id).exec();
    res.send("Deleted");
});



app.put("/updateEstado", async (req, res) => {
    const id = req.body.id;
    const estado = req.body.estado;
    await ModeloProducto.updateMany({ 'publicaciones._id': id },
        {
            $set:
            {
                'publicaciones.$.estado': estado
            }
        }, function (error, productoUpdate) {
            if (error) { res.send("False") }
            else { res.send("Updated") }
        });

    res.send("Updated");
});


app.post("/getMyProducts", async (req, res) => {
    const telefono = req.body.telefono;
    ModeloProducto.findOne({ telefono: telefono }, function (err, user) {

        if (err) { res.send(err); }
        if (user) {
            res.send(user);
        }

        else { res.send("False"); }
    })
});




app.post("/getFotoPez", async (req, res) => {
    const nombre = req.body.nombre;
    ModeloPez.findOne({ nombre: nombre }, function (err, user) {
        if (err) { res.send(err); }

        if (user) {
            res.send(user.foto);
        }

        else { res.send("False"); }
    })
});




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

app.post("/verificarProducto", async (req, res) => {
    const telefono = req.body.telefono;
    ModeloProducto.find({ telefono: telefono }, function (err, result) {
        if (err) {
            res.send(err);
        }
        else {
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
    const vendido = req.body.vendido;
    await ModeloProducto.updateMany({ 'publicaciones._id': id },
        {
            $set:
            {
                'publicaciones.$.tipo': tipo,
                'publicaciones.$.cantidad': cantidad,
                'publicaciones.$.precio': precio,
                'publicaciones.$.fecha': fecha,
                'publicaciones.$.localizacion': localizacion,
                'publicaciones.$.vendido': vendido
            }
        }, function (error, productoUpdate) {
            if (error) { res.send("Failed") }
            else { res.send("Updated") }
        });

    res.send("Updated");
});

app.post("/getFavProd/", async (req, res) => {
    const telefono = req.body.telefono;
    const id = req.body.id;
    var dict = {};
    ModeloProducto.findOne({ telefono: telefono }, { favoritos: 1, _id: 0 }, function (err, user) {

        if (err) { res.send(err); }
        if (user) {
            let c = user["favoritos"];
            let x = c.indexOf(id) != -1;
            res.send(x);

        }

        else { res.send("False"); }
    })
});


app.delete("/deleteFav", async (req, res) => {/*{
    ModeloProducto.findOne({ telefono: telefono }, function (err, user) {

        if (err) { res.send(err); }
        if (user) {
            let compare = bcryptjs.compareSync(clave, user["clave"]);
            if (compare) { res.send("True"); }
            else { res.send("False"); }
        }

        else { res.send("False"); }
    })*/
    const telefono = req.body.telefono;
    const favorito = req.body.favorito;

    ModeloProducto.updateOne({ telefono: req.body.telefono },
        {
            $pull: { 'favoritos': favorito }
        }, function (error, prod) {
            if (error) { res.send("Failed") }
            else { res.send("Deleted") }
        });
});



app.get("/getRecomendados/:len", async (req, res) => {
    const len = parseInt(req.params.len, 10);
    ModeloProducto.aggregate([{ $unwind: "$publicaciones" }, { $match: { "publicaciones.estado": "activo" } }, { $sample: { size: len } }, { "$project": { "__v": 0, "_id": 0, "telefono": 0, "favoritos": 0 } }],
        function (error, result) {
            //console.log(result);
            if (error) { res.send("error") }
            if (result.length) { res.send(result) }
            else { res.send("empty") }


        })
});




app.get("/getPublicacion/:id", async (req, res) => {

    try {
        const ObjectId = mongoose.Types.ObjectId;
        ModeloProducto.aggregate([
            { $unwind: "$publicaciones" }, { $match: { "publicaciones._id": ObjectId(req.params.id) } }
        ],
            function (error, result) {
                try {
                    if (error) { res.send("error") }
                    if (result != []) { res.send(result[0].publicaciones) }
                    else { res.send("empty") }
                } catch (err) {
                    res.send("False");
                }
            })
    } catch (err) {
        res.send("False");
    }

});






app.get("/getFav/:telefono", async (req, res) => {
    const telefono = req.params.telefono;
    ModeloUsuario.findOne({ telefono: telefono }, { favoritos: 1, _id: 0 }, function (err, user) {

        if (err) { res.send(err); }
        if (user) {

            ModeloUsuario.find({ "_id": { $in: user.favoritos } }, { nombre: 1, telefono: 1, _id: 0 }, function (err, user) {

                if (err) { res.send(err); }
                if (user) {
                    //console.log(user);
                    res.send(user);
                }

                else { res.send("False"); }
            }).sort({ nombre: 1 })


        }

        else { res.send("False"); }
    })
});


app.get("/getFavP/:telefono", async (req, res) => {
    const telefono = req.params.telefono;
    ModeloProducto.findOne({ telefono: telefono }, { favoritos: 1, _id: 0 }, function (err, user) {

        if (err) { res.send(err); }
        if (user) {

            if (err) { res.send(err); }
            if (user) {

                //console.log(user);
                res.send(user);
            }

            else { res.send("False"); }


        }

        else { res.send("False"); }
    })
});



app.get("/getVendedorP/:id", async (req, res) => {
    ModeloProducto.findOne({ "publicaciones._id": req.params.id }, { nombre: 1, telefono: 1, "publicaciones._id": 1 }, function (err, user) {
        const cel=user.telefono;
        //console.log(user.telefono)
        ModeloUsuario.findOne({ telefono: cel }, function (err, user) {
            if (err) { res.send(err); }
            if (user) {
                
                //console.log(user);
                res.send(user.nombre);
            }

            else { res.send("False"); }



                    });
 })});


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

app.listen(3001, () => {
    console.log("Conectado");
});