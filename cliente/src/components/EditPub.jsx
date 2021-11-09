import React from "react";

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
          disabled={true}
          placeholder="Nuevo Tipo"
          name="tipo"
          value={editFormData.tipo}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Nueva Cantidad"
          name="cantidad"
          value={editFormData.cantidad}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Nuevo Precio"
          name="precio"
          value={editFormData.precio}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="date"
          required="required"
          placeholder="Nueva Fecha"
          name="ubicacion"
          value={editFormData.fecha}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Nueva Localizacion"
          name="localizacion"
          value={editFormData.localizacion}
          onChange={handleEditFormChange}
        ></input>
      </td>
      <td>
        <input
          type="text"
          required="required"
          placeholder="Nuevo Estado"
          name="estado"
          value={editFormData.estado}
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