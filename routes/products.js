var express = require('express');
var router = express.Router();
const productosControllers = require('../controllers/productoscontrollers');
const productsValidator = require('../middlewares/productsValidator');


//middleware para subir fotos
let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
		destination : function(req,file,cb){
			cb(null, 'public/images')
		},
		filename : function(req,file,cb){
			cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
		 }
})

let upload = multer({storage})



router.get('/', productosControllers.productos);

router.get('/create', productosControllers.create);
router.post('/', upload.any(), productsValidator, productosControllers.store);

router.get('/:id', productosControllers.detail);

router.get('/:id/edit', productosControllers.edit);

router.put('/:id', upload.any(), productosControllers.update);

router.delete('/:id', productosControllers.destroy);


module.exports = router;
