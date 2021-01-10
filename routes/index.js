var express = require('express');
var router = express.Router();
const db = require('../database/models');

router.get('/', (req, res, next) => {
  db.Product.findAll({
    order: [
      ["top","DESC"]
    ],
    limit: 8
  })
    .then((productsData) => {

      res.render('index', {productsData});
    })
    .catch((error) => {
      console.log(error);
      return error;
    })
  });

module.exports = router;
