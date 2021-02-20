const express = require('express');
const router = express.Router();
let multer = require('multer');
let path = require('path');
const usersControllers = require('../controllers/userscontrollers');
const usersValidator = require('../middlewares/usersValidator');
const userPerfilValidator = require('../middlewares/usersPerfilValidator');
const registerValidator = require('../middlewares/registerValidator');
const newsletterValidator = require('../middlewares/newsletterValidator');

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
router.post('/newsletter', newsletterValidator, usersControllers.newsLetter);

router.get('/register', usersControllers.registro);
router.post('/' ,upload.any(), registerValidator, usersControllers.store);

router.get('/login', usersControllers.logearse);
router.post('/login', usersValidator, usersControllers.processLogin);

router.post('/logout', usersControllers.logout);

router.get('/list', usersControllers.list);
router.get('/detail/:id', usersControllers.detail);
router.put('/upgrade/:id',usersControllers.upgrade);

router.get('/recupero', usersControllers.recuperar);
router.put('/:id', upload.any(), userPerfilValidator, usersControllers.edit);
router.get('/perfil/:id', usersControllers.perfil);

module.exports = router;
