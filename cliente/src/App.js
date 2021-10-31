import React from 'react';
import './App.css';
import { useState, useEffect } from "react"; 
import Axios from "axios";

function App() {
  const [tel, setTel] = useState("");
  const [tipo, setTipo] = useState("");
  const [cantidad, setCantidad] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [fecha, setFecha] = useState("");
  const [localizacion, setLocalizacion] = useState("");
  const [estado, setEstado] = useState("");
  const [listOfProd, setListOfProd] = useState([]);
  //const [listOfCar, setListOfCar] = useState([]); 
  const addProd = () =>{
    Axios.post("http://localhost:3001/insertaProducto", {
      tel: tel,
      tipo: tipo, 
      cantidad: cantidad,
      precio: precio,
      fecha: fecha,
      localizacion: localizacion,
      estado: estado,
    }).then((response) => {
      const publicaciones = {tipo : tipo, cantidad: cantidad, precio: precio, fecha: fecha, localizacion: localizacion, estado: estado};
      setListOfProd([...listOfProd, {_id: response.data._id, tel, publicaciones}]);
      //setListOfCar(...listOfCar, {publicaciones});
    });
  };

  const updateProd = (id) => {
    const newTel = prompt("Nuevo telefono: ");
    Axios.put("http://localhost:3001/update", {newTel: newTel, id: id}).then(()=> {
      // setListOfProd(listOfProd.map((val)=> {
      //   return val._id === id ? {_id: id, telefono: val.telefono, publicaciones: val.publicaciones} : val;
      // }))

    })

  };

  const deleteProd = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=> {
      setListOfProd(listOfProd.filter((val)=> {
        return val._id !== id;
      }));
    });

  };
  useEffect(() => {
    Axios.get("http://localhost:3001/read"
    ).then((response)=>{
      setListOfProd(response.data);
      //setListOfCar(response.data.publicaciones);
    }).catch(()=> {
      console.log("ERROR");
    });

  }, []);
  return (
    <div className="App">
      <div className="inputs">
        Ingresar Producto
        <input
         type="number" 
         placeholder="Telefono"
         onChange={(event)=>{setTel(event.target.value)}}
        />
        <input 
          type="text" 
          placeholder="Tipo de Pescado"
          onChange={(event)=>{setTipo(event.target.value)}}
        />
        <input
         type="number" 
         placeholder="Cantidad"
         onChange={(event)=>{setCantidad(event.target.value)}}
        />
        <input 
          type="number" 
          placeholder="Precio"
          onChange={(event)=>{setPrecio(event.target.value)}}
        />
        <input
         type="date" 
         placeholder="Fecha"
         onChange={(event)=>{setFecha(event.target.value)}}
        />
        <input
         type="text" 
         placeholder="Localizacion"
         onChange={(event)=>{setLocalizacion(event.target.value)}}
        />
        <input
         type="text" 
         placeholder="Estado"
         onChange={(event)=>{setEstado(event.target.value)}}
        />
        <button onClick={addProd}>Add Data</button>
        
      </div>
        <div className="consultarP">
          {listOfProd.map((val)=>{
            return (
            <div>
              
              <h3><div>Telefono: {val.telefono}</div></h3>
              {/* <div>
                {listOfCar.map((datos)=> {
                return (
                  <div> Tipo: {datos.tipo} 
                  <div>Estado: {datos.estado}</div>
                  </div>)})};
              </div>  */}
              <button id="removeBtn" onClick={() => {deleteProd(val._id)}}>Delete</button>
              <button onClick={() => {updateProd(val._id)}}>Update</button>
            </div>
            
            );
          })}
      </div>
    </div>
  );
}

export default App;
