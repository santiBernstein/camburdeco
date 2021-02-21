const {check} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('name')
        .isLength({min:2, max:100})
        .withMessage('El Nombre debe contener entre 2 y 100 caracteres'),
    check('category')
        .notEmpty()
        .withMessage('Debe completar el campo Categoría'),
    check('price')
        .notEmpty()
        .withMessage('Debe completar el campo Precio')
        .isNumeric()
        .withMessage('Debe ser un Número'),
    check('style')
        .notEmpty()
        .withMessage('Debe seleccionar al menos un Estilo'),
    check('color')
        .notEmpty()
        .withMessage('Debe seleccionar al menos un Color'),    
    check('description')
        .isLength({min:10})
        .withMessage('La Descripción debe contener al menos 10 caracteres'),
    check('img')
        .custom(function(value,{ req }){
            if(req.file == undefined ){
               return db.Product.findByPk(req.params.id)
                    .then((productData) => {
                        req.body.img = productData.img;
                    })
            }
            let formats = ['image/jpg','image/jpeg','image/png','image/gif'];
            if(formats.includes(req.file.mimetype)){
                return req.file.mimetype
            }
        })
       .withMessage('El formato de imagen debe ser jpg, jpeg, png o gif')
]