import React from "react";

const ReadPub = ({ pub, handleEditClick, handleDeleteClick}) => {// handleEditClick, handleDeleteClick }) => {
  return (
    <tr key={pub.nombre}>
      <td>{pub.tipo}</td>
      <td>{pub.cantidad}</td>
      <td>{pub.precio}</td>
      <td>{pub.fecha}</td>
      <td>{pub.localizacion}</td>
      <td>{pub.estado}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, pub)}
        >
          Edit
        </button>
        <button type="button" 
        onClick={() => handleDeleteClick(pub._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadPub;