import React, {useState} from "react";

const EditUser = ({
  editFormData,
  handleEditFormChange,
  handleCancelClick,
}) => {
  
  return (
    <tr>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Nuevo nombre"
          name="nombre"
          value={editFormData.nombre}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Nueva clave"
          name="clave"
          value={editFormData.clave}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Nueva cedula"
          name="cedula"
          value={editFormData.cedula}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Nueva ubicacion"
          name="ubicacion"
          value={editFormData.ubicacion}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Nuevo rol"
          name="rol"
          value={editFormData.rol}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <button type="submit">Guardar</button>
        <button type="button" onClick={handleCancelClick}>
          Cancelar
        </button>
      </td>
    </tr>
  );
};

export default EditUser;