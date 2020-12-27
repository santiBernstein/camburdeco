var express = require('express');
var router = express.Router();
const db = require('../database/models');

const fs = require('fs');
const path = require('path')
const productFilePath = path.join(__dirname,"../data/products.json")

router.get('/', (req, res, next) => {
  db.Product.findAll()
    .then((productsData) => {
      res.render('index', {productsData});
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
  });

module.exports = router;
