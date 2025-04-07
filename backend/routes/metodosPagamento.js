const express = require('express');
const router = express.Router();
const {
    createMetodoPagamento,
    getMetodosPagamento,
    getMetodoPagamentoById,
    updateMetodoPagamento,
    deleteMetodoPagamento,
    getViewMetodosPagamento,       // Novos imports
    getViewMetodoPagamentoById     // para a view
} = require('../controllers/metodosPagamentoController');

// Rotas CRUD padrão
router.post('/', createMetodoPagamento);
router.get('/', getMetodosPagamento);
router.get('/view', getViewMetodosPagamento);        // GET /metodos-pagamento/view
router.get('/view/:id', getViewMetodoPagamentoById); // GET /metodos-pagamento/view/1

router.get('/:id', getMetodoPagamentoById);
router.put('/:id', updateMetodoPagamento);
router.delete('/:id', deleteMetodoPagamento);

// Novas rotas para a view
// Rotas

module.exports = router;