const express = require('express');
const router = express.Router();
const subclassesController = require('../controllers/subclassesController');

// Listar subclasses com paginação
router.get('/', subclassesController.listarSubclasses);

// Inserir nova subclasse
router.post('/', subclassesController.criarSubclasse);

// Atualizar subclasse
router.put('/:id', subclassesController.atualizarSubclasse);

// Deletar subclasse
router.delete('/:id', subclassesController.deletarSubclasse);

module.exports = router;
