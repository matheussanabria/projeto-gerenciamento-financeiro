const express = require('express');
const router = express.Router();
const {
    createFormaPagamento,
    getFormasPagamento,
    getFormaPagamentoById,
    updateFormaPagamento,
    deleteFormaPagamento
} = require('../controllers/formasPagamentoController');

// Rotas para métodos de pagamento
router.post('/', createFormaPagamento);
router.get('/', getFormasPagamento);
router.get('/:id', getFormaPagamentoById);
router.put('/:id', updateFormaPagamento);
router.delete('/:id', deleteFormaPagamento);

module.exports = router;
