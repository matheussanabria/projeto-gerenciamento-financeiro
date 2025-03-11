const db = require('../config/db');

// Criar um novo remetente
exports.createRemetente = async (req, res) => {
    const { remetente_nome, remetente_cpf_cnpj, remetente_endereco, remetente_telefone, remetente_email, remetente_senha_hash } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO remetentes (remetente_nome, remetente_cpf_cnpj, remetente_endereco, remetente_telefone, remetente_email, remetente_senha_hash) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [remetente_nome, remetente_cpf_cnpj, remetente_endereco, remetente_telefone, remetente_email, remetente_senha_hash]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.buscarRemetentePorEmail = async (remetente_email) => {
    const query = "SELECT * FROM remetentes WHERE remetente_email = $1";
    const { rows } = await pool.query(query, [remetente_email]);
    return rows[0];
  };

// Obter todos os remetentes
exports.getRemetentes = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM remetentes');
        res.status(200).json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Obter um remetente pelo remetente_ID
exports.getRemetenteByRemetente_Id = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM remetentes WHERE remetente_id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Remetente não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Atualizar um remetente
exports.updateRemetente = async (req, res) => {
    const { id } = req.params;
    const { remetente_nome, remetente_cpf_cnpj, remetente_endereco, remetente_telefone } = req.body;
    try {
        const result = await db.query(
            'UPDATE remetentes SET remetente_nome = $1, remetente_cpf_cnpj = $2, remetente_endereco = $3, remetente_telefone = $4 WHERE remetente_id = $5 RETURNING *',
            [remetente_nome, remetente_cpf_cnpj, remetente_endereco, remetente_telefone, id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Remetente não encontrado' });
        }
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};  

// Deletar um remetente
exports.deleteRemetente = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('DELETE FROM remetentes WHERE remetente_id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Remetente não encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
