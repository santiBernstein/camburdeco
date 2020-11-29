const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/userscontrollers');
const usersValidation = require('../middlewares/usersValidator');
const registerValidation = require('../middlewares/registerValidator');


router.get('/contact', usersControllers.contacto);
router.get('/quienes-somos', usersControllers.quienesSomos);

router.get('/register', usersControllers.registro);
router.post('/',registerValidation, usersControllers.store);

router.get('/login', usersControllers.logearse);
router.post('/login', usersValidation, usersControllers.processLogin);

router.post('/logout', usersControllers.logout);

router.get('/recupero', usersControllers.recuperar);

module.exports = router;
