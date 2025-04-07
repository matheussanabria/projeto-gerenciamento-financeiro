// frontend/src/features/transactions/components/TransactionForm/index.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Adicionei Form aqui
import { FormFields } from './FormFields';

export const TransactionForm = ({ 
  currentCategory, // <--- Add this prop
  show, 
  onHide, 
  lookups, 
  onSubmit

}) => {
  console.log('Inicio lógica TransactionForm')
  console.log('Current category:', currentCategory);

  const [formData, setFormData] = useState({
    transacao_descricao: '',
    transacao_valor: '',
    transacao_remetente_id: null,
    transacao_metodo_pagamento_id: null,
    transacao_forma_parcelamento_id: null,
    transacao_conta_id: null,
    transacao_categoria_id: currentCategory?.categoria_id || null,
    transacao_subcategoria_id: null,
    transacao_classe_id: null,
    transacao_subclasse_id: null,
    transacao_data_lancamento: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.transacao_descricao || !formData.transacao_valor) {
      alert('Preencha os campos obrigatórios!');
      return;
    }
    
    
    onSubmit({
      ...formData,
      transacao_valor: parseFloat(formData.transacao_valor) // Converter para número
    });
  };

  // Resetar o estado quando a categoria mudar
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      transacao_categoria_id: currentCategory?.categoria_id || null
    }));
  }, [currentCategory]);

  console.log('Fim lógica TransactionForm')
  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Nova Transação</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormFields 
            lookups={lookups} 
            formData={formData} 
            currentCategory={currentCategory}
            handleChange={(e) => setFormData(prev => ({
              ...prev,
              [e.target.name]: e.target.value
            }))} 
          />
          <div className="d-flex justify-content-end mt-4 gap-2">
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit">
              Salvar Transação
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};