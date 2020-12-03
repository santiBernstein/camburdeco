const {check} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty()
        .withMessage('Debe completar el campo Nombre'),
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
        .notEmpty()
        .withMessage('Debe escribir una descripción del Producto'),
    check('img')
        .notEmpty()
        .withMessage('Debe seleccionar una imagen del Producto')    
    
]