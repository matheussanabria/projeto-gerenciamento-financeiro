const express = require('express');
const router = express.Router();
const {
    createRemetente,
    getRemetentes,
    getRemetenteByRemetente_Id,
    updateRemetente,
    deleteRemetente
} = require('../controllers/remetentesController');

// Rotas para remetentes
router.post('/', createRemetente);
router.get('/', getRemetentes);
router.get('/:id', getRemetenteByRemetente_Id);
router.put('/:id', updateRemetente);
router.delete('/:id', deleteRemetente);

module.exports = router;