var express = require('express');
var router = express.Router();
const request = require('request-promise').defaults({jar:true});
var RequestService = require('../public/javascripts/Services/RequestService');
var SecurityService = require('../public/javascripts/Services/SecurityService');

/* Fetch all requests with the provided email */
router.get('/request', function(req, res, next){
    var email = req.query.email;
    RequestService.getRequest(email, res);
})

/* Creates a request with provided details but status is false */
router.post('/request', function(req, res, next) {
    var email = req.body.email;
    var age = req.body.age;
    var district =  req.body.district;
    var districtName = req.body.districtName;
    var dose = req.body.dose;
    RequestService.createRequest(email, age, district, districtName, dose, res);
});

router.delete('/request', function(req, res, next){
    console.log(req.body)
    var email  = req.body.email;
    var age = req.body.age;
    var district = req.body.district;
    var districtName = req.body.districtName;
    var dose = req.body.dose;
    RequestService.sendMailForDeletion(email, age, district, districtName, dose, res);
});

/* Updates status as true with provided details */
router.get('/confirmRequest', function(req, res, next){
    var email = SecurityService.decrypt(req.query.email);
    var age = SecurityService.decrypt(req.query.age);
    var district = SecurityService.decrypt(req.query.district);
    var dose = SecurityService.decrypt(req.query.dose);
    RequestService.confirmRequest(email, age, district, dose, res);
});

/* Deletes a request with provided details */
router.get('/deleteRequest', function(req, res, next) {
    var email = SecurityService.decrypt(req.query.email);
    var age = SecurityService.decrypt(req.query.age);
    var district = SecurityService.decrypt(req.query.district);
    var dose = SecurityService.decrypt(req.query.dose); 
    RequestService.deleteRequest(email, age, district, dose, res);
});

module.exports = router;
