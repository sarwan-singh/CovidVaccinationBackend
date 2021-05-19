var express = require('express');
var router = express.Router();
const request = require('request-promise').defaults({jar:true});
var cowinDataService = require('../public/javascripts/Services/CowinDataService');

/*  Fetches all states*/
router.get('/getStates', function(req, res, next) {
    var stateOptions = cowinDataService.getStatesOptions();
    request(stateOptions).then(async function(response){
        
        var data = JSON.parse(response);
        data = data.states;
        res.send(data);
    })
});

/*  Fetches all the districts with provided state id */
router.get('/getDistricts/:id', function(req, res, next){
    var stateId = req.params.id;
    var districtOptions = cowinDataService.getDistrictsOptions(stateId);

    request(districtOptions).then(async function(response){
        var data = JSON.parse(response);
        data = data.districts;
        res.send(data);
    })

});

router.get('/sendAlerts', async function(req, res, next){

    cowinDataService.sendAlerts();
    res.send("Successfully sent alerts");

});

module.exports = router;
