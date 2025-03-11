const pool = require('../config/db');
const Joi = require('joi');

// Validação com Joi
const contasSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().optional(),
});

// Listar contas com paginação
const listarContas = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM contas LIMIT $1 OFFSET $2`;
        const result = await pool.query(query, [limit, offset]);
        res.json(result.rows);
    } catch (err) {
        next(err); // Passa o erro para o middleware de erro
    }
};

// Obter uma conta por ID
const obterConta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM contas WHERE id = $1`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'conta não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};


// Criar nova conta
const criarConta = async (req, res, next) => {
    try {
        const { error } = contasSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome } = req.body;
        const query = `INSERT INTO contas (nome) VALUES ($1) RETURNING *`;
        const result = await pool.query(query, [nome]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Atualizar conta
const atualizarConta = async (req, res, next) => {
    try {
        const { error } = contasSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome } = req.body;
        const { id } = req.params;
        const query = `UPDATE contas SET nome = $1 WHERE id = $2 RETURNING *`;
        const result = await pool.query(query, [nome, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'conta não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Deletar conta
const deletarConta = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM contas WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'conta não encontrada' });
        }

        res.json({ message: 'conta deletada com sucesso' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listarContas,
    criarConta,
    atualizarConta,
    deletarConta,
    obterConta, // Adicionando a nova função aqui
};
