const userData = require("../repositories/userRepository")
const {check,body} = require('express-validator');
const db = require('../database/models')

module.exports = [
    check('name')
        .isLength({min:2})
        .withMessage('El nombre debe contener al menos 2 caracteres'),
    body('user_name')
        .custom(function(value, {req}){
            return db.User.findOne({
                where: {
                    user_name: req.body.name
                }
            })
            .then((userData) => {
                if (userData != null) {         
                    return Promise.reject('El nombre de usuario está en uso')
                }  
            })
        }),
    check('email')
        .isEmail()
        .withMessage('No es un email'),
    body('email')
        .custom(function(value, {req}){
            return db.User.findOne({
                where: {
                    email: req.body.email
                }
            })
            .then((userData) => {
                if (userData != null) {         
                    return Promise.reject('El email ya se encuentra registrado')
                }  
            })
        }),    
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