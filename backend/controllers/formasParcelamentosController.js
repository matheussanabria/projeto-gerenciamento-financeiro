const db = require('../config/db');

// Criar um novo método de pagamento
exports.createFormaParcelamento = async (req, res) => {
    const { metodo_pagamento_id, numero_parcelas, descricao_parcelas, taxa_juros } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO formas_parcelamento (forma_parcelamento_metodo_pagamento_id, forma_parcelamento_numero_parcelas, forma_parcelamento_descricao_parcelas, forma_parcelamento_taxa_juros) VALUES ($1, $2, $3) RETURNING *',
            [metodo_pagamento_id, numero_parcelas, descricao_parcelas, taxa_juros]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter todos os métodos de pagamento
exports.getFormaParcelamentos = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM formas_parcelamento ORDER BY forma_parcelamento_id DESC;');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter um método de pagamento pelo ID
exports.getFormaParcelamentoById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM formas_parcelamento WHERE forma_parcelamento_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de parcelamento não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualizar um método de pagamento
exports.updateFormaParcelamento = async (req, res) => {
    const { id } = req.params;
    const { metodo_pagamento_id, numero_parcelas, descricao_parcelas, taxa_juros } = req.body;
    try {
        const result = await db.query(
            'UPDATE forma_parcelamento SET forma_parcelamento_metodo_pagamento_id = $1, forma_parcelamento_numero_parcelas = $2, forma_parcelamento_descricao_parcelas = $3, forma_parcelamento_taxa_de_juros = $4 WHERE forma_parcelamento_id = $5 RETURNING *',
            [metodo_pagamento_id, numero_parcelas, descricao_parcelas, taxa_juros, id]
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
exports.deleteFormaParcelamento = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM formas_parcelamento WHERE forma_parcelamento_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Método de parcelamento não encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
