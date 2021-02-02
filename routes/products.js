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
			console.log(file)
			cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
		 }
})

let upload = multer({
	storage: storage,
	limits: {
		field: 1,
		fieldNameSize: 50,
		fieldSize: 20000,
		fileSize: 1024*1024,
	},
	fileFilter: function(req,file,cb){
		checkFileType(file,cb)
	}
})

function checkFileType(file,cb){
	const filetypes= /jpeg|jpg|png|gif/;
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	const mimetype = filetypes.test(file.mimetype);
	if(extname && mimetype) {
		return cb(null,true) 
	}else{
		return cb(null, false)
	}
}


router.get('/', productosControllers.productos);

router.get('/create', productosControllers.create);
router.post('/', upload.single('img'), productsValidator, productosControllers.store);

router.get('/:id', productosControllers.detail);

router.get('/:id/edit', productosControllers.edit);
router.put('/:id', upload.single('img'), productsValidator, productosControllers.update);

router.delete('/:id', productosControllers.destroy);


module.exports = router;
