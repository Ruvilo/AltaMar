import React, {useEffect, useState, Fragment} from "react";
import { useParams } from 'react-router-dom'
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
import ReadPub from "./ReadPub";
import EditPub from "./EditPub";
function MostrarPub(){
  const id = useParams()
  console.log(id.id)
    const [prod, setProd] = useState([])
    const [addFormData, setAddFormData] = useState({
        tipo:"",
        cantidad:"",
        precio:"",
        fecha:"",
        localizacion:"",
        estado:"",
      });
    
    const [editFormData, setEditFormData] = useState({
        tipo:"",
        cantidad:"",
        precio:"",
        fecha:"",
        localizacion:"",
        estado:"",
      });
    
      const [editPubId, setEditPubId] = useState("");
    
      const AgregarPub = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/insertaProducto", {
              telefono:id.telefono,
              tipo: addFormData.tipo,
              cantidad:addFormData.cantidad,
              precio:addFormData.precio,
              fecha:addFormData.fecha,
              localizacion:addFormData.localizacion,
              estado:addFormData.estado
            }).then((response) => {
                console.log(response)
            });
            window.location.reload();
      };
    
      const handleEditFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;
    
        setEditFormData(newFormData);
      };
    
      const handleAddFormChange = (event) => {
        event.preventDefault();
    
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
    
        const newFormData = { ...addFormData };
        newFormData[fieldName] = fieldValue;
    
        setAddFormData(newFormData);
    
      };
    
      const handleEditFormSubmit = (event) => {
        event.preventDefault();
        console.log(editPubId);
        axios.put("http://localhost:3001/editarProducto", {
              id : editPubId,
              tipo: editFormData.tipo,
              cantidad:editFormData.cantidad,
              precio:editFormData.precio,
              fecha:editFormData.fecha,
              localizacion:editFormData.localizacion,
              estado:editFormData.estado,
            }).then((response) => {
                console.log(response)
        });
        window.location.reload();
      };
    
      const handleEditClick = (event, pub) => {
        event.preventDefault();
        setEditPubId(pub._id);   
        const formValues = {
          tipo: pub.tipo,
          cantidad:pub.cantidad,
          precio:pub.precio,
          fecha:pub.fecha,
          localizacion:pub.localizacion,
          estado:pub.estado,
        };
    
        setEditFormData(formValues);
      };

      const handleDeleteClick = (pubId) => {
          console.log(pubId);
        axios.delete(`http://localhost:3001/delete/${pubId}`).then((response) => {
                console.log(response)
        });
          window.location.reload();
        
      };

      const handleCancelClick = () => {
        setEditPubId("");
      };

      useEffect(() => {
        fetchPublicaciones();
        return () => {
        }
    }, [])
    const fetchPublicaciones = () => {
        const api = "http://localhost:3001/read/"+id.id;
        fetch(api)
            .then((response) => response.json())
            .then((responseJson) => {
                let iterableResponse = Object.values(responseJson)
                //iterableResponse.map(item => console.log(item));
                setProd(iterableResponse);
            }).catch((error) => {
                console.log(error);
            });
    }
    

    return <div className='container'>
        <form onSubmit={handleEditFormSubmit}>
        <ReactBootstrap.Table responsive>
            <thead>
                <tr>
                    <th>Tipo</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Fecha</th>
                    <th>Localizacion</th>
                    <th>Estado</th>
                </tr>
            </thead>
            <tbody>
            {
                    prod.map(order => order.map( item =>
                        <Fragment key={item._id}>
                            { editPubId === item._id ?
                                (<EditPub editFormData={editFormData} 
                                    handleEditFormChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}/>):
                                (<ReadPub pub={item} 
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick}/>)
                            }
                            
                        </Fragment>
                    ))
            }
            </tbody>
            {/*lista()*/}
        </ReactBootstrap.Table>
        </form>
        <h2>Agregar Publicacion al Usuario</h2>
                <form onSubmit={AgregarPub}>
                    <input
                    type="text"
                    name="tipo"
                    required="required"
                    placeholder="Tipo de pez"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="cantidad"
                    required="required"
                    placeholder="Cantidad de peces"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="precio"
                    required="required"
                    placeholder="Precio del producto"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="date"
                    name="fecha"
                    required="required"
                    placeholder="Fecha"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="localizacion"
                    required="required"
                    placeholder="Localizacion del producto"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="estado"
                    required="required"
                    placeholder="Estado (Activo o Vendido)"
                    onChange={handleAddFormChange}
                    />
                    
                    <button type="submit">Add</button>
                </form>
    </div>
}

export default MostrarPub;