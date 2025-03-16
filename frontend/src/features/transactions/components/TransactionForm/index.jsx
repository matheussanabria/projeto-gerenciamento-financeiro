import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Adicionei Form aqui
import { FormFields } from './FormFields';

export const TransactionForm = ({ 
  show, 
  onHide, 
  lookups, 
  onSubmit 
}) => {
  const [formData, setFormData] = useState({
    transacao_descricao: '',
    transacao_valor: '',
    transacao_remetente_id: '',
    transacao_metodo_pagamento_id: '',
    transacao_forma_parcelamento_id: '',
    transacao_conta_id: '',
    transacao_categoria_id: '',
    transacao_subcategoria_id: '',
    transacao_classe_id: '',
    transacao_subclasse_id: '',
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