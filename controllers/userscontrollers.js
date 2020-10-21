module.exports = {
    contacto : (req, res) => {
        res.render('contact'); 
    },
    quienesSomos : (req, res) => {
        res.render('quienes-somos');
    },
    registro : (req, res) => {
        res.render('register'); 
    },
    logearse : (req, res) => {
        res.render('login'); 
    },
    recuperar : (req, res) => {
        res.render('recupero'); 
    },
}