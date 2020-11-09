var express = require('express');
var router = express.Router();
const productosControllers = require('../controllers/productoscontrollers');


//middleware para subir fotos
let multer = require('multer');
let path = require('path');

let storage = multer.diskStorage({
		destination : function(req,file,cb){
			cb(null, '/public/images')
		},
		filename : function(req,file,cb){
			cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
		 }
})

let upload = multer({storage})



router.get('/', productosControllers.productos);
router.get('/Cart', productosControllers.productCart);
router.get('/Cart2', productosControllers.productCart2);
router.get('/Detail', productosControllers.productDetail);

router.get('/Create', productosControllers.productCreate);
router.post('/',  upload.any(), productosControllers.store);

router.get('/:id/Edit', productosControllers.productEdit);
router.put('/:id', productosControllers.update);

router.delete('/:id', productosControllers.destroy);


module.exports = router;
