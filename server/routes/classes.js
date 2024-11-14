const express = require('express');
const router = express.Router();
const {
    listarClasses,
    criarClasse,
    atualizarClasse,
    deletarClasse,
    obterClasse, // Importando a nova função
} = require('../controllers/classesController');

// Listar classes com paginação
router.get('/', listarClasses);

router.get('/:id', obterClasse);

// Inserir nova classe
router.post('/', criarClasse);

// Atualizar classe
router.put('/:id', atualizarClasse);

// Deletar classe
router.delete('/:id', deletarClasse);

module.exports = router;
