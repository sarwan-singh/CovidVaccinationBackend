var express = require('express');
var router = express.Router();
var MailService = require('../public/javascripts/Services/MailService');
var SecurityService = require('../public/javascripts/Services/SecurityService');

/* Sending mail to user to confirm the start of request. */
router.post('/sendRequestStart', function(req, res, next){
    var email = req.body.email;
    var district = req.body.district;
    var age = req.body.age;
    var dose  = req.body.dose
    MailService.sendRequestStart(email, district, age, dose);
});

/* Senging mail to use to confirm the end of request. */
router.post('/sendRequestEnd', function(req, res, next){
    var email = req.body.email;
    var district = req.body.district;
    var age = req.body.age;
    var dose = req.body.dose;
    MailService.sendRequestEnd(email, district, age, dose);
});

module.exports = router;
