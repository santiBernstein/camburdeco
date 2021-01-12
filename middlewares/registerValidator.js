const userData = require("../repositories/userRepository")
const {check,body} = require('express-validator');

module.exports = [
    check('name')
        .isLength({min:8})
        .withMessage('El nombre debe contener al menos 8 caracteres'),
    body('name')
        .custom(function(value){
            if(userData.findByName(value) != undefined){
                return false;
            };
            return true;
        })
        .withMessage("El nombre de usuario está en uso"),
    check('email')
        .isEmail()
        .withMessage('No es un email'),
    body('email')
        .custom(function(value){
            if(userData.findByEmail(value)!= undefined){
                return false;
            };
            return true;
        })
        .withMessage("El email ingresado ya está registrado"),
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