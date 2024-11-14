const express = require('express');
const router = express.Router();
const {
    createMetodoPagamento,
    getMetodosPagamento,
    getMetodoPagamentoById,
    updateMetodoPagamento,
    deleteMetodoPagamento
} = require('../controllers/metodosPagamentoController');

// Rotas para métodos de pagamento
router.post('/', createMetodoPagamento);
router.get('/', getMetodosPagamento);
router.get('/:id', getMetodoPagamentoById);
router.put('/:id', updateMetodoPagamento);
router.delete('/:id', deleteMetodoPagamento);

module.exports = router;
