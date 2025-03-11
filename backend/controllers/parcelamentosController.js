const db = require('../config/db');

// Criar um novo método de pagamento
exports.createParcelamento = async (req, res) => {
    const { metodo_pagamento_id, numero_parcelas, taxa_juros } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO parcelamento (metodo_pagamento_id, numero_parcelas, taxa_juros) VALUES ($1, $2, $3) RETURNING *',
            [metodo_pagamento_id, numero_parcelas, taxa_juros]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter todos os métodos de pagamento
exports.getParcelamentos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM parcelamentos');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter um método de pagamento pelo ID
exports.getParcelamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM parcelamentos WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de parcelamento não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualizar um método de pagamento
exports.updateParcelamento = async (req, res) => {
    const { id } = req.params;
    const { metodo_pagamento_id, numero_parcelas, taxa_juros } = req.body;
    try {
        const result = await db.query(
            'UPDATE parcelamento SET metodo_pagamento_id = $1, numero_parcelas = $2, taxa_de_juros = $3 WHERE id = $4 RETURNING *',
            [metodo_pagamento_id, numero_parcelas, taxa_juros, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de parcelamento não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Deletar um método de pagamento
exports.deleteParcelamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM parcelamentos WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de parcelamento não encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
