const express = require('express');
const router = express.Router();
const {
    createFormaParcelamento,
    getFormaParcelamentos,
    getFormaParcelamentoById,
    updateFormaParcelamento,
    deleteFormaParcelamento
} = require('../controllers/formasParcelamentosController');

// Rotas para métodos de pagamento
router.post('/', createFormaParcelamento);
router.get('/', getFormaParcelamentos);
router.get('/:id', getFormaParcelamentoById);
router.put('/:id', updateFormaParcelamento);
router.delete('/:id', deleteFormaParcelamento);

module.exports = router;
