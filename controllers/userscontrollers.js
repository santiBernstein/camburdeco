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
    logearse : (req, res) => {
        res.render('users/login'); 
    },
    recuperar : (req, res) => {
        res.render('users/recupero'); 
    },
}