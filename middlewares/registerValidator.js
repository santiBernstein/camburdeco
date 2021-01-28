const userData = require("../repositories/userRepository")
const {check,body} = require('express-validator');

module.exports = [
    check('name')
        .isLength({min:8})
        .withMessage('El nombre debe contener al menos 8 caracteres'),
    body('name')
        .isLength({min:4})
        .withMessage("El nombre de usuario está en uso"),
    check('email')
        .isEmail()
        .withMessage('No es un email'),
    check('password')
        .isLength({min:8})
        .withMessage('La contraseña debe contener al menos 8 caracteres'),
    check('confirmPassword')
        .isLength({min:8})
        .withMessage('La contraseña debe contener al menos 8 caracteres'),
    body('confirmPassword')
        .custom(function(value,{ req }){
            return userData.compare(value,req.body.password)
        })
        .withMessage('Las contraseñas deben ser iguales')
]