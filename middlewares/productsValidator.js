const {check} = require('express-validator');

module.exports = [
    check('name')
        .isLength({min:5, max:100})
        .withMessage('El Nombre debe contener entre 5 y 100 caracteres'),
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
        .isLength({min:20})
        .withMessage('La Descripción debe contener al menos 20 caracteres'),
    check('img')
        .custom(function(value,{ req }){
            if(req.file == undefined ){
                return false
            }
            let formats = ['image/jpg','image/jpeg','image/png','image/gif'];
            if(formats.includes(req.file.mimetype)){
                return req.file.mimetype
            }
        })
       .withMessage('El formato de imagen debe ser jpg, jpeg, png o gif')
]