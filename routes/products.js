var express = require('express');
var router = express.Router();
const productosControllers = require('../controllers/productoscontrollers');

router.get('/', productosControllers.productos);
router.get('/productCart', productosControllers.productCart);
router.get('/productCart2', productosControllers.productCart2);
router.get('/productDetail', productosControllers.productDetail);

module.exports = router;
