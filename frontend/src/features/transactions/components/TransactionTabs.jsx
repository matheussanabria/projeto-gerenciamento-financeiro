// frontend/src/features/transactions/components/TransactionTabs.jsx
import React from 'react';
import { Button } from 'react-bootstrap';

export const TransactionTabs = ({
  categorias = [], // Adicionar valor padrão
  activeTab,
  onTabChange,
  showForm,
  onToggleForm,
}) => (
  <div className="d-flex justify-content-between align-items-center">
    <div className="tabs">
      {categorias.map((categoria) => (
        <button
          key={categoria.categoria_id}
          className={`btn btn-outline-primary me-2 ${
            activeTab === categoria.categoria_id ? 'active' : '' // <--- Change here
          }`}
          onClick={() => onTabChange(categoria.categoria_id)} // <--- Pass categoria_id instead of categoria_nome
        >
          {categoria.categoria_nome}
        </button>
      ))}
    </div>
    <Button
      className="btn-add"
      variant="primary"
      onClick={onToggleForm}
      aria-label={showForm ? 'Cancelar adição' : 'Adicionar nova transação'}
    >
      {showForm ? 'Cancelar' : '+ Nova Transação'}
    </Button>
  </div>
);