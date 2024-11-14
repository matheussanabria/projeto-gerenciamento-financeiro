// routes/transacoes.js
const express = require('express');
const router = express.Router();
const {
    createTransacao,
    getTransacoes,
    getTransacaoById,
    updateTransacao,
    deleteTransacao
} = require('../controllers/transacoesController');

// Rotas para transações
router.post('/', createTransacao);
router.get('/', getTransacoes);
router.get('/:id', getTransacaoById);
router.put('/:id', updateTransacao);
router.delete('/:id', deleteTransacao);

module.exports = router;
