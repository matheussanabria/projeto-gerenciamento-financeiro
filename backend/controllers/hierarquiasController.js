const pool = require('../config/db');

const listarHierarquias = async (req, res, next) => {
    try {
        const query = `
            SELECT 
                c.categoria_id, c.categoria_nome,
                s.subcategoria_id, s.subcategoria_nome,
                cl.classe_id, cl.classe_nome,
                scl.subclasse_id, scl.subclasse_nome
            FROM categorias c
            LEFT JOIN transacao_subcategoria s ON s.categoria_id = c.categoria_id
            LEFT JOIN transacao_classe cl ON cl.subcategoria_id = s.subcategoria_id
            LEFT JOIN transacao_subclasse scl ON scl.classe_id = cl.classe_id
            ORDER BY c.categoria_nome, s.subcategoria_nome, cl.classe_nome, scl.subclasse_nome;
        `;

        const result = await pool.query(query);

        const hierarquia = {};

        result.rows.forEach(row => {
            if (!hierarquia[row.categoria_id]) {
                hierarquia[row.categoria_id] = {
                    id: row.categoria_id,
                    nome: row.categoria_nome,
                    subcategorias: {},
                };
            }
            if (row.subcategoria_id && !hierarquia[row.categoria_id].subcategorias[row.subcategoria_id]) {
                hierarquia[row.categoria_id].subcategorias[row.subcategoria_id] = {
                    id: row.subcategoria_id,
                    nome: row.subcategoria_nome,
                    classes: {},
                };
            }
            if (row.classe_id && !hierarquia[row.categoria_id].subcategorias[row.subcategoria_id].classes[row.classe_id]) {
                hierarquia[row.categoria_id].subcategorias[row.subcategoria_id].classes[row.classe_id] = {
                    id: row.classe_id,
                    nome: row.classe_nome,
                    subclasses: {},
                };
            }
            if (row.subclasse_id) {
                hierarquia[row.categoria_id].subcategorias[row.subcategoria_id].classes[row.classe_id].subclasses[row.subclasse_id] = {
                    id: row.subclasse_id,
                    nome: row.subclasse_nome,
                };
            }
        });

        res.json(Object.values(hierarquia));
    } catch (err) {
        next(err);
    }
};

module.exports = {
    listarHierarquias,
};
