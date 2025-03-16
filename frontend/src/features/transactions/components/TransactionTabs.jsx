import React from 'react';
import { Button } from 'react-bootstrap';

export const TransactionTabs = ({ 
  categorias = [], // Adicionar valor padrão
  activeTab, 
  onTabChange,
  showForm,
  onToggleForm 
}) => (
  <div className="d-flex justify-content-between align-items-center mb-4">
    <div className="tabs">
      {categorias.map((categoria) => ( // Remover optional chaining desnecessário
        <button
          key={categoria.categoria_id}
          className={`btn btn-outline-primary me-2 ${
            activeTab === categoria.categoria_nome ? 'active' : ''
          }`}
          onClick={() => onTabChange(categoria.categoria_nome)}
        >
          {categoria.categoria_nome}
        </button>
      ))}
    </div>
    <Button 
      variant="primary" 
      onClick={onToggleForm}
      aria-label={showForm ? 'Cancelar adição' : 'Adicionar nova transação'}
    >
      {showForm ? 'Cancelar' : '+ Nova Transação'}
    </Button>
  </div>
);