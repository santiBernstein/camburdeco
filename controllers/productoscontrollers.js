let fs = require('fs');
const path = require('path');
const productFilePath = path.join(__dirname,"../data/products.json");

module.exports = {
    productos : (req, res) => {
        res.render('products/products'); 
    },
    detail : (req, res) => {
        let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));
        let ids = Number(req.params.id) - 1;
        res.render('products/detail', { content, ids });
    },
    create : (req, res) => {
        res.render('products/create')
    },
    store : (req, res) => {
        
        let content =JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));

        content.push ({
            ...req.body,
            id: (content[content.length-1].id)+1
        })

        content = JSON.stringify(content)

        fs.writeFileSync(productFilePath, content)

       res.send('bien')
    },
    edit : (req, res) => {
        let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));
        let ids = Number(req.params.id);
        content = content[req.params.id];
        res.render('products/edit', { content, ids } )
    },
    update : (req, res) => {
        let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));
		let ids = Number(req.params.id) - 1;
		content[ids].name = req.body.name;
		content[ids].category = req.body.category;
		content[ids].price = req.body.price;
		content[ids].stock = req.body.stock; 
        content[ids].style = req.body.style;
        content[ids].color = req.body.color; 
        content[ids].description = req.body.desciption;
        content[ids].img = req.files[0].filename;
		fs.writeFileSync(productFilePath, JSON.stringify(content))
		res.redirect('/')
    },
    destroy : (req,res) => {
        //
    }
}