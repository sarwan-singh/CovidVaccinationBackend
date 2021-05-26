var express = require('express');
var router = express.Router();
const request = require('request-promise').defaults({jar:true});
var RequestService = require('../public/javascripts/Services/RequestService');
var SecurityService = require('../public/javascripts/Services/SecurityService');

/* Fetch all requests */
router.get('/all', function(req, res, next){
    RequestService.getAll(res, 1);
})

/* Fetch all requests which are active */
router.get('/allTrue', function(req, res, next){
    RequestService.getAll(res, 2);
})

/* Fetch count of requests */
router.get('/countAll', function(req, res, next){
    RequestService.getAll(res, 3);
})

/* Fetch count of requests which are active */
router.get('/countAllTrue', function(req, res, next){
    RequestService.getAll(res, 4);
})

/* Fetch all details at once */
router.get('/fullAdmin', function(req, res, next){
    RequestService.getAll(res, 5);
})

module.exports = router;
