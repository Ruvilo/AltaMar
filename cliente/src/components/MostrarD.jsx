import React, {useEffect, useState} from "react";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
import {Link} from "react-router-dom";

function MostrarD(){
    const [guardaP, setGuardaP] = useState([{
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




    return <div className='container'>
        <ReactBootstrap.Table responsive>
            <thead>
                <tr>
                <th>id</th>
                <th>Tel</th>
                <th>Opciones</th>

                </tr>
            </thead>
            <tbody>
                {
                    guardaP.map((item) => (
                        
                        <tr key={item._id}>
                            <td>{item._id}</td>
                            <td>{item.telefono}</td>
                            <td>
                                <Link to = '/MostrarPub' state={{id:item._id}}><button onClick={() => {console.log(item._id)}}>Ver Productos</button></Link>
                            </td>
                        </tr>
                        
                    ))
                }
                
                
            </tbody>
        </ReactBootstrap.Table>
        
    </div>
}

export default MostrarD;