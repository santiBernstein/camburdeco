var express = require('express');
var router = express.Router();
const carritoControllers = require('../controllers/carritocontrollers');

router.get('/', carritoControllers.cart);
router.get('/Send', carritoControllers.send);

module.exports = router;