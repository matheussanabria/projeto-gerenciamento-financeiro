// Componente Criar Remetentes
import React, { useState } from 'react';

const CriarRemetenteModal = ({ onClose, onCreate }) => {
  // Adicione este log
  // console.log('Modal de criação renderizado');

  const [formData, setFormData] = useState({
    remetente_nome: '',
    remetente_cpf_cnpj: '',
    remetente_tipo: '',
    remetente_endereco: '',
    remetente_telefone: ''
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Remover formatação antes de enviar para o backend
    const remetenteData = {
      remetente_nome: formData.remetente_nome,
      remetente_cpf_cnpj: formData.remetente_cpf_cnpj.replace(/\D/g, ''), // Remove pontos e traços
      remetente_tipo: formData.remetente_tipo,
      remetente_endereco: formData.remetente_endereco,
      remetente_telefone: formData.remetente_telefone.replace(/\D/g, ''), // Remove formatação do telefone
    };
  
    try {
      const response = await fetch('http://localhost:5001/remetentes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(remetenteData),
      });
  
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao criar remetente: ${errorText}`);
      }
  
      onCreate();
      onClose();
    } catch (error) {
      console.error('Erro ao criar remetente:', error);
      alert(`Erro ao criar remetente: ${error.message}`);
    }
  };
  

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const formatarDocumento = (doc) => {
    if (!doc) return '';
    return doc.length === 11 ? 
      doc.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4') : 
      doc.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Novo Remetente</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              name="remetente_nome"
              value={formData.remetente_nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>CPF/CNPJ:</label>
            <input
              type="text"
              name="remetente_cpf_cnpj"
              value={formatarDocumento(formData.remetente_cpf_cnpj)}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Tipo:</label>
            <input
              type="text"
              name="remetente_tipo"
              value={formData.remetente_tipo}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Endereço:</label>
            <textarea
              name="remetente_endereco"
              value={formData.remetente_endereco}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Telefone:</label>
            <input
              type="text"
              name="remetente_telefone"
              value={formData.remetente_telefone?.replace(
                /(\d{2})(\d{4,5})(\d{4})/,
                '($1) $2-$3')}
              onChange={handleChange}
            />
          </div>

          <div className="modal-buttons">
            {/* Adicione um botão de teste */}
            <button 
                type="button"
                className="cancel-btn" 
                onClick={() => {
                console.log('Fechando pelo botão interno');
                onClose();
                }}
            >
              Cancelar
            </button>
            <button type="submit" className="save-btn">
              Criar
            </button>
          </div>
        </form>
        <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .modal {
             position: relative;
              background: white;
              padding: 2rem;
              border-radius: 8px;
              height: auto;
              width: 90%;
              max-width: 500px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
              display: block;
        }
.form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          box-sizing: border-box;
        }

        .modal-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          margin-top: 1rem;
        }
        .save-btn {
          background-color: #4CAF50;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .cancel-btn {
          background-color: #f44336;
          color: white;
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        .save-btn:hover,
        .cancel-btn:hover {
          opacity: 0.9;
        }
        `}</style>
      </div>
    </div>
  );
};

export default CriarRemetenteModal;