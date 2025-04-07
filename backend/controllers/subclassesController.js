const pool = require('../config/db');
const Joi = require('joi');

// Validação com Joi
const subclasseSchema = Joi.object({
    subclasse_nome: Joi.string().min(3).required(),
    subclasse_descricao: Joi.string().optional(),
    subclasse_status: Joi.boolean().optional(),
    classe_id: Joi.number().integer().required()
});

const listarSubclasses = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const offset = (page - 1) * limit;
        const query = `
            SELECT * FROM subclasses
            LIMIT $1 OFFSET $2;

        `

        const values = [limit, offset];

        const result = await pool.query(query, values);

    //     const values = [subcategoria_id, limit, offset];

        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

// Listar subclasses com paginação
const listarSubclassesPaginacao = async (req, res, next) => {
    try {
        const { page = 1, limit = 10, classe_id } = req.query;
        const offset = (page - 1) * limit;

        // Verifica se o classe_id foi passado
        if (!classe_id) {
            return res.status(400).json({ error: "classe_id é obrigatório" });
        }
        const query = `
        SELECT 
            scl.subclasse_id, 
            scl.subclasse_nome,
            scl.subclasse_descricao,
            scl.classe_id, 
            cl.classe_nome 
        FROM subclasses scl
        JOIN classes cl ON scl.classe_id = cl.classe_id
        WHERE scl.classe_id = $1
        LIMIT $2 OFFSET $3;`


        // const query = `
        //       SELECT 
        //         scl.id,
        //         scl.subclasse_nome,
        //         scl.classe_id,
        //         cl.classe_nome AS classe_nome
        //     FROM 
        //         subclasses scl
        //     JOIN classes cl ON scl.classe_id = cl.id  -- Corrigido o JOIN
        //     LIMIT $1 OFFSET $2;
        // `;  

        const values = [classe_id, limit, offset];


        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        next(err);
    }
};

// Obter uma classe por ID
const obterSubclasse = async (req, res, next) => {
    try {
        const { id } = req.params;
        const query = `SELECT * FROM subclasses WHERE subclasse_id = $1`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Subclasse não encontrada' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Criar nova subclasse
const criarSubclasse = async (req, res, next) => {
    try {
        const { error } = subclasseSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { subclasse_nome, subclasse_descricao, classe_id } = req.body;

        const query = `
        INSERT INTO subclasses 
            (subclasse_nome, subclasse_descricao, classe_id, subclasse_status) 
        VALUES ($1, $2, $3, true) 
        RETURNING *`;
        const result = await pool.query(query, [subclasse_nome, subclasse_descricao, classe_id]);
        res.status(201).json(result.rows[0]);
    } catch (err) {
        next(err);
    }
};

// Atualizar subclasse
const atualizarSubclasse = async (req, res, next) => {
    try {
        console.log("Dados recebidos:", req.body); // 👈 LOG 1

        const { error } = subclasseSchema.validate(req.body);
        if (error) return res.status(400).json({ error: error.details[0].message });

        const { 
            subclasse_nome,
            subclasse_descricao,
            subclasse_status, 
            classe_id 
        } = req.body;
        const { id } = req.params;
        const query = `
        UPDATE subclasses 
        SET 
            subclasse_nome = $1, 
            subclasse_descricao = $2,
            subclasse_status = $3,
            classe_id = $4 
        WHERE subclasse_id = $5 
        RETURNING *`;        
        const result = await pool.query(query, [subclasse_nome, subclasse_descricao, subclasse_status, classe_id, id]);

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
        const query = `DELETE FROM subclasses WHERE subclasse_id = $1 RETURNING *`; //👈 Coluna corrigida        
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
    listarSubclassesPaginacao,
    obterSubclasse,
    criarSubclasse,
    atualizarSubclasse,
    deletarSubclasse,
};
