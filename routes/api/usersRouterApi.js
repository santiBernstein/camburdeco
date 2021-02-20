var express = require('express');
var router = express.Router();
const usersControllerApi = require('../../controllers/api/usersControllerApi');


router.get('/', usersControllerApi.users);

router.get('/:id', usersControllerApi.one);

module.exports = router;