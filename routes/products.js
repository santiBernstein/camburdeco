var express = require('express');
var router = express.Router();
const productosControllers = require('../controllers/productoscontrollers');

router.get('/', productosControllers.productos);
router.get('/:id', productosControllers.detail);

router.get('/Create', productosControllers.create);
router.post('/', productosControllers.store);

router.get('/:id/Edit', productosControllers.edit);
router.put('/:id', productosControllers.update);

router.delete('/:id', productosControllers.destroy);


module.exports = router;
