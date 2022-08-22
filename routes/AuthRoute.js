var express = require('express');
var router = express.Router();
var { getCityList, addcity } = require('../controller/citylistController');
const userLogin = require('../controller/AuthController');

/* GET users listing. */

router.post('/login', userLogin.LogIn); 
router.post('/signUp', userLogin.register); 



module.exports = router;