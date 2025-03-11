const express = require('express');
const router = express.Router();
const {
    listarSubcategorias,
    obterSubcategoria,
    criarSubcategoria,
    atualizarSubcategoria,
    deletarSubcategoria
} = require('../controllers/subcategoriasController');

router.get('/', listarSubcategorias);
router.get('/:id', obterSubcategoria);
router.post('/', criarSubcategoria);
router.put('/:id', atualizarSubcategoria);
router.delete('/:id', deletarSubcategoria);

module.exports = router;
