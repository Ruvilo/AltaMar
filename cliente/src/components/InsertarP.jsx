import React, { useState } from "react";
import axios from "axios";

function InsertarP(){
    const [input, setInput] = useState({
        telefono:'',
        tipo:'',
        cantidad:'',
        precio:'',
        fecha:'',
        localizacion:'',
        estado:''
    })

    function handleChange(event){
        const {name, value} = event.target;

        setInput( prevInput => {
            return {
                ...prevInput,
                [name]: value
            }
        })
    }

    function handleClick(event){
        event.preventDefault();
        const newProd = {
            telefono: input.telefono,
            tipo: input.tipo,
            cantidad: input.cantidad,
            precio: input.precio,
            fecha: input.fecha,
            localizacion: input.localizacion,
            estado: input.estado
        }
        axios.post("http://localhost:3001/insertaProducto", newProd)
        console.log(newProd);
    }
    return <div className='container'>
        <h1>Insertar Datos</h1>
        <form>
        <div className="form-group">
                <label for="telefono">Telefono</label>
                <input onChange={handleChange} type="tel" name="telefono" value={input.telefono} class="form-control" id="telefono" placeholder="# de Telefono"></input>
            </div>
            <div className="form-group">
                <label for="tipo">Tipo de Pescado</label>
                <input onChange={handleChange} type="tipo" name="tipo" value={input.tipo} class="form-control" id="tipo" placeholder="Tipo de Pescado"></input>
            </div>
            <div class="form-group">
                <label for="cantidad">Cantidad de pescados a la venta</label>
                <input onChange={handleChange} type="cantidad" name="cantidad" value={input.cantidad} class="form-control" id="cantidad" placeholder="# de Pescados"></input>
            </div>
            <div className="form-group">
                <label for="Precio">Precio del Producto</label>
                <input onChange={handleChange} type="precio" name="precio" value={input.precio} class="form-control" id="precio" placeholder="Precio en Colones"></input>
            </div>
            <div className="form-group">
                <label for="Fecha">Fecha</label>
                <input onChange={handleChange} type="date" name="fecha" value={input.fecha} class="form-control" id="fecha"></input>
            </div>
            <div class="form-group">
                <label for="localizacion">Localizacion</label>
                <input onChange={handleChange} type="local" name="localizacion" value={input.localizacion} class="form-control" id="localizacion" placeholder="Ubicacion del vendedor"></input>
            </div>
            <div className="form-group">
                <label for="estado">Estado del Producto</label>
                <input onChange={handleChange} type="estado" name="estado" value={input.estado} class="form-control" id="estado" placeholder="Activo o Inactivo"></input>
            </div>
            <button  onClick={handleClick}>Submit</button>
        </form>
    </div>
}

export default InsertarP;
