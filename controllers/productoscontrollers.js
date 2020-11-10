let fs = require('fs');

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
    productCreate : (req, res) => {
        res.render('products/productCreate')
    },
    store : (req, res, next) => {
        
        let content = fs.readFileSync('./data/products.json', {encoding: 'utf-8'})

        content = JSON.parse(content)

        content.push ({
            ...req.body,
            id: (content[content.length-1].id)+1,
            img: req.files[0].filename
        })

        content = JSON.stringify(content)

        fs.writeFileSync('./data/products.json', content)

       res.send('bien')
       
    },
    productEdit : (req, res) => {
        res.render('products/productEdit')
    },
    update : (req, res) => {
        //
    },
    destroy : (req,res) => {
        //
    }
}