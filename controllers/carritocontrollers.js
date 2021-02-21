const db = require('../database/models');
const {validationResult} = require('express-validator');
const path = require('path');
const fs = require('fs');

module.exports = {

    cart : (req, res) => {  

        db.Product.findAll({
          where: {
            // userId: req.session.user.id,
            // state: 1,
          },
          include: [{association:"category"}, {association:"style"}, {association:"colores"}],
        }).then((productsData) => {
          return res.render('carrito/carrito', {productsData})
        });
    },

    addToCart : (req, res) => {
        const errors = validationResult(req);
    
        if (errors.isEmpty()) {
          // Busco el producto que voy a agregar como Item.
          db.Product.findByPk(req.body.productId, {
            include: [{association:"category"}, {association:"style"}, {association:"colores"}],
          })
            .then((product) => {
                  
              // Creo el Item de compra
              return productsData.create({
                // salePrice: price,
                // quantity: req.body.quantity,
                // subTotal: price * req.body.quantity,
                // state: 1,
                // userId: req.session.user.id,
                // sellerId: product.user.id,
                // productId: product.id,
              });
            })
            .then((item) => res.redirect("/carrito/carrito"))
            .catch((e) => console.log(e));
        } else {
           Product.findByPk(req.body.productId, {
            include: [{association:"category"}, {association:"style"}, {association:"colores"}],
            
           })
             .then(product => {
                return res.render('products/detail', {product, errors: errors.mapped()})
             })
        }
    },

    deleteFromCart : (req, res) => {
        Item.destroy({
          where: {
            id: req.body.itemId,
          },
          force: true,
        })
          .then((response) => res.redirect("/carrito/carrito"))
          .catch((e) => console.log(e));
      },

    send : (req, res) => {
        res.render('carrito/send')
    }
}