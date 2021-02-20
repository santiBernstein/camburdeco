const {check} = require('express-validator');

module.exports = [
    check('nombre')
        .notEmpty()
        .withMessage('Debe completar el campo Nombre'),
    check('email')
        .notEmpty()
        .withMessage('Debe completar el campo Email')
        .isEmail()
        .withMessage('Debe ingresar un Email válido'),
    check('mensaje')
        .notEmpty()
        .withMessage('Debe ingresar una mensaje'),
]