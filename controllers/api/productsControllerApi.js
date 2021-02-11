const db = require('../../database/models');


module.exports = {

    productos : (req, res) => {
                
        db.Product.findAll({
            
            include: [{association:"category"}, {association:"style"}, {association:"colores"}]

                        
        })
        
        .then((productsData) => {            

            for (let i = 0; i < productsData.length; i++){
                productsData[i].setDataValue("endpoint", "http://localhost:3000/api/products/" + productsData[i].id)
            }

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
                        
            productsData.setDataValue("endpointImg", "http://localhost:3000/images/" + productsData.img);
            let resultado = productsData;
            res.json(resultado)
        })
        
    } 

}