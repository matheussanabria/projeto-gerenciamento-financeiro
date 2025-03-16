import React from 'react';
import { Form } from 'react-bootstrap';

export const FormFields = ({ 
  lookups, 
  formData, 
  handleChange 
}) => (
  <>
    {/* Campos Obrigatórios */}
    <Form.Group className="mb-3" controlId="transacao_descricao">
      <Form.Label>Descrição *</Form.Label>
      <Form.Control
        type="text"
        name="transacao_descricao"
        value={formData.transacao_descricao}
        onChange={handleChange}
        required
      />
    </Form.Group>

    <Form.Group className="mb-3" controlId="transacao_valor">
      <Form.Label>Valor *</Form.Label>
      <Form.Control
        type="number"
        step="0.01"
        name="transacao_valor"
        value={formData.transacao_valor}
        onChange={handleChange}
        required
      />
    </Form.Group>

    {/* Campos de Seleção */}
    <Form.Group className="mb-3" controlId="transacao_remetente_id">
      <Form.Label>Remetente</Form.Label>
      <Form.Select
        name="transacao_remetente_id"
        value={formData.transacao_remetente_id}
        onChange={handleChange}
      >
        <option value="">Selecione o remetente</option>
        {lookups.remetentes?.map(remetente => (
          <option 
            key={remetente.remetente_id} 
            value={remetente.remetente_nome}
          >
            {remetente.remetente_nome}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="transacao_metodo_pagamento">
      <Form.Label>Método de Pagamento</Form.Label>
      <Form.Select
        name="transacao_metodo_pagamento"
        value={formData.transacao_metodo_pagamento_id}
        onChange={handleChange}
      >
        <option value="">Selecione o método</option>
        {lookups.metodosPagamento?.map(metodo => (
          <option 
            key={metodo.metodo_pagamento_id} 
            value={metodo.metodo_pagamento_descricao}
          >
            {metodo.metodo_pagamento_descricao}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="transacao_forma_parcelamento_id">
      <Form.Label>Parcelamento</Form.Label>
      <Form.Select
        name="transacao_forma_parcelamento_id"
        value={formData.transacao_forma_parcelamento_id}
        onChange={handleChange}
      >
        <option value="">Selecione o parcelamento</option>
        {lookups.formasParcelamento?.map(parcela => (
          <option 
            key={parcela.forma_parcelamento_id} 
            value={parcela.forma_parcelamento_numero_parcelas}
          >
            {parcela.forma_parcelamento_numero_parcelas} parcelas
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="transacao_conta_id">
      <Form.Label>Conta</Form.Label>
      <Form.Select
        name="transacao_conta_id"
        value={formData.transacao_conta_id}
        onChange={handleChange}
      >
        <option value="">Selecione a conta</option>
        {lookups.contas?.map(conta => (
          <option 
            key={conta.conta_id} 
            value={conta.conta_nome}
          >
            {conta.conta_nome}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="transacao_categoria_id">
      <Form.Label>Categoria</Form.Label>
      <Form.Select
        name="transacao_categoria_id"
        value={formData.transacao_categoria_id}
        onChange={handleChange}
      >
        <option value="">Selecione a categoria</option>
        {lookups.categorias?.map(categoria => (
          <option 
            key={categoria.categoria_id} 
            value={categoria.categoria_nome}
          >
            {categoria.categoria_nome}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="transacao_subcategoria_id">
      <Form.Label>Subcategoria</Form.Label>
      <Form.Select
        name="transacao_subcategoria_id"
        value={formData.transacao_subcategoria_id}
        onChange={handleChange}
      >
        <option value="">Selecione a subcategoria</option>
        {lookups.subcategorias?.map(sub => (
          <option 
            key={sub.subcategoria_id} 
            value={sub.subcategoria_nome}
          >
            {sub.subcategoria_nome}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="transacao_classe_id">
      <Form.Label>Classe</Form.Label>
      <Form.Select
        name="transacao_classe_id"
        value={formData.transacao_classe_id}
        onChange={handleChange}
      >
        <option value="">Selecione a classe</option>
        {lookups.classes?.map(classe => (
          <option 
            key={classe.classe_id} 
            value={classe.classe_nome}
          >
            {classe.classe_nome}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="transacao_subclasse_id">
      <Form.Label>Subclasse</Form.Label>
      <Form.Select
        name="transacao_subclasse_id"
        value={formData.transacao_subclasse_id}
        onChange={handleChange}
      >
        <option value="">Selecione a subclasse</option>
        {lookups.subclasses?.map(subclasse => (
          <option 
            key={subclasse.subclasse_id} 
            value={subclasse.subclasse_nome}
          >
            {subclasse.subclasse_nome}
          </option>
        ))}
      </Form.Select>
    </Form.Group>

    <Form.Group className="mb-3" controlId="transacao_data_lancamento">
      <Form.Label>Data</Form.Label>
      <Form.Control
        type="date"
        name="transacao_data_lancamento"
        value={formData.transacao_data_lancamento}
        onChange={handleChange}
      />
    </Form.Group>
  </>
);