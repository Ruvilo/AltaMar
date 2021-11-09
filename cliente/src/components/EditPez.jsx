import React from "react";

const EditPez = ({
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
          placeholder="Nueva ruta de la foto"
          name="foto"
          value={editFormData.foto}
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

export default EditPez;