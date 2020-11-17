const fs = require('fs');
const path = require('path')
const productFilePath = path.join(__dirname,"../data/products.json")

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
        res.render('products/create')
    },
    store : (req, res, next) => {
        
        let content =JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));

        let style = [];
        if(Array.isArray(req.body.style)) {
            console.log('1', req.body.style)
            style = req.body.style;            
        } else {
            console.log('2', req.body.style)
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
        const content = JSON.parse(fs.readFileSync(productJsonFilePath, 'utf-8'));
		const imagePath = path.join(__dirname,"../public/images",content[(Number(req.params.id)-1)].img);
        console.log(imagePath)
        fs.unlink(imagePath, function (err) {
			if (err) throw err;
			console.log('File deleted!');
		})
		content.splice((Number(req.params.id)-1),1)
		let i=1;
		content.forEach(product=>product.id = i++)
		fs.writeFileSync(productJsonFilePath,JSON.stringify(content))
		res.redirect('/')
    }
}