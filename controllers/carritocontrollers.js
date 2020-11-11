
let fs = require('fs');

module.exports = {
    cart : (req, res) => {
        res.render('carrito/carrito')
    },
    send : (req, res) => {
        res.render('carrito/send')
    }
}