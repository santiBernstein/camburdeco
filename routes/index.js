const productsData = require('../data/products.json')
var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index', {productsData});
  });

module.exports = router;
