var express = require('express');
var router = express.Router();

const fs = require('fs');
const path = require('path')
const productFilePath = path.join(__dirname,"../data/products.json")

router.get('/', (req, res, next) => {
  let productsData = JSON.parse(fs.readFileSync(productFilePath, {encoding: 'utf-8'}))
    res.render('index', {productsData});
  });

module.exports = router;
