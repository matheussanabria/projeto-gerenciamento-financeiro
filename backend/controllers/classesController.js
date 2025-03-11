const pool = require('../config/db');
const Joi = require('joi');


// Exemplo de schema corrigido:
const classeSchema = Joi.object({
    classe_nome: Joi.string().required(),
    classe_descricao: Joi.string().required(),
    classe_status: Joi.boolean().optional(), // Ou required() se necessário
    subcategoria_id: Joi.number().optional()// Ou required()
});

// Listar classes com paginação

// Listar classes com paginação
const listarClasses = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, subcategoria_id } = req.query;
        const offset = (page - 1) * limit;

        // Verifica se o subcategoria_id foi passado
        if (!subcategoria_id) {
            return res.status(400).json({ error: "subcategoria_id é obrigatório" });
        }

        const query = `
            SELECT 
                cl.classe_id, 
                cl.classe_nome,
                cl.classe_descricao,
                cl.subcategoria_id, 
                sc.subcategoria_nome 
            FROM classes cl
            JOIN subcategorias sc ON cl.subcategoria_id = sc.subcategoria_id
            WHERE cl.subcategoria_id = $1  -- Filtra apenas as classes dessa subcategoria
            LIMIT $2 OFFSET $3;
        `;

        const values = [subcategoria_id, limit, offset];

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};


// Obter uma classe por ID
const obterClasse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM classes WHERE id = $1`;
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

        const { classe_nome, classe_descricao, subcategoria_id } = req.body;
        // Back-end (criarClasse)
    const query = `
    INSERT INTO classes 
        (classe_nome, classe_descricao, subcategoria_id, classe_status) 
    VALUES ($1, $2, $3, true) 
    RETURNING *
    `; // Garanta que "classe_status" é incluído
        // const query = `INSERT INTO classes (classe_nome, classe_descricao, subcategoria_id) VALUES ($1, $2, $3) RETURNING *`;
        const result = await pool.query(query, [classe_nome, classe_descricao, subcategoria_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Atualizar classe
const atualizarClasse = async (req, res, next) => {
    try {
        console.log("Dados recebidos:", req.body); // 👈 LOG 1
        const { error } = classeSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { classe_nome, classe_descricao, classe_status, subcategoria_id } = req.body;
        const { id } = req.params;
        console.log("ID recebido:", id); // 👈 LOG 2
        const query = `UPDATE subclasses SET subclasse_nome = $1, subclasse_descricao = $2, classe_id = $3 WHERE subclasse_id = $4 RETURNING *`;
        const result = await pool.query(query, [classe_nome, classe_descricao, classe_status, subcategoria_id, id]);
        
        console.log("Resultado da query:", result.rows); // 👈 LOG 3
        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Classe não encontrada' });
        }

        res.status(200).json(result.rows[0]); // 👈 Forçar status 200
    } catch (err) {
        console.error("Erro no back-end:", err); // 👈 LOG 4
        next(err);
    }
};

// Deletar classe
const deletarClasse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `DELETE FROM classes WHERE classe_id = $1 RETURNING *`;
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
