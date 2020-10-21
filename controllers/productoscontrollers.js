module.exports = {
    productos : (req, res) => {
        res.render('products'); 
    },
    productCart : (req, res) => {
        res.render('productCart')
    },
    productCart2 : (req, res) => {
        res.render('productCart2')
    },
    productDetail : (req, res) => {
        res.render('productDetail')
    },
}