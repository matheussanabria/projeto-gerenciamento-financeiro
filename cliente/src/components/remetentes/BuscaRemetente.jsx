import React from 'react';

const BuscarRemetente = ({ filtro, setFiltro }) => {
  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Buscar por nome, CPF/CNPJ, Endereço ou telefone..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      
      <style jsx>{`
        .search-container {
          margin: 20px 20px 20px 0;
          width: 80%;
        }
        
        input {
          width: 100%;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 25px;
          font-size: 16px;
          box-sizing: border-box;
          transition: all 0.3s ease;
        }
        
        input:focus {
          outline: none;
          border-color: #4CAF50;
          box-shadow: 0 0 5px rgba(76,175,80,0.3);
        }
        
        @media (max-width: 768px) {
          .search-container {
            margin: 10px;
            width: 100%;

          }
          
          input {
            font-size: 14px;
            padding: 10px;
          }
        }
      `}</style>
    </div>
  );
};

export default BuscarRemetente;