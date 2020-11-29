const fs = require('fs'); 
const path = require('path')
let bcryptjs = require('bcryptjs');
var userData = require('../repositories/userRepository');
const userJsonFilePath = path.join(__dirname, '../data/users.json');
const {validationResult} = require('express-validator');


module.exports = {
    contacto : (req, res) => {
        res.render('users/contact'); 
    },
    quienesSomos : (req, res) => {
        res.render('users/quienes-somos');
    },
    registro : (req, res) => {
        res.render('users/register',{ data : {}, errors: {} }); 
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
       
		let user = userData.findByEmail(req.body.email)

		if(!user){

			return res.render('users/login', { 
				
				errors : errors.mapped(),
				data : req.body
				
				})
		}
		else if(bcryptjs.compareSync(req.body.password, user.password)){

			req.session.user = user.email
			if(req.body.recordame){
				res.cookie('recordame', user.email, {maxAge: 120 * 1000})
			}
			return res.redirect('/products')
		}
			else { return res.render('users/login', { 
				
				errors : errors.mapped(),
				data : req.body
				
                })
            }			
	},
	logout: (req, res) => {
		req.session.destroy()
		res.cookie('recordame', null, {maxAge: 0})
	    res.redirect('/login')
	},
    store : (req, res) => {
        let errors = validationResult(req)
        console.log(errors.errors)
        if(errors.errors.length){
            return res.render('users/register', { 
				errors : errors.mapped(),
				data : req.body
            })
        }
        userData.create(req);
        res.redirect('users/login')

	},
    logearse : (req, res) => {
        res.render('users/login',{ data : {}, errors: {} }); 
    },
    recuperar : (req, res) => {
        res.render('users/recupero'); 
    },
}