var express = require('express');
var router = express.Router();
const productosControllers = require('../controllers/productoscontrollers');


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

router.get('/Create', productosControllers.create);
router.post('/', upload.any(), productosControllers.store);

router.get('/:id', productosControllers.detail);

router.get('/:id/Edit', productosControllers.edit);

router.put('/:id', productosControllers.update);

router.delete('/:id', productosControllers.destroy);


module.exports = router;
