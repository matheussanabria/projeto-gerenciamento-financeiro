const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createRemetente, buscarRemetentePorEmail } = require("../models/remetenteModel");

const registrar = async (req, res) => {
  const { remetente_nome, remetente_email, remetetente_senha_hash } = req.body;
  try {
    const remetenteExistente = await buscarRemetentePorEmail(remetente_email);
    if (remetenteExistente) return res.status(400).json({ erro: "E-mail já cadastrado" });

    const senhaHash = await bcrypt.hash(remetetente_senha_hash, 10);
    const novoRemetente = await createRemetente(remetente_nome, remetente_email, senhaHash);

    res.status(201).json(novoRemetente);
  } catch (erro) {
    res.status(500).json({ erro: "Erro ao registrar usuário" });
  }
};

const login = async (req, res) => {
  const { remetente_email, senha } = req.body;
  try {
    const remetente = await buscarRemetentePorEmail(remetente_email);
    if (!remetente) return res.status(400).json({ erro: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, remetente.remetente_senha_hash);
    if (!senhaValida) return res.status(400).json({ erro: "Senha incorreta" });

    const token = jwt.sign({ id: remetente.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token });
  } catch (erro) {
    res.status(500).json({ erro: "Erro no login" });
  }
};

module.exports = { registrar, login };
