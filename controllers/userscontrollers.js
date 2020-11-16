const fs = require('fs'); 
let bcryptjs = require('bcryptjs');


module.exports = {
    contacto : (req, res) => {
        res.render('users/contact'); 
    },
    quienesSomos : (req, res) => {
        res.render('users/quienes-somos');
    },
    registro : (req, res) => {
        res.render('users/register'); 
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