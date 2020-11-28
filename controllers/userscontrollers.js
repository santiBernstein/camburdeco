const fs = require('fs'); 
let bcryptjs = require('bcryptjs');
var userData = require('../data/user');


module.exports = {
    contacto : (req, res) => {
        res.render('users/contact'); 
    },
    quienesSomos : (req, res) => {
        res.render('users/quienes-somos');
    },
    registro : (req, res) => {
        res.render('users/register', { linkToLogin: false}); 
    },
    processLogin: (req, res) => {

		let user = userData.findByEmail(req.body.email)

		if(!user){

			return res.send('Email incorrecto')
		}
		else if(bcryptjs.compareSync(req.body.password, user.password)){

			req.session.user = user.email
			if(req.body.recordame){
				res.cookie('recordame', user.email, {maxAge: 120 * 1000})
			}
			return res.redirect('/products')
		}
			else { return res.send('Password Incorrrecto')}

		
	},
	logout: (req, res) => {
		req.session.destroy()
		res.cookie('recordame', null, {maxAge: 0})
	    res.redirect('/login')
	},
    store : (req, res) => {
		let content = fs.readFileSync('./data/users.json', {encoding: 'utf-8'})

        content = JSON.parse(content)

        content.push ({

				id: content.length,
				name: req.body.name,
				email : req.body.email,
                password : bcryptjs.hashSync(req.body.password),
                confirmPassword : bcryptjs.hashSync(req.body.password)
        })

        content = JSON.stringify(content)

        fs.writeFileSync('./data/users.json', content)

       res.send('bien')
		
	},
    logearse : (req, res) => {
        res.render('users/login'); 
    },
    recuperar : (req, res) => {
        res.render('users/recupero'); 
    },
}