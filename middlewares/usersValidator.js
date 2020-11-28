const {check} = require('express-validator');

module.exports = [check('email')
.isEmail().withMessage('Email Invalido'),
check('password')
.isLength({min:30}).withMessage('Contraseña Invalida')
]