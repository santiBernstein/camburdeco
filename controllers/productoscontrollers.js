module.exports = {
    productos : (req, res) => {
        res.render('products/products'); 
    },
    productCart : (req, res) => {
        res.render('products/productCart')
    },
    productCart2 : (req, res) => {
        res.render('products/productCart2')
    },
    productDetail : (req, res) => {
        res.render('products/productDetail')
    },
}