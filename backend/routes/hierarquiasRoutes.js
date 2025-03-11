const express = require('express');
const router = express.Router();
const { listarHierarquias } = require('../controllers/hierarquiasController');

router.get('/hierarquias', listarHierarquias);


module.exports = router;
