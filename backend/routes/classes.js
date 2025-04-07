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

// Listar classes
router.get('/', listarClasses);
// Listar classes pela pagina hierarquias
router.get('/paginacao', listarClassesPaginacao);

// obter classe pelo id
router.get('/:id', obterClasse);

// Inserir nova classe
router.post('/', criarClasse);

// Atualizar classe
router.put('/:id', atualizarClasse);
// Atualizar classe pela pagina hierarquias
router.put('/paginacao/:id', atualizarClasse);

// Deletar classe
router.delete('/:id', deletarClasse);
// Deletar classe pela pagina hierarquias
router.delete('/paginacao/:id', deletarClasse);

module.exports = router;
