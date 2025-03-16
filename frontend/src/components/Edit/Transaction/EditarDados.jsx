// src/components/Editar/index.jsx
import React from 'react';

const EditarDados = ({ atualizarDados, dado }) => (
  <button 
    className="btn btn-warning ms-2"
    onClick={() => console.log('Editar:', dado)}
  >
    Editar
  </button>
);

export default EditarDados;