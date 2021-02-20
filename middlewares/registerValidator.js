const userData = require("../repositories/userRepository")
const {check,body} = require('express-validator');

module.exports = [
    check('name')
        .isLength({min:2})
        .withMessage('El nombre debe contener al menos 2 caracteres'),
    body('user_name')
        .custom(function(value, {req}){
            return db.User.findOne({
                where: {
                    user_name: value
                }
            })
            .then((userData) => {
                if (userData == null) {         
                    return Promise.reject('El nombre de usuario está en uso')
                }  
            })
        }),
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