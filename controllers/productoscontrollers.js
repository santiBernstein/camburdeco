const db = require('../database/models');
const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs')

let allCategories = []
let allColors = []
let allStyles = []

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
            .then(([categories,colors ,styles ] ) => {
                allCategories = categories
                allColors = colors
                allStyles = styles
                res.render('products/create',{
                    categories: allCategories,
                    color: allColors,
                    style: allStyles
                });
            });
    },
    store : async (req, res, next) => {
         let errors = validationResult(req)
         if(errors.errors.length){
             return res.render('products/create', { 
		 		errors : errors.mapped(),
                data : req.body,
                categories: allCategories,
                color: allColors,
                style: allStyles
             })
         }
        db.Product.create({
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category,
            stock: req.body.stock,
            price: req.body.price,
            img: req.file.filename,
            top: 0
        })
        .then(resultado=>{
            let estilos =  (req.body.style.length < 2 )? [req.body.style] : req.body.style 
            estilos.forEach(estiloId=>{
                db.Product_Style.create({
                    product_id: resultado.null,
                    style_id: estiloId
                })
            })
            let colores =  (req.body.color.length < 2 )? [req.body.color] : req.body.color 
            colores.forEach(colorId=>{
                db.Product_Color.create({
                    product_id: resultado.null,
                    color_id: colorId
                })
            })
        })
        .catch((error) => {
            console.log(error);
            return error;
        })   
       res.redirect('/')
    },
    edit : (req, res) => {
        let id = Number(req.params.id);
        let pedidoProduct = db.Product.findByPk(id,{
            include: [{association:"category"}, {association:"style"}, {association:"colores"}]
        })
        let pedidoCategory = db.Category.findAll()
        let pedidoStyle = db.Style.findAll()
        let pedidoColor = db.Color.findAll()
        Promise.all([pedidoProduct, pedidoCategory, pedidoStyle, pedidoColor])
        .then(function([product, categories, styles, colors]){
            res.render('products/edit', { product, categories, styles, colors } )
        })
        .catch(error => {
            console.log(error)
            return error
        })
    },
    update : (req, res) => {
        let errors = validationResult(req)
        if(errors.errors.length){
            console.log(errors.mapped())
            return res.render('products/create', { 
                errors : errors.mapped(),
                data : req.body,
                categories: allCategories,
                color: allColors,
                style: allStyles
            })
        }

        db.Product.update({
            name: req.body.name,
            description: req.body.description,
            category_id: req.body.category,
            stock: req.body.stock,
            price: req.body.price,
            img: req.file.filename,
            top: 0
        }, {
            where: {
                id: req.params.id
            }
        }).then(resultado=>{
            let estilos =  (req.body.style.length < 2 )? [req.body.style] : req.body.style 
            estilos.forEach(estiloId=>{
                db.Product_Style.update({
                    product_id: resultado.null,
                    style_id: estiloId
                },{
                    where: {
                        product_id: req.params.id
                    }
                })
            })
            let colores =  (req.body.color.length < 2 )? [req.body.color] : req.body.color 
            colores.forEach(colorId=>{
                db.Product_Color.create({
                    product_id: resultado.null,
                    color_id: colorId
                },{
                    where: {
                        product_id: req.params.id
                    }
                })
            })
             res.redirect('/')
        })
        .catch((error) => {
            console.log(error);
            return error;
        })   
      
     
    },
    destroy : (req,res) => {
        db.Product.findByPk(req.params.id)
        .then(resultado=>{
            const imagePath = path.join(__dirname,"../public/images",resultado.img);
            fs.unlink(imagePath, function (err) {
                  if (err) throw err;
            })
            db.Product_Color.destroy({
                where: {
                    product_id : req.params.id
                }
            })
        })
        .then(resultado => {
            db.Product_Style.destroy({
                where: {
                    product_id: req.params.id
                }
            })
        })
        .then(resultado=> {
            db.Product_Carrito.destroy({
                where: {
                    product_id: req.params.id
                }
            })
        })
        .then(resultado=>{
            db.Product.destroy({
                where: { 
                    id: req.params.id 
                },
                include: [
                    {association:"category"},
                    {association:"style"},
                    {association:"colores"}
                ]
            })
        })
        .then(resultado => {
            res.redirect('/')
        })
        .catch(error=>{
            console.log(error)
            return error;
        })
		
    }
}