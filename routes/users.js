const express = require('express');
const router = express.Router();
let multer = require('multer');
let path = require('path');
const usersControllers = require('../controllers/userscontrollers');
const usersValidation = require('../middlewares/usersValidator');
const registerValidation = require('../middlewares/registerValidator');
var usersPerfilValidator = require('../middlewares/usersPerfilValidator');

let storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null, 'public/images/users')
    },
    filename : function(req,file,cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
     }
})

let upload = multer({storage})


router.get('/contact', usersControllers.contacto);
router.get('/quienes-somos', usersControllers.quienesSomos);

router.get('/register', usersControllers.registro);
router.post('/' ,upload.any(), registerValidation, usersControllers.store);

router.get('/login', usersControllers.logearse);
router.post('/login', usersValidation, usersControllers.processLogin);

router.post('/logout', usersControllers.logout);

router.get('/recupero', usersControllers.recuperar);
router.post('/perfil/:id/edit', upload.any(), usersPerfilValidator, usersControllers.edit);
router.get('/perfil/:id', usersControllers.perfil);

module.exports = router;
