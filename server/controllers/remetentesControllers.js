const db = require('../utils/db');

// Criar um novo remetente
exports.createRemetente = async (req, res) => {
    const { nome, cpf_cnpj, endereco, telefone } = req.body;
    try {
        const result = await db.query(
            'INSERT INTO remetentes (nome, cpf_cnpj, endereco, telefone) VALUES ($1, $2, $3, $4) RETURNING *',
            [nome, cpf_cnpj, endereco, telefone]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
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

// Obter um remetente pelo ID
exports.getRemetenteById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query('SELECT * FROM remetentes WHERE id = $1', [id]);
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
    const { nome, cpf_cnpj, endereco, telefone } = req.body;
    try {
        const result = await db.query(
            'UPDATE remetentes SET nome = $1, cpf_cnpj = $2, endereco = $3, telefone = $4 WHERE id = $5 RETURNING *',
            [nome, cpf_cnpj, endereco, telefone, id]
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
        const result = await db.query('DELETE FROM remetentes WHERE id = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Remetente não encontrado' });
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
