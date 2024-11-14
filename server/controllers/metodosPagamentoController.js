const db = require('../utils/db');

// Criar um novo método de pagamento
exports.createMetodoPagamento = async (req, res) => {
    const { nome, descricao } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO metodos_pagamento (nome, descricao) VALUES ($1, $2) RETURNING *',
            [nome, descricao]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter todos os métodos de pagamento
exports.getMetodosPagamento = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM metodos_pagamento');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter um método de pagamento pelo ID
exports.getMetodoPagamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM metodos_pagamento WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de pagamento não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualizar um método de pagamento
exports.updateMetodoPagamento = async (req, res) => {
    const { id } = req.params;
    const { nome, descricao } = req.body;
    try {
        const result = await db.query(
            'UPDATE metodos_pagamento SET nome = $1, descricao = $2 WHERE id = $3 RETURNING *',
            [nome, descricao, id]
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
exports.deleteMetodoPagamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM metodos_pagamento WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de pagamento não encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
