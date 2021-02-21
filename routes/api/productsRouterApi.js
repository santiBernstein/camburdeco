var express = require('express');
var router = express.Router();
const productsControllerApi = require('../../controllers/api/productsControllerApi');


router.get('/', productsControllerApi.productos);
router.get('/categories',productsControllerApi.categorias);
router.get('/:id', productsControllerApi.find);

module.exports = router;