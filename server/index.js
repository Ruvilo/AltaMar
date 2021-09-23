const express = require("express");
const app = express();
const mongoose = require("mongoose");
const ModeloProducto = require("./models/producto.js");

mongoose.connect(
    "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000",
    {useNewUrlParser: true}
);

app.get("/insert", async (req, res) => {
    const producto = new ModeloProducto({telefono : "83388498"});
    await producto.save()
    res.send("Inserted data");
});

app.listen (3001, () => {
    console.log("You are connected!");
});