import React from "react";

const ReadPez = ({ peces, handleEditClick, handleDeleteClick}) => {// handleEditClick, handleDeleteClick }) => {
  return (
    <tr key={peces.nombre}>
      <td>{peces.nombre}</td>
      <td>{peces.foto}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, peces)}
        >
          Edit
        </button>
        <button type="button" 
        onClick={() => handleDeleteClick(peces._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadPez;