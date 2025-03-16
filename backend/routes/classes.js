const express = require('express');
const router = express.Router();
const {
    listarClasses,
    listarClassesPaginacao,
    criarClasse,
    atualizarClasse,
    deletarClasse,
    obterClasse, // Importando a nova função
} = require('../controllers/classesController');

router.get('/', listarClasses);

// Listar classes com paginação
router.get('/paginacao', listarClassesPaginacao);

router.get('/paginacao/:id', obterClasse);

// Inserir nova classe
router.post('/', criarClasse);

// Atualizar classe
router.put('/paginacao/:id', atualizarClasse);

// Deletar classe
router.delete('/paginacao/:id', deletarClasse);

module.exports = router;
