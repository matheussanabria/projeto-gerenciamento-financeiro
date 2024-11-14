const pool = require('../utils/db');
const Joi = require('joi');

// Validação com Joi
const categoriaSchema = Joi.object({
    nome: Joi.string().min(3).required(),
    descricao: Joi.string().optional(),
});

// Listar categorias com paginação
const listarCategorias = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const query = `SELECT * FROM categorias LIMIT $1 OFFSET $2`;
        const result = await pool.query(query, [limit, offset]);
        res.json(result.rows);
    } catch (err) {
        next(err); // Passa o erro para o middleware de erro
    }
};

// Obter uma categoria por ID
const obterCategoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM categorias WHERE id = $1`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};


// Criar nova categoria
const criarCategoria = async (req, res, next) => {
    try {
        const { error } = categoriaSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome } = req.body;
        const query = `INSERT INTO categorias (nome) VALUES ($1) RETURNING *`;
        const result = await pool.query(query, [nome]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Atualizar categoria
const atualizarCategoria = async (req, res, next) => {
    try {
        const { error } = categoriaSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { nome } = req.body;
        const { id } = req.params;
        const query = `UPDATE categorias SET nome = $1 WHERE id = $2 RETURNING *`;
        const result = await pool.query(query, [nome, id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Deletar categoria
const deletarCategoria = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM categorias WHERE id = $1 RETURNING *`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Categoria não encontrada' });
        }

        res.json({ message: 'Categoria deletada com sucesso' });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listarCategorias,
    criarCategoria,
    atualizarCategoria,
    deletarCategoria,
    obterCategoria, // Adicionando a nova função aqui
};
