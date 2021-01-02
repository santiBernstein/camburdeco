const fs = require('fs');
const path = require('path')
//const productFilePath = path.join(__dirname,"../data/products.json")
const db = require('../database/models');
const {validationResult} = require('express-validator');

module.exports = {
    productos : (req, res) => {
        
         //let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}))
         db.Product.findAll()
         .then((productsData) => {
            let filtro = {
                category: 'todos',
                options: 'mas-vendidos'
            };
            let categorias = ['todos','macetas','ceniceros','luminaria','plantas','velas']
            
            if(req.query.category != categorias[0] && req.query.category != undefined){
                productsData = productsData.filter(function(product){
                    return product.category == req.query.category
                })
                filtro.category=req.query.category;
            }
            let opciones = ['mas-vendidos','menor-precio','mayor-precio','menor-tamaño','mayor-tamaño']
    
            res.render('products/products', {filtro,categorias,opciones,productsData}); 
         })
         .catch((error) => {
             console.log(error);
             return error;
         })   
        

        // switch (req.query.options){
        //     case opciones[0]:
        //         content = content.sort(function(a,b){
        //             if(a.ventas > b.ventas){
        //                 return 1;
        //             }
        //             if(a.ventas < b.ventas){
        //                 return -1;
        //             }
        //             return 0;
        //         } );
        //         filtro.options=req.query.options;
        //         break;
        //     case opciones[1]:
        //         content = content.sort(function(a,b){
        //             if(Number(a.price) > Number(b.price)){
        //                 return 1;
        //             }
        //             if(Number(a.price) < Number(b.price)){
        //                 return -1;
        //             }
        //             return 0;
        //         } );
        //         filtro.options=req.query.options
        //         break;
        //     case opciones[2]:
        //         content = content.sort(function(a,b){
        //             if(Number(a.price) < Number(b.price)){
        //                 return 1;
        //             }
        //             if(Number(a.price) > Number(b.price)){
        //                 return -1;
        //             }
        //             return 0;
        //         } );
        //         filtro.options=req.query.options
        //         break;
        //     case opciones[3]:
        //         content = content.sort(function(a,b){
        //             if(a.size < b.size){
        //                 return 1;
        //             }
        //             if(a.size > b.size){
        //                 return -1;
        //             }
        //             return 0;
        //         } );
        //         filtro.options=req.query.options
        //         break;
        //     case opciones[4]:
        //         content = content.sort(function(a,b){
        //             if(a.size > b.size){
        //                 return 1;
        //             }
        //             if(a.size < b.size){
        //                 return -1;
        //             }
        //             return 0;
        //         } );
        //         filtro.options=req.query.options
        //         break;
        //     default:
        //         filtro.options="mas-vendidos"
        //         break;
        //     }
       
    },
    detail : (req, res) => {
        //let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));
        let ids = Number(req.params.id);
        // let dataEstilo = content[ids].style
        

        db.Product.findByPk(ids, {
            //include: [{association:"style"}, {association:"color"}, {association:"category"}]
            include: [{association:"category"}, {association:"style"}, {association:"colores"}]
        })
        .then((productsData) =>{
            let dataEstilo = [];
            let final = productsData.dataValues.style.length;
            for (i=0; i<final; i++) {
                dataEstilo = dataEstilo + productsData.style[i].name;
                if (i<final-1) {
                    dataEstilo = dataEstilo + ","
                }
            };
            dataEstilo = dataEstilo.split(',');
            let dataColor = [];
            final = productsData.dataValues.colores.length;
            for (i=0; i<final; i++) {
                dataColor = dataColor + productsData.colores[i].name;
                if (i<final-1) {
                    dataColor = dataColor + ","
                }
            }
            dataColor = dataColor.split(',');
            res.render('products/detail', { productsData, dataEstilo, dataColor });
        })
    },
    create : (req, res) => {
        db.Product.findAll({
            include: [{association:"style"}, {association:"color"}, {association:"category"}]
        })
        .then(function(product){
            res.render('products/create',{product})

        })
        
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

        db.Products.create({

            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            style: req.body.style,
            color: req.body.color,
            stock: req.body.stock,
            price: req.body.price,
            img: req.files[0].filename,
            top: req.body.top 
        })
       
       res.redirect('/')
       
    },
    edit : (req, res) => {
        //let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));
        // let ids = Number(req.params.id);
        // content = content[req.params.id];
        
        let pedidoProduct = db.Products.findByPk(req.params.id)

        let pedidoCategory = db.Categories.findAll()

        let pedidoStyle = db.Product_Style.findAll()

        let pedidoColor = db.Product_Color.findAll()

        Promise.all([pedidoProduct, pedidoCategory, pedidoStyle, pedidoColor])
        .then(function([product, category, style, color]){
            res.render('products/edit', { product, category, style, color } )
        })
       
    },
    update : (req, res) => {
        //let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));
        // let ids = Number(req.params.id) - 1;
        

        // content[ids].name = req.body.name;
		// content[ids].category = req.body.category;
		// content[ids].price = req.body.price;
		// content[ids].stock = req.body.stock; 
        // content[ids].style.splice(0,content[ids].style.length-1,req.body.style);
        // content[ids].color.splice(0,content[ids].style.length-1,req.body.color); 
        // content[ids].description = req.body.desciption;
        // content[ids].img = req.files[0].filename;
        
        db.Products.update({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            style: req.body.style,
            color: req.body.color,
            stock: req.body.stock,
            price: req.body.price,
            img: req.files[0].filename,
            top: req.body.top 
        }, {
            where: {
                id: req.params.id
            }
        })
		res.redirect('/')
    },
    destroy : (req,res) => {
        //let content = JSON.parse(fs.readFileSync(productFilePath, 'utf-8'));
		//  const imagePath = path.join(__dirname,"../public/images",content[(Number(req.params.id)-1)].img);
        //  console.log(imagePath)
        //  fs.unlink(imagePath, function (err) {
		//  	if (err) throw err;
		//  	console.log('File deleted!');
		//  })
		 //content.splice((Number(req.params.id)-1),1)
		 //let i=1;
		 //content.forEach(product=>product.id = i++)
        // fs.writeFileSync(productFilePath,JSON.stringify(content))
        
        db.Products.destroy({
            where: { id: req.params.id }
        })
        .then()
		res.redirect('/')
    }
}