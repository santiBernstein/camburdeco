const fs = require('fs'); 
const path = require('path')
let bcryptjs = require('bcryptjs');
var userData = require('../repositories/userRepository');
const {validationResult} = require('express-validator');
const { log } = require('console');
const db = require('../database/models');


module.exports = {
    logearse : (req, res) => {
        res.render('users/login',{ data : { }, errors: { } }); 
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
        db.User.findOne({
            include: [{association:"tiposUsuarios"}],
            where: {
                email: req.body.email
            }
        })
        .then((userData) => {
            if(userData === null){
                errors = errors.mapped()
                errors = {
                    email: {
                        value: '',
                        msg: 'El email ingresado no existe',
                        param: 'email',
                        location: 'body'
                    }
                }             
                return res.render('users/login', { 
                    errors,
                    data : req.body
                })  
            } else {
                if(bcryptjs.compareSync(req.body.password, userData.password)){
                    req.session.user = userData.user_name
                    req.session.tipoUsuario = userData.tiposUsuarios.tipo
                    if(req.body.recordame){
                        res.cookie('recordame', userData.email, {maxAge: 120 * 1000})
                    }
                    return res.redirect('/')
                } else { 
                    return res.render('users/login', {
                        errors : errors.mapped(),
                        data : req.body
                    }) 
                }
            }	           
        })
        .catch((error) => {
            console.log(error);
            return error;
        })		
	},
	logout: (req, res) => {
		req.session.destroy()
		res.cookie('recordame', null, {maxAge: 0})
	    res.redirect('/')
    },
    registro : (req, res) => {
        res.render('users/register',{ data : {}, errors: {}, avatar: true }); 
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
        //let content = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
        let ids = content.length - 1
        res.render('users/perfil', { errors : errors.mapped(), data : content[ids] })
    },
    edit : (req, res) => {
        let errors = validationResult(req)
        if (!errors.msg) {
            //let content = JSON.parse(fs.readFileSync(userJsonFilePath, {encoding: 'utf-8'}));
            
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
    recuperar : (req, res) => {
        res.render('users/recupero'); 
    },
    contacto : (req, res) => {
        res.render('users/contact'); 
    },
    quienesSomos : (req, res) => {
        res.render('users/quienes-somos');
    }
}