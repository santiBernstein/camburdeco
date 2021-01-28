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
                        msg: 'El email ingresado NO existe',
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
        // db.Profile.create({
        //     first_name: '',
        //         last_name: '',
        //         avatar: req.files[0].filename,
        //         address: '',
        //         city: '',
        //         pais: '',
        //     User: {
        //         email: req.body.email,
        //         password: bcryptjs.hashSync(req.body.password,salt),
        //         user_name: req.body.name,
        //         tipo_usuario_id: 2,
        //         profile_id: Profile.null
        //     }
            
            
        //   }, {
        //     include: [{
        //       association: "users"
        //     }]
        //   })
        //   .then((result) => {
        //       console.log(result)
        //     res.redirect('/')
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     return error;
        // })
          
        db.Profile.create({
            first_name: '',
            last_name: '',
            avatar: req.files[0].filename,
            address: '',
            city: '',
            pais: '',
        })
        
            db.Profile.count()
                .then (result => {
                    result = result + 1
                    db.User.create({
                        email: req.body.email,
                        password: bcryptjs.hashSync(req.body.password,salt),
                        user_name: req.body.name,
                        tipo_usuario_id: 2,
                        profile_id: result,                
                    })
                    .then((resultado) => {
                        console.log(resultado)
                        res.redirect('/users/login')
                    })
                    
                }
            )          
        
    }, 
    perfil : (req,res) => {
        let errors = validationResult(req)
        ids = req.params.id
        console.log('ids', ids)
        db.User.findByPk(ids,
                {
                    include: [{association:"profiles"}]
                })
                    .then((data) => {
                        console.log('result', data)
                        res.render('users/perfil', { errors : errors.mapped(), data, ids })
                    }
                )   
    },
    edit : (req, res) => {
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