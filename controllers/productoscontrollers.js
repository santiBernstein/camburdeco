let fs = require('fs');

module.exports = {
    productos : (req, res) => {
        res.render('products/products'); 
    },
    detail : (req, res) => {
        res.render('products/detail')
    },
    create : (req, res) => {
        res.render('products/create')
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
    edit : (req, res) => {
        res.render('products/edit')
    },
    update : (req, res) => {
        //
    },
    destroy : (req,res) => {
        //
    }
}