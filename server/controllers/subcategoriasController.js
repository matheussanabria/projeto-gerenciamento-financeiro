const pool = require('../utils/db');
const Joi = require('joi');

// Validação com Joi
const subcategoriaSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().optional(),
    categoria_id: Joi.number().integer().required(),
});

// Listar subcategorias com paginação
const listarSubcategorias = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM subcategorias LIMIT $1 OFFSET $2`;
        const result = await pool.query(query, [limit, offset]);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

// Obter uma categoria por ID
const obterSubcategoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM subcategorias WHERE id = $1`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Subcategorias não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Criar nova subcategoria
const criarSubcategoria = async (req, res, next) => {
    try {
        const { error } = subcategoriaSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome, categoria_id } = req.body;
        const query = `INSERT INTO subcategorias (nome, categoria_id) VALUES ($1, $2) RETURNING *`;
        const result = await pool.query(query, [nome, categoria_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Atualizar subcategoria
const atualizarSubcategoria = async (req, res, next) => {
    try {
        const { error } = subcategoriaSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome, categoria_id } = req.body;
        const { id } = req.params;
        const query = `UPDATE subcategorias SET nome = $1, categoria_id = $2 WHERE id = $3 RETURNING *`;
        const result = await pool.query(query, [nome, categoria_id, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Subcategoria não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Deletar subcategoria
const deletarSubcategoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM subcategorias WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Subcategoria não encontrada' });
        }

        res.json({ message: 'Subcategoria deletada com sucesso' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listarSubcategorias,
    obterSubcategoria,
    criarSubcategoria,
    atualizarSubcategoria,
    deletarSubcategoria,
};
