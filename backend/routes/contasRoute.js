const express = require('express');
const router = express.Router();
const {
    listarContas,
    criarConta,
    atualizarConta,
    deletarConta,
    obterConta, // Importando a nova função
} = require('../controllers/contasController');

// Rota para listar todas as Contas
router.get('/', listarContas);

// Rota para criar nova Conta
router.post('/', criarConta);

// Rota para obter uma Conta por ID
router.get('/:id', obterConta); // Nova rota para obter uma Conta

// Rota para atualizar uma Conta por ID
router.put('/:id', atualizarConta);

// Rota para deletar uma Conta por ID
router.delete('/:id', deletarConta);

module.exports = router;