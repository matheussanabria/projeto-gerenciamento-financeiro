const express = require('express');
const router = express.Router();
const {
    listarSubclasses,
    listarSubclassesPaginacao,
    criarSubclasse,
    atualizarSubclasse,
    deletarSubclasse,
    obterSubclasse, // Importando a nova função
} = require('../controllers/subclassesController');

// Listar subclasses com paginação
router.get('/', listarSubclasses);
router.get('/paginacao', listarSubclassesPaginacao);

// Inserir nova subclasse
router.post('/', criarSubclasse);

// Atualizar subclasse
router.put('/:id', atualizarSubclasse);
router.put('/paginacao/:id', atualizarSubclasse);

// Deletar subclasse
router.delete('/:id', deletarSubclasse);

module.exports = router;
