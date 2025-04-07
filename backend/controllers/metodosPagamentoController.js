//javascript backend/controllers/metodosPagamentoController.js
const db = require('../config/db');

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message });
};

// CRUD operations
exports.createMetodoPagamento = async (req, res) => {
  try {
    const { forma_pagamento_id, bandeira_id, metodo_pagamento_descricao, metodo_pagamento_ativo, permite_parcelamento } = req.body;
    const result = await db.query(
      `INSERT INTO metodos_pagamento (
        forma_pagamento_id,
        bandeira_id,
        metodo_pagamento_descricao,
        metodo_pagamento_ativo,
        permite_parcelamento,
        metodo_pagamento_created_at
      ) VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP) 
      RETURNING *`,
      [
        forma_pagamento_id,
        bandeira_id,
        metodo_pagamento_descricao,
        metodo_pagamento_ativo,
        permite_parcelamento
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    return errorHandler(err, req, res);
  }
};

exports.getMetodosPagamento = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM metodos_pagamento');
    res.status(200).json(result.rows);
  } catch (err) {
    return errorHandler(err, req, res);
  }
};

exports.getMetodoPagamentoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM metodos_pagamento WHERE metodo_pagamento_id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Método não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    return errorHandler(err, req, res);
  }
};

exports.updateMetodoPagamento = async (req, res) => {
  const { id } = req.params;
  const { forma_pagamento_id, bandeira_id, metodo_pagamento_descricao, metodo_pagamento_ativo, permite_parcelamento } = req.body;
  try {
    const result = await db.query(
      `UPDATE metodos_pagamento SET
        forma_pagamento_id = $1,
        bandeira_id = $2,
        metodo_pagamento_descricao = $3,
        metodo_pagamento_ativo = $4,
        permite_parcelamento = $5
      WHERE metodo_pagamento_id = $6
      RETURNING *`,
      [
        forma_pagamento_id,
        bandeira_id,
        metodo_pagamento_descricao,
        metodo_pagamento_ativo,
        permite_parcelamento,
        id
      ]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Método não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    return errorHandler(err, req, res);
  }
};

exports.deleteMetodoPagamento = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'DELETE FROM metodos_pagamento WHERE metodo_pagamento_id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Método não encontrado' });
    }
    res.status(204).send();
  } catch (err) {
    return errorHandler(err, req, res);
  }
};

// View-related logic
exports.getViewMetodosPagamento = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM view_metodos_pagamento');
    res.status(200).json(result.rows);
  } catch (err) {
    return errorHandler(err, req, res);
  }
};

exports.getViewMetodoPagamentoById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'SELECT * FROM view_metodos_pagamento WHERE metodo_pagamento_id = $1',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Método não encontrado' });
    }
    res.status(200).json(result.rows[0]);
  } catch (err) {
    return errorHandler(err, req, res);
  }
};