// controllers/transacoesController.js
const db = require('../utils/db');

// Criar uma nova transação
exports.createTransacao = async (req, res) => {
    const { 
        transacao_descricao, 
        transacao_valor, 
        transacao_metodo_pagamento_nome, 
        transacao_data, 
        transacao_categoria_nome, 
        transacao_subcategoria_nome, 
        transacao_classe_nome, 
        transacao_subclasse_nome, 
        transacao_remetente_nome, 
        transacao_remetente_cpf_cnpj, 
        transacao_remetente_endereco, 
        transacao_remetente_telefone 
    } = req.body;

    try {
        await db.query(
            `SELECT inserir_transacao($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)`,
            [
                transacao_descricao, 
                transacao_valor, 
                transacao_metodo_pagamento_nome, 
                transacao_data, 
                transacao_categoria_nome, 
                transacao_subcategoria_nome, 
                transacao_classe_nome, 
                transacao_subclasse_nome, 
                transacao_remetente_nome, 
                transacao_remetente_cpf_cnpj, 
                transacao_remetente_endereco, 
                transacao_remetente_telefone
            ]
        );
        res.status(201).json({ message: 'Transação inserida com sucesso!' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Obter todas as transações
exports.getTransacoes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM transacoes ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter uma transação pelo ID
exports.getTransacaoById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('SELECT * FROM transacoes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualizar uma transação
exports.updateTransacao = async (req, res) => {
    const { id } = req.params;
    const { transacao_descricao, transacao_valor, transacao_data } = req.body;

    try {
        const result = await db.query(
            'UPDATE transacoes SET transacao_descricao = $1, transacao_valor = $2, transacao_data = $3 WHERE id = $4 RETURNING *',
            [transacao_descricao, transacao_valor, transacao_data, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }

        res.status(200).json({ message: 'Transação atualizada com sucesso!', transacao: result.rows[0] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Excluir uma transação
exports.deleteTransacao = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query('DELETE FROM transacoes WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Transação não encontrada' });
        }

        res.status(200).json({ message: 'Transação excluída com sucesso!' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
