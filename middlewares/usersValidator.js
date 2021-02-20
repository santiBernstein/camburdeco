const {check, body, validationResult} = require('express-validator');
var userData = require('../repositories/userRepository');
const db = require('../database/models');

module.exports = [
    check('email')
        .isEmail()
        .withMessage('No es un email'),
    check('password')
        .isLength({min:8})
        .withMessage('Contraseña Invalida'),
    body('email')
        .custom(function(value, {req}){
            return db.User.findOne({
                include: [{association:"tiposUsuarios"}],
                where: {
                    email: value
                }
            })
            .then((userData) => {
                if (userData == null) {         
                    return Promise.reject('El email ingresado NO existe')
                }  
            })
        })
]
