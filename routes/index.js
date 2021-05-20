var express = require('express');
var router = express.Router();
const fetch = require("node-fetch");
const schedule = require('node-schedule');
const Functions = require('../public/javascripts/Functions');
const request = require('request-promise');

const job = schedule.scheduleJob('*/30 * * * *',async function(){
    request.get(Functions.getUrl()+'sendAlerts').then(function(body){
      console.log("Checked for vaccinations");
    })
  });

  
/* GET home page. */
router.get('/', async function(req, res, next) {
    res.send("API RUNNING!!!");
});

module.exports = router;
