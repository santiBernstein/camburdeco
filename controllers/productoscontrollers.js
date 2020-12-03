const fs = require('fs');
const path = require('path')
const productFilePath = path.join(__dirname,"../data/products.json")
const {validationResult} = require('express-validator');

module.exports = {
    productos : (req, res) => {
        let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}))
        let filtro = {
            category: 'todos',
            options: 'mas-vendidos'
        };
        let categorias = ['todos','macetas','ceniceros','luminaria','plantas','velas']
        
        if(req.query.category != categorias[0] && req.query.category != undefined){
            content = content.filter(function(product){
                return product.category == req.query.category
            })
            filtro.category=req.query.category;
        }
        let opciones = ['mas-vendidos','menor-precio','mayor-precio','menor-tamaño','mayor-tamaño']
        switch (req.query.options){
            case opciones[0]:
                content = content.sort(function(a,b){
                    if(a.ventas > b.ventas){
                        return 1;
                    }
                    if(a.ventas < b.ventas){
                        return -1;
                    }
                    return 0;
                } );
                filtro.options=req.query.options;
                break;
            case opciones[1]:
                content = content.sort(function(a,b){
                    if(Number(a.price) > Number(b.price)){
                        return 1;
                    }
                    if(Number(a.price) < Number(b.price)){
                        return -1;
                    }
                    return 0;
                } );
                filtro.options=req.query.options
                break;
            case opciones[2]:
                content = content.sort(function(a,b){
                    if(Number(a.price) < Number(b.price)){
                        return 1;
                    }
                    if(Number(a.price) > Number(b.price)){
                        return -1;
                    }
                    return 0;
                } );
                filtro.options=req.query.options
                break;
            case opciones[3]:
                content = content.sort(function(a,b){
                    if(a.size < b.size){
                        return 1;
                    }
                    if(a.size > b.size){
                        return -1;
                    }
                    return 0;
                } );
                filtro.options=req.query.options
                break;
            case opciones[4]:
                content = content.sort(function(a,b){
                    if(a.size > b.size){
                        return 1;
                    }
                    if(a.size < b.size){
                        return -1;
                    }
                    return 0;
                } );
                filtro.options=req.query.options
                break;
            default:
                filtro.options="mas-vendidos"
                break;
            }
        res.render('products/products', {content,filtro,categorias,opciones}); 
    },
    detail : (req, res) => {
        let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));
        let ids = Number(req.params.id) - 1;
        res.render('products/detail', { content, ids });
    },
    create : (req, res) => {
        res.render('products/create',{ data : {}, errors: {}, avatar: true })
    },
    store : (req, res, next) => {
        let errors = validationResult(req)
        let avatar = true;

        if(req.files[0] == null){
            avatar = false;
           }
        if(errors.errors.length || !avatar){
            return res.render('products/create', { 
				errors : errors.mapped(),
                data : req.body,
                avatar: avatar
            })
        }

        let content =JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));

        let style = [];
        if(Array.isArray(req.body.style)) {
           
            style = req.body.style;            
        } else {
            
            style.push(req.body.style)
        }
        let color = [];
        if(Array.isArray(req.body.color)) {
            
            color = req.body.color;            
        } else {
            
            color.push(req.body.color)
        }
        
        content.push ({
            ...req.body,
            color: color,
            style : style,
            id: (content[content.length-1].id)+1,
            img: req.files[0].filename
        })

        content = JSON.stringify(content)

        fs.writeFileSync(productFilePath, content)

       res.redirect('/')
       
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
        console.log(content[ids].style.length);

        content[ids].name = req.body.name;
		content[ids].category = req.body.category;
		content[ids].price = req.body.price;
		content[ids].stock = req.body.stock; 
        content[ids].style.splice(0,content[ids].style.length-1,req.body.style);
        content[ids].color.splice(0,content[ids].style.length-1,req.body.color); 
        content[ids].description = req.body.desciption;
        content[ids].img = req.files[0].filename;
		fs.writeFileSync(productFilePath, JSON.stringify(content))
		res.redirect('/')
    },
    destroy : (req,res) => {
        let content = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));
		const imagePath = path.join(__dirname,"../public/images",content[(Number(req.params.id)-1)].img);
        console.log(imagePath)
        fs.unlink(imagePath, function (err) {
			if (err) throw err;
			console.log('File deleted!');
		})
		content.splice((Number(req.params.id)-1),1)
		let i=1;
		content.forEach(product=>product.id = i++)
		fs.writeFileSync(productFilePath,JSON.stringify(content))
		res.redirect('/')
    }
}