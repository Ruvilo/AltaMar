import React from "react";

const ReadUser = ({ user, handleEditClick, handleDeleteClick}) => {// handleEditClick, handleDeleteClick }) => {
  return (
    <tr key={user._id}>
      <td>{user.nombre}</td>
      <td>{user.clave}</td>
      <td>{user.cedula}</td>
      <td>{user.ubicacion}</td>
      <td>{user.rol}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, user)}
        >
          Editar
        </button>
        <button type="button" 
        onClick={() => handleDeleteClick(user._id)}
        >
          Borrar
        </button>
      </td>
    </tr>
  );
};

export default ReadUser;