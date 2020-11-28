var express = require('express');
var router = express.Router();
const usersControllers = require('../controllers/userscontrollers');


router.get('/contact', usersControllers.contacto);
router.get('/quienes-somos', usersControllers.quienesSomos);

router.get('/register', usersControllers.registro);
router.post('/', usersControllers.store);

router.get('/login', usersControllers.logearse);
router.post('/login', usersControllers.processLogin);

router.post('/logout', usersControllers.logout);

router.get('/recupero', usersControllers.recuperar);

module.exports = router;
