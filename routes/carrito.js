var express = require('express');
var router = express.Router();
const carritoControllers = require('../controllers/carritocontrollers');

router.get('/', carritoControllers.cart);

router.post('/addToCart', carritoControllers.addToCart);
router.post('/deleteFromCart', carritoControllers.deleteFromCart);


router.get('/Send', carritoControllers.send);

module.exports = router;