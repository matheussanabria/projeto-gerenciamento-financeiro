const express = require('express');
const router = express.Router();
const {
    createRemetente,
    getRemetentes,
    getRemetenteById,
    updateRemetente,
    deleteRemetente
} = require('../controllers/remetentesControllers');

// Rotas para remetentes
router.post('/', createRemetente);
router.get('/', getRemetentes);
router.get('/:id', getRemetenteById);
router.put('/:id', updateRemetente);
router.delete('/:id', deleteRemetente);

module.exports = router;
