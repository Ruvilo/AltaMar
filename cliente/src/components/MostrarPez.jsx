import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
import ReadPez from "./ReadPez";
import EditPez from "./EditPez";

function MostrarPez(){
    const [peces, setPeces] = useState([])

    const [addFormData, setAddFormData] = useState({
        nombre: "",
        foto: "",
      });
    
    const [editFormData, setEditFormData] = useState({
        nombre: "",
        foto: "",
      });
    
      const [editPezId, setEditPezId] = useState("");
    
      const AgregarP = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/insertaPez", {
            nombre: addFormData.nombre,
            foto: addFormData.foto,
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
        console.log(editPezId);
        axios.put("http://localhost:3001/editarPez", {
            id : editPezId,
            nombre: editFormData.nombre,
            foto: editFormData.foto,
            }).then((response) => {
                console.log(response)
        });
        window.location.reload();

      };
    
      const handleEditClick = (event, peces) => {
        event.preventDefault();
        setEditPezId(peces._id);   
        const formValues = {
          nombre: peces.nombre,
          foto: peces.foto,
        };
    
        setEditFormData(formValues);
      };

      const handleDeleteClick = (pezId) => {
          console.log(pezId);
        axios.delete(`http://localhost:3001/deletePez/${pezId}`).then((response) => {
                console.log(response)
        });
          window.location.reload();
        
      };

      const handleCancelClick = () => {
        setEditPezId("");
      };

    useEffect(() => {
        const fetchPostList = async () => {
            const {data} = await axios("http://localhost:3001/readPeces")
            setPeces(data)
        }
        fetchPostList()

    }, [setPeces])

    return <div className='container'>
        <form onSubmit={handleEditFormSubmit}>
        <ReactBootstrap.Table responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Ruta de la Imagen</th>
                </tr>
            </thead>
            <tbody>
                {
                    peces.map((item) => (
                        <Fragment key={item._id}>
                            { editPezId === item._id ?
                                (<EditPez editFormData={editFormData} 
                                    handleEditFormChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}/>):
                                (<ReadPez peces={item} 
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick}/>)
                            }
                            
                        </Fragment>
                        
                        
                    ))
                }
                
                
            </tbody>
            </ReactBootstrap.Table>
            </form>
            <h2>Agregar Pescado</h2>
                <form onSubmit={AgregarP}>
                    <input
                    type="text"
                    name="nombre"
                    required="required"
                    placeholder="Nombre del Pez"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="foto"
                    required="required"
                    placeholder="Ruta de la imagen"
                    onChange={handleAddFormChange}
                    />
                    <button type="submit">Add</button>
                </form>
    </div>
}

export default MostrarPez;