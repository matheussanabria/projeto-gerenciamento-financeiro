const express = require('express');
const router = express.Router();
const {
    createParcelamento,
    getParcelamentos,
    getParcelamentoById,
    updateParcelamento,
    deleteParcelamento
} = require('../controllers/parcelamentosController');

// Rotas para métodos de pagamento
router.post('/', createParcelamento);
router.get('/', getParcelamentos);
router.get('/:id', getParcelamentoById);
router.put('/:id', updateParcelamento);
router.delete('/:id', deleteParcelamento);

module.exports = router;
