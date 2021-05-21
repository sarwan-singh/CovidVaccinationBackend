var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const Functions = require('../public/javascripts/Functions');
const request = require('request-promise');
const schedule = require('node-schedule')

var event = schedule.scheduleJob("*/30 * * * *", function() {
    request.get('https://covidvaccinationalerts-env-1.eba-hgbvgfjc.ap-south-1.elasticbeanstalk.com/sendAlerts').then(function(body){
    console.log("Vaccination requests sent!!!");
  })
});

/* GET home page. */
router.get('/', async function(req, res, next) {
    res.send("API RUNNING!!!");
});

module.exports = router;
