const db = require('../database/models');
const repo = require('../repositories/userRepository')
module.exports = {

    cart : (req, res) => {  

        db.Product.findAll()

        .then(allProducts => {
          
          let products = []
          if (req.session.productIdes != undefined){            
          
              req.session.productIdes.forEach(id => {
                products = products.concat(allProducts.filter(product => {
                     return product.id == id 
              })
             )            
          });
         }
          console.log(products)
          let subTotal = repo.sumaSubTotal(products)
          
            return res.render('carrito/carrito', {productsData : products, subTotal})

        })   
 
        
     .catch((e) => console.log(e));

    },

    addToCart : (req, res) => {

                        
              if (req.session.productIdes == undefined){
                req.session.productIdes = []
              }
              req.session.productIdes.push(req.body.productId)
              
              res.redirect('/carrito')
                
   },

    deleteFromCart : (req, res) => {
        
      console.log(req.body.productId)
      req.session.productIdes.shift(req.body.productId)
          
      res.redirect('/carrito')
      },

    send : (req, res) => {
        res.render('carrito/send')
    }
}