import React, {useEffect, useState} from "react";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
import {Link} from "react-router-dom";

function MostrarD(){
    const [prod, setProd] = useState({ producto: []})
    const [guardaP, setGuardaP] = useState([{
        telefono:'',
        publicaciones: [{
            tipo:'',
            cantidad:'',
            precio:'',
            fecha:'',
            localizacion:'',
            estado:''
        }]
        
    }])

    useEffect(() => {
        const fetchPostList = async () => {
            const {data} = await axios("http://localhost:3001/read")
            setGuardaP(data)
        }
        fetchPostList()

    }, [setGuardaP])

    {/*useEffect(() => {
        axios.get("http://localhost:3001/read"
        ).then((response)=>{
          setProd(response.data);
          console.log(prod.publicaciones);
        }).catch(()=> {
          console.log("ERROR");
        });
    
      }, []);*/}

      const renderProd = (producto) => {
          return(
              <tr key="index">
                  <th></th>
              </tr>
          )
      }


    return <div className='container'>
        <ReactBootstrap.Table responsive>
            <thead>
                <tr>
                <th>id</th>
                <th>Tel</th>
                <th>Opciones</th>
                <th>cantidad</th>
                <th>precio</th>
                <th>fecha</th>
                <th>localizacion</th>
                <th>estado</th>
                </tr>
            </thead>
            <tbody>
                {
                    guardaP.map((item) => (
                        console.log(item.publicaciones),
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.telefono}</td>
                            <td>
                                <Link to = "/MostrarP"><button onClick={() => {console.log(item._id)}}>Ver Productos</button></Link>
                            </td>
                        {item.publicaciones.map((sub) => (
                            <><td>{sub.tipo}</td><td>{sub.cantidad}</td><td>{sub.precio}</td><td>{sub.fecha}</td><td>{sub.localizacion}</td><td>{sub.estado}</td></>
                        ))}
                        
                            
                            
                            {/*{item.publicaciones.map((datos) => (
                                <td key={datos._id}>{datos.estado}</td> 
                            ))}*/}
                            
                        </tr>
                        
                    ))
                }
                
                
            </tbody>
        </ReactBootstrap.Table>
        {/*<h1>Datos</h1>*/}
        {/*<ReactBootstrap.Table striped bordered hover>
            <thead>
                <tr>
                    <th>Tel</th>
                    <th>Tipo</th>
                </tr>
            </thead>
            <tbody>
                {prod.map(mostrarDatos)}

            </tbody>
        </ReactBootstrap.Table>*/}
        
    </div>
}

export default MostrarD;