var express = require('express');
var router = express.Router();
var multer = require('multer');
const productosControllers = require('../controllers/productoscontrollers');

router.get('/', productosControllers.productos);
router.get('/:id', productosControllers.detail);

router.get('/create', productosControllers.create);
router.post('/', productosControllers.store);

router.get('/edit/:id', productosControllers.edit);
router.put('/:id', productosControllers.update);

router.delete('/:id', productosControllers.destroy);


module.exports = router;
