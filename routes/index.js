var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const Functions = require('../public/javascripts/Functions');
const request = require('request-promise');



/* GET home page. */
router.get('/', async function(req, res, next) {
    res.send("API RUNNING!!!");
});

module.exports = router;
