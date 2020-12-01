const fs = require('fs'); 
const path = require('path')
let bcryptjs = require('bcryptjs');
var userData = require('../repositories/userRepository');
const userJsonFilePath = path.join(__dirname, '../data/users.json');
const {validationResult} = require('express-validator');
const { log } = require('console');


module.exports = {
    contacto : (req, res) => {
        res.render('users/contact'); 
    },
    quienesSomos : (req, res) => {
        res.render('users/quienes-somos');
    },
    registro : (req, res) => {
        res.render('users/register',{ data : {}, errors: {}, avatar: true }); 
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
        let avatar = true;
        if(req.files[0] == null){
         avatar = false;
        }
        if(errors.errors.length || !avatar){
            return res.render('users/register', { 
				errors : errors.mapped(),
                data : req.body,
                avatar: avatar
            })
        }
        let ids = userData.create(req);
        res.redirect('/users/perfil/'+ids)
    },   
    perfil : (req,res) => {
        let errors = validationResult(req)
        let content = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
        let ids = content.length - 1
        res.render('users/perfil', { errors : errors.mapped(), data : content[ids] })
    },
    edit : (req, res) => {
        let errors = validationResult(req)
        if (!errors.msg) {
            let content = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
            let ids = Number(req.params.id) - 1;
            content[ids].name = req.body.name;
            content[ids].apellido = req.body.apellido;
            content[ids].dni = req.body.dni;
            content[ids].email = req.body.email;
            content[ids].domicilio = req.body.domicilio;
            content[ids].localidad = req.body.localidad;
            content[ids].pais = req.body.pais;
    		content[ids].password = req.body.password;
            content[ids].metodo_pago = req.body.metodo_pago;
            content[ids].nroTarjeta = req.body.nroTarjeta;
            if(req.files[0] != null){
                content[ids].abatar = req.files[0].filename;
            }            
            fs.writeFileSync(userJsonFilePath, JSON.stringify(content))
            res.redirect('/');
        } else {
            res.render('users/perfil', { errors : errors.mapped(), data : req.body });
        }
    },

    logearse : (req, res) => {
        res.render('users/login',{ data : {}, errors: {} }); 
    },
    recuperar : (req, res) => {
        res.render('users/recupero'); 
    },
}