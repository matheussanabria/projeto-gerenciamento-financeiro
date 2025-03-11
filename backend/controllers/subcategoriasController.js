const pool = require('../config/db');
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
        const query = 
        // `
        // SELECT s.subcategoria_id, s.subcategoria_subcategoria_nome, c.categoria_nome 
        // FROM subcategorias s 
        // JOIN categorias c ON s.categoria_id = c.categoria_id;
        // `
        `SELECT * FROM subcategorias`
        ;
        const result = await pool.query(query);

        // const query = `SELECT 
        //         sc.id AS subcategoria_id,
        //         sc.subcategoria_subcategoria_nome,
        //         sc.categoria_id,
        //         c.categoria_nome AS categoria_nome
        //     FROM 
        //         subcategorias sc
        //     JOIN categorias c ON sc.categoria_id = c.id
        //     LIMIT $1 OFFSET $2;`;  // Corrigido o JOIN

        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};


// Obter uma categoria por subcategoria_id
const obterSubcategoria = async (req, res, next) => {
    try {
        const { subcategoria_id } = req.params;
        const query = `SELECT * FROM subcategorias WHERE subcategoria_id = $1`;
        const result = await pool.query(query, [subcategoria_id]);

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

        const { subcategoria_nome, categoria_id } = req.body;
        const query = `INSERT INTO subcategorias (subcategoria_nome, categoria_id) VALUES ($1, $2) RETURNING *`;
        const result = await pool.query(query, [subcategoria_nome, categoria_id]);
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

        const { subcategoria_nome, categoria_id } = req.body;
        const { subcategoria_id } = req.params;
        const query = `UPDATE subcategorias SET subcategoria_nome = $1, categoria_id = $2 WHERE subcategoria_id = $3 RETURNING *`;
        const result = await pool.query(query, [subcategoria_nome, categoria_id, subcategoria_id]);

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
        const { subcategoria_id } = req.params;
        const query = `DELETE FROM subcategorias WHERE subcategoria_id = $1 RETURNING *`;
        const result = await pool.query(query, [subcategoria_id]);

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
