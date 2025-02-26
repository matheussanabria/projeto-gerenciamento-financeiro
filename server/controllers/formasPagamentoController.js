const db = require('../utils/db');

// Criar um novo método de pagamento
exports.createFormaPagamento = async (req, res) => {
    const { nome } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO formas_pagamento (nome) VALUES ($1) RETURNING *',
            [nome]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter todos os métodos de pagamento
exports.getFormasPagamento = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM formas_pagamento');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter um método de pagamento pelo ID
exports.getFormaPagamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM formas_pagamento WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de pagamento não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualizar um método de pagamento
exports.updateFormaPagamento = async (req, res) => {
    const { id } = req.params;
    const { nome } = req.body;
    try {
        const result = await db.query(
            'UPDATE formas_pagamento SET nome = $1 WHERE id = $2  RETURNING *',
            [nome, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de pagamento não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Deletar um método de pagamento
exports.deleteFormaPagamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM formas_pagamento WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de pagamento não encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
