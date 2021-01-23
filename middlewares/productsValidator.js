const {check,body,validationResult} = require('express-validator');

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
    body('img')
        .custom(function(value, {req}){
            let errors = validationResult(req)
            console.log(1,errors)
            console.log(2,req.file)
            console.log(3,value)
            // if(req.file == null){
            //     avatar = false;
            //    }
            // if(errors.errors.length || !avatar){
                
            //     return res.render('products/create', { 
            //         errors : errors.mapped(),
            //         data : req.body,
            //         avatar: avatar
            //     })
            // }
            return false
        })
]