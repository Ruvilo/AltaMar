
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
  const addTel = () =>{
    Axios.post("http://localhost:3001/insert", {
      tel: tel,
      tipo: tipo, 
      cantidad: cantidad,
      precio: precio,
      fecha: fecha,
      localizacion: localizacion,
      estado: estado,
    });
  };

//tipo
//cantidad
//precio
//fecha
//localizacion
//estado

  useEffect(() => {
    Axios.get("http://localhost:3001/read"
    ).then((response)=>{
      setListOfProd(response.data);
      //console.log(response);
    }).catch(()=> {
      console.log("ERROR");
    });

  }, [])
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
        <button onClick={addTel}>Add Data</button>
      </div>
    </div>
  );
}

export default App;
