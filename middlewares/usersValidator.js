const {check} = require('express-validator');
var userData = require('../repositories/userRepository');

module.exports = [
    check('email')
        .isEmail()
        .withMessage('No es un email'),
    check('password')
        .isLength({min:8})
        .withMessage('Contraseña Invalida')
]
