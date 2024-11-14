const pool = require('../utils/db');
const Joi = require('joi');

// Validação com Joi
const subclasseSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().optional(),
    classe_id: Joi.number().integer().required(),
});

// Listar subclasses com paginação
const listarSubclasses = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM subclasses LIMIT $1 OFFSET $2`;
        const result = await pool.query(query, [limit, offset]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

// Criar nova subclasse
const criarSubclasse = async (req, res, next) => {
    try {
        const { error } = subclasseSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome, classe_id } = req.body;
        const query = `INSERT INTO subclasses (nome, classe_id) VALUES ($1, $2) RETURNING *`;
        const result = await pool.query(query, [nome, classe_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Atualizar subclasse
const atualizarSubclasse = async (req, res, next) => {
    try {
        const { error } = subclasseSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome, classe_id } = req.body;
        const { id } = req.params;
        const query = `UPDATE subclasses SET nome = $1, classe_id = $2 WHERE id = $3 RETURNING *`;
        const result = await pool.query(query, [nome, classe_id, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Subclasse não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Deletar subclasse
const deletarSubclasse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM subclasses WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Subclasse não encontrada' });
        }

        res.json({ message: 'Subclasse deletada com sucesso' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listarSubclasses,
    criarSubclasse,
    atualizarSubclasse,
    deletarSubclasse,
};
