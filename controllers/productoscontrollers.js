const db = require('../database/models');
const {validationResult} = require('express-validator');

module.exports = {
    productos : (req, res) => {
        let opciones = [{
            id: 0,
            name:'MAS VENDIDOS',
            op: ['top','DESC']
        },
        {
            id: 1,
            name:'MENOR PRECIO',
            op: ['price','ASC']
        },
        {
            id: 2,
            name:'MAYOR PRECIO',
            op: ['price','DESC']
        }
        ]

        let categoryIndex = 0;
        if(req.query.category != undefined){
            categoryIndex = req.query.category
        }
        let optionsIndex = opciones[0]
        if(req.query.options != undefined){
            optionsIndex = opciones[req.query.options]
        }
        let pedidoCategory = db.Category.findAll()
        let pedidoProduct = [];
        if(categoryIndex == 0){
            pedidoProduct = db.Product.findAll({
                order: [optionsIndex.op]
            })
        }else{
            pedidoProduct = db.Product.findAll({
                where: {
                    category_id : categoryIndex
                },
                order: [
                    optionsIndex.op
                ]
            })
        }
        Promise.all([pedidoCategory,pedidoProduct])
         .then(([categorias,productsData]) => {
            categorias.unshift({id: 0, name: 'TODOS'})
            let filtro = {
                category: categorias[categoryIndex].name,
                options: optionsIndex.name
            };
            res.render('products/products', {filtro,categorias,opciones,productsData}); 
         })
         .catch((error) => {
             console.log(error);
             return error;
         })   
       
    },
    detail : (req, res) => {
        let ids = Number(req.params.id);
        db.Product.findByPk(ids, {
            include: [{association:"category"}, {association:"style"}, {association:"colores"}]
        })
        .then((productsData) =>{
            let dataEstilo = productsData.style
            let dataColor = productsData.colores
            res.render('products/detail', { productsData, dataEstilo, dataColor });
        })
    },
    create : (req, res) => {
        let categoriesPromise = db.Category.findAll();
        let colorsPromise = db.Color.findAll();
        let stylePromise = db.Style.findAll();

        Promise
            .all([categoriesPromise,colorsPromise,stylePromise])
            .then(([categories, color, style] ) => {
                //console.log(categories, color, style)
                //  categories = result[0],                
                //     color = result[1],             
                //     style = result[2];

                res.render('products/create',{categories,color,style});
            });
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
         
        db.Product.create({

            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category,
            // style: req.body.style,
            // color: req.body.color,
            stock: req.body.stock,
            price: req.body.price,
            img: req.files[0].filename,
            top: 0 
        })
        .catch((error) => {
            console.log(error);
            return error;
        })   

        
        // for 
        // db.Product_Style.create({

        // })
        // for
        // db.
       
       res.redirect('/')
       
    },
    edit : (req, res) => {
        //let content = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}));
        // let ids = Number(req.params.id);
        // content = content[req.params.id];
        
        let pedidoProduct = db.Product.findByPk(req.params.id)

        let pedidoCategory = db.Category.findAll()

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