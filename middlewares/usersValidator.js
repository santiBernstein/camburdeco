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
    // body('email')
    //     .custom(value => {
    //         return User.findUserByEmail(value).then(user => {
    //           if (user == null) {
    //             return Promise.reject('El email ingresado NO existe');
    //           }
    //         });
    //       }),
    //       (req, res) => {
    //         // Handle the request
    //       },
    body('email')
        .custom(function(value, {req}){
            console.log('VALUE', value)
            let errors = validationResult(req)
            return db.User.findOne({
                include: [{association:"tiposUsuarios"}],
                where: {
                    email: value
                }
            })
            .then((userData) => {
                console.log('USERDATA', userData)
                if (userData == null) {          
                    new Error('Password confirmation is incorrect');
                    return Promise.reject('El email ingresado NO existe');
                }    
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
        })
]
