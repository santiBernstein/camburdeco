const {check} = require('express-validator');

module.exports = [
    check('name')
        .notEmpty()
        .withMessage('Debe completar el campo Nombre'),
    check('apellido')
        .notEmpty()
        .withMessage('Debe completar el campo Apellido'),
    check('email')
        .notEmpty()
        .withMessage('Debe completar el campo Email'),
    check('email')
        .isEmail()
        .withMessage('Debe ingresar un Email válido'),
    check('password')
        .notEmpty()
        .withMessage('Debe ingresar una password'),
    check('password')
        .isLength({min:8})
        .withMessage('Debe ingresar una contraseña mayor a 8 caracteres'),
]