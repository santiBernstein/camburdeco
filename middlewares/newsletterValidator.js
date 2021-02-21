const {check, body, validationResult} = require('express-validator');
const db = require('../database/models');

module.exports = [
    check('email_news')
        .isEmail()
        .withMessage('Debe ingresar un e-mail válido'),
    body('email_news')
        .custom(function(value, {req}){
            return db.Newsletter.findOne({
                where: {
                    email: value
                }
            })
            .then((userData) => {
                if (!(userData == null)) {        
                    return Promise.reject('El email ingresado YA existe')
                }
            })
        })
]
