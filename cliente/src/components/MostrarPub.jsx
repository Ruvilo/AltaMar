import React, {useEffect, useState} from "react";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
import { useLocation } from "react-router-dom";




function MostrarPub(){
    const [prod, setProd] = useState([])
    const location = useLocation()
    //const {id} = location.state 
    const [guardaP, setGuardaP] = useState({
        
            tipo:'',
            cantidad:'',
            precio:'',
            fecha:'',
            localizacion:'',
            estado:''
        
    })

    useEffect(() => {
        
        const fetchPostList = async () => {
            try {
                const {data} = await axios("http://localhost:3001/read/614eb0b2ee93e629974bb7aa")
                setGuardaP(data)
                //setProd(data)
                console.log(prod)
            } catch (error) {
                
            }
            
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


    return <div className='container'>
        <ReactBootstrap.Table responsive>
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>cantidad</th>
                    <th>precio</th>
                    <th>fecha</th>
                    <th>localizacion</th>
                    <th>estado</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>lll</td>
                {/*
                    prod.map((item) => (
                        //console.log(item.publicaciones),
                        <tr key={item._id}>
                            <td>{item.tipo}</td>
                            <td>{item.cantidad}</td>
                            
                        {item.publicaciones.map((sub) => (
                            <><td>{sub.tipo}</td><td>{sub.cantidad}</td><td>{sub.precio}</td><td>{sub.fecha}</td><td>{sub.localizacion}</td><td>{sub.estado}</td></>
                        ))}
                        
                            
                            
                            {/*{item.publicaciones.map((datos) => (
                                <td key={datos._id}>{datos.estado}</td> 
                            ))}*/}
                            
                        </tr>
                        
                    ))
                
                
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

export default MostrarPub;