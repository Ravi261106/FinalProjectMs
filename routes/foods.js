var express = require('express');
var router = express.Router();
var { getfood, addfood } = require('../controller/FoodController');

/* GET users listing. */

router.get('/', function (req, res, next) {
    getfood(req, res, next);
});

router.get('/getfood', function (req, res, next) {
    getfood(req, res, next);
});

router.post('/addfood', function (req, res, next) {
    addfood(req, res, next);
});

module.exports = router;