const express = require('express');
const router = express.Router();
const {
    listarCategorias,
    criarCategoria,
    atualizarCategoria,
    deletarCategoria,
    obterCategoria, // Importando a nova função
} = require('../controllers/categoriasController');

// Rota para listar todas as categorias
router.get('/', listarCategorias);

// Rota para criar nova categoria
router.post('/', criarCategoria);

// Rota para obter uma categoria por ID
router.get('/:id', obterCategoria); // Nova rota para obter uma categoria

// Rota para atualizar uma categoria por ID
router.put('/:id', atualizarCategoria);

// Rota para deletar uma categoria por ID
router.delete('/:id', deletarCategoria);

module.exports = router;