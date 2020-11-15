const fs = require('fs');
const path = require('path')
const productJsonFilePath = path.join(__dirname,"../data/products.json")
module.exports = {
    productos : (req, res) => {
        let content = JSON.parse(fs.readFileSync(productJsonFilePath, {encoding: 'utf-8'}))
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