const pool = require('../utils/db');
const Joi = require('joi');

// Validação com Joi
const classeSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    subcategoria_id: Joi.number().integer().required()
});

// Listar classes com paginação
const listarClasses = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM classes LIMIT $1 OFFSET $2`;
        const result = await pool.query(query, [limit, offset]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

// Obter uma classe por ID
const obterClasse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM classes WHERE classe_id = $1`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Classe não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Criar nova classe
const criarClasse = async (req, res, next) => {
    try {
        const { error } = classeSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome, subcategoria_id } = req.body;
        const query = `INSERT INTO classes (nome, subcategoria_id) VALUES ($1, $2) RETURNING *`;
        const result = await pool.query(query, [nome, subcategoria_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Atualizar classe
const atualizarClasse = async (req, res, next) => {
    try {
        const { error } = classeSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome, subcategoria_id } = req.body;
        const { id } = req.params;
        const query = `UPDATE classes SET nome = $1, subcategoria_id = $3 WHERE id = $4 RETURNING *`;
        const result = await pool.query(query, [nome, subcategoria_id, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Classe não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Deletar classe
const deletarClasse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM classes WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Classe não encontrada' });
        }

        res.json({ message: 'Classe deletada com sucesso' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listarClasses,
    obterClasse,
    criarClasse,
    atualizarClasse,
    deletarClasse,
};
