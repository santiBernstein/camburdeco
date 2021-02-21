const db = require('../../database/models');


module.exports = {

    productos : (req, res) => {   
        db.Product.findAll({
            include: [{association:"category"}, {association:"style"}, {association:"colores"}]     
        })
        
        .then((productsData) => {            

            productsData.forEach(product=>{
                product.setDataValue("endpoint", `http://localhost:${process.env.PORT || '3000'}/api/products/${product.id}`)
                product.setDataValue("endpointImg", `http://localhost:${process.env.PORT || '3000'}/images/` + product.img);
                product.dataValues.category = product.dataValues.category.name;
                delete product.dataValues.category_id;
            })
                

            let resultado = {
                meta: {
                    status: 200,
                    total: productsData.length,
                    url: "/api/products/"
                },
                data: productsData
            };

            res.json(resultado);
             
         })
         .catch((error) => {
             console.log(error);
             return error;
         })   
       
    }, 
    find : (req, res) => {
        let ids = Number(req.params.id);
        db.Product.findByPk(ids, {
            include: [{association:"category"}, {association:"style"}, {association:"colores"}]
        })
        .then((productsData) =>{
                        
            productsData.setDataValue("endpointImg", `http://localhost:${process.env.PORT || '3000'}/images/` + productsData.img);
            let resultado = productsData;
            res.json(resultado)
        })
        
    },
    categorias:(req,res)=>{
        db.Category.findAll({
            include: [{association:"products"}]
        })
            .then((categoriesData)=>{
                let resultado = {
                    meta: {
                        status: 200,
                        total: categoriesData.length,
                        url: "/api/products/categorias"
                    },
                    data: categoriesData
                }
                res.json(resultado)
            })
    } 

}