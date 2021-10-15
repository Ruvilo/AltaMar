import React, {useEffect, useState} from "react";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
import {Link} from "react-router-dom";

function MostrarP(){
    const [prod, setProd] = useState({ producto: []})
    const [guardaP, setGuardaP] = useState([{
        tipo:'',
        cantidad:'',
        precio:'',
        fecha:'',
        localizacion:'',
        estado:''
    }])

    useEffect(() => {
        const fetchPostList = async () => {
            const {data} = await axios("http://localhost:3001/read")
            setProd({producto: data})
        }
        fetchPostList()

    }, [setProd])

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
        <h1>55</h1>
        {/*<ReactBootstrap.Table responsive>
            <thead>
                <tr>
                <th>id</th>
                <th>Tel</th>
                <th>Tipo</th>
                <th>cantidad</th>
                <th>precio</th>
                <th>fecha</th>
                <th>localizacion</th>
                <th>estado</th>
                </tr>
            </thead>
            <tbody>
                {
                    prod.producto && prod.producto.map((item) => (
                        console.log(item.publicaciones),
                        <tr key={item._id}><Link to = "/">
                            <td>{item._id}</td></Link><td>{item.telefono}</td>
                        {item.publicaciones.map((sub) => (
                            <><td>{sub.tipo}</td><td>{sub.cantidad}</td><td>{sub.precio}</td><td>{sub.fecha}</td><td>{sub.localizacion}</td><td>{sub.estado}</td></>
                        ))}
                        
                            
                            
                            {/*{item.publicaciones.map((datos) => (
                                <td key={datos._id}>{datos.estado}</td> 
                            ))}}
                            
                        </tr>
                        
                    ))
                }
                
                
            </tbody>
            </ReactBootstrap.Table>*/}
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

export default MostrarP;