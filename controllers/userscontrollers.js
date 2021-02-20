const fs = require('fs'); 
const path = require('path')
let bcryptjs = require('bcryptjs');
var userData = require('../repositories/userRepository');
const {validationResult} = require('express-validator');
const { log, profile } = require('console');
const db = require('../database/models');
const User = require('../database/models/User');
const Profile = require('../database/models/Profile');

module.exports = {
    logearse: (req, res) => {
        res.render('users/login',{ data : { }, errors: { } }); 
    },
    processLogin: (req, res) => {
        let errors = validationResult(req)
        if(errors.errors.length > 0){
            errors = errors.mapped()
            res.render('users/login', { errors, data : req.body })  
        } else {
            db.User.findOne({
                include: [{association:"tiposUsuarios"}],
                where: {
                    email: req.body.email
                }
            })
            .then((userData) => {
                if(bcryptjs.compareSync(req.body.password, userData.password)){
                    req.session.user = userData.user_name
                    req.session.ides = userData.id
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
            })
            .catch((error) => {
                console.log(error);
                return error;
            })   
        }		
	},
	logout: (req, res) => {
		req.session.destroy()
		res.cookie('recordame', null, {maxAge: 0})
	    res.redirect('/')
    },
    list: (req,res) => {
        listUser = db.User.findAll({
            include: ["profiles","tiposUsuarios"]
        }) 
        Promise.all([listUser])            
            .then(([usersData]) => {
                res.render('users/usuarios', {usersData}); 
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },
    registro: (req, res) => {
        res.render('users/register',{ data : {}, errors: {}, avatar: true }); 
    },
    store: (req, res) => {        
        let errors = validationResult(req)
        let avatars = true;
        if(req.files[0] == null){
            avatars = false;
        }
        if(errors.errors.length || !avatars){
            return res.render('users/register', { 
				errors : errors.mapped(),
                data : req.body,
                avatar: avatars
            })
        }
        let salt = bcryptjs.genSaltSync(10);
        return db.User.create({
                email: req.body.email,
                password: bcryptjs.hashSync(req.body.password,salt),
                user_name: req.body.name,
                tipo_usuario_id: 2,    
                profiles: {
                    first_name: '',
                    last_name: '',
                    avatar: req.files[0].filename,
                    address: '',
                    city: '',
                    pais: '', 
                }
            }, {
            include: [{
                association: "profiles"
            }]
        })
            .then((result) => {
                res.redirect('/')
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }, 
    perfil: (req,res) => {
        let errors = validationResult(req)
        ids = req.params.id
        db.User.findByPk(ids,
                {
                    include: [{association:"profiles"}]
                })
                    .then((data) => {
                        res.render('users/perfil', { errors : errors.mapped(), data, ids })
                    }
                )   
    },
    detail: (req,res) => {
        ids = req.params.id
        db.User.findByPk(ids,
            {
                include: ["profiles","tiposUsuarios"]
            })
            .then((data) => {
                if ( data.profiles.avatar.length < 20 ) {
                    data.profiles.avatar = "not_image.png"
                }
                res.render('users/users', { data, ids })
            }
        )   
    },
    edit: (req, res) => {
        let errors = validationResult(req)
        if (!errors.msg) {
            db.Profile.update({
                first_name: req.body.name,
                last_name: req.body.apellido,
                avatar: req.body.avatar,
                address: req.body.domicilio,
                city: req.body.localidad,
                pais: req.body.pais,
            }, {
                where: {
                    id: req.params.id
                }
            })
            res.redirect('/');
        } else {
            res.render('users/perfil', { errors : errors.mapped(), data : req.body });
        }
    },    
    upgrade: (req, res) => {
        db.User.update({
            
            tipo_usuario_id: req.body.tipousuario,
        }, {
            where: {
                id: req.params.id
            }
        })
        res.redirect('/users/list');
    },  
    recuperar: (req, res) => {
        res.render('users/recupero'); 
    },
    newsLetter: (req, res) => {
        let errors = validationResult(req)
        if (!errors.errors[0]) {
            return db.Newsletter.create({
                email: req.body.email_news,
            })
            .then((result) => {
                res.render('users/mensaje', { errors : "Su e-mail ha sido registrado", data : req.body, mensaje: "NEWSLETER" });
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
        } else {
            res.render('users/mensaje', { errors : errors.errors[0].msg, data : req.body, mensaje: "NEWSLETERS" });
        }
    },
    contacto: (req, res) => {
        let errors = validationResult(req)
        res.render('users/contact', { errors : errors, data : req.body }); 
    },
    sendMsg: (req,res) => {
        let errors = validationResult(req)
        if(errors.errors.length <= 0){
            res.render('users/mensaje', { errors : "Su mensaje ha sido enviado. Pronto estaremos respondiendo su inquietud.", data : req.body, mensaje: "CONTACTO" });
        } else {
            errors = errors.mapped()
            res.render('users/contact', { errors : errors, data : req.body });
        }
    },
    quienesSomos: (req, res) => {
        res.render('users/quienes-somos');
    }
}