import React, {Fragment, useEffect, useState} from "react";
import axios from "axios";
import * as ReactBootstrap from "react-bootstrap";
import ReadUser from "./ReadUser";
import EditUser from "./EditUser";

function MostrarU(){
    const [user, setUser] = useState([])

    const [addFormData, setAddFormData] = useState({
        nombre: "",
        telefono: "",
        clave:"",
        cedula:"",
        ubicacion:"",
        rol:"",
        whatsapp:"",
        telegram:"",
        simpe:"",
      });
    
    const [editFormData, setEditFormData] = useState({
        nombre: "",
        clave:"",
        cedula:"",
        ubicacion:"",
        rol:"",
      });
    
      const [editUserId, setEditUserId] = useState("");
      const [editUserTel, setEditUserTel] = useState("");
    
      const AgregarP = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/crearUsuario", {
              nombre: addFormData.nombre,
              telefono: addFormData.telefono,
              clave:addFormData.clave,
              cedula:addFormData.cedula,
              ubicacion:addFormData.ubicacion,
              rol:addFormData.rol,
              whatsapp:addFormData.whatsapp,
              telegram:addFormData.telegram,
              simpe:addFormData.simpe
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
        console.log(editUserId);
        axios.put("http://localhost:3001/editarUsuario", {
              telefono : editUserTel,
              nombre: editFormData.nombre,
              clave:editFormData.clave,
              cedula:editFormData.cedula,
              ubicacion:editFormData.ubicacion,
              rol:editFormData.rol,
            }).then((response) => {
                console.log(response)
        });
        window.location.reload();
      };
    
      const handleEditClick = (event, user) => {
        event.preventDefault();
        setEditUserId(user._id);   
        setEditUserTel(user.telefono);
        const formValues = {
          nombre: user.nombre,
          clave:user.clave,
          cedula:user.cedula,
          ubicacion:user.ubicacion,
          rol:user.rol,
        };
    
        setEditFormData(formValues);
      };

      const handleDeleteClick = (userId) => {
          console.log(userId);
        axios.delete(`http://localhost:3001/deleteUser/${userId}`).then((response) => {
                console.log(response)
        });
          window.location.reload();
        
      };

      const handleCancelClick = () => {
        setEditUserId("");
      };

    useEffect(() => {
        const fetchPostList = async () => {
            const {data} = await axios("http://localhost:3001/readUser")
            setUser(data)
        }
        fetchPostList()

    }, [setUser])

    return <div className='container'>
        <form onSubmit={handleEditFormSubmit}>
        <ReactBootstrap.Table responsive>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Clave Encriptada</th>
                    <th>Cedula</th>
                    <th>Ubicacion</th>
                    <th>Rol</th>
                </tr>
            </thead>
            <tbody>
                {
                    user.map((item) => (
                        <Fragment key={item._id}>
                            { editUserId === item._id ?
                                (<EditUser editFormData={editFormData} 
                                    handleEditFormChange={handleEditFormChange}
                                    handleCancelClick={handleCancelClick}/>):
                                (<ReadUser user={item} 
                                    handleEditClick={handleEditClick}
                                    handleDeleteClick={handleDeleteClick}/>)
                            }
                            
                        </Fragment>
                        
                        
                    ))
                }
                
                
            </tbody>
            </ReactBootstrap.Table>
            </form>
            <h2>Agregar Usuario</h2>
                <form onSubmit={AgregarP}>
                    <input
                    type="text"
                    name="telefono"
                    required="required"
                    placeholder="# de telefono"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="clave"
                    required="required"
                    placeholder="Clave"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="nombre"
                    required="required"
                    placeholder="Nombre"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="cedula"
                    required="required"
                    placeholder="Cedula"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="ubicacion"
                    required="required"
                    placeholder="Ubicacion"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="rol"
                    required="required"
                    placeholder="Introduzca el Rol"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="whatsapp"
                    required="required"
                    placeholder="Whatsapp (Si tiene)"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="telegram"
                    required="required"
                    placeholder="Telegram (Si tiene)"
                    onChange={handleAddFormChange}
                    />
                    <input
                    type="text"
                    name="simpe"
                    required="required"
                    placeholder="Sinpe (Si tiene)"
                    onChange={handleAddFormChange}
                    />
                    <button type="submit">Add</button>
                </form>
    </div>
}

export default MostrarU;