const url = "mongodb+srv://covid:Qwerty123@Covidvaccination.dfspb.mongodb.net/covid?retryWrites=true&w=majority"

const connectionParams = {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true
}

const updateAndCreate = {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
}

var localHostUrl = "http://localhost:8000/";
var hostedUrl = "http://ec2-13-232-244-38.ap-south-1.compute.amazonaws.com:8000/";

var midLocalUrl = "http://localhost:1000/"
var midHostedUrl = "https://covidvaccinationalerts.herokuapp.com/";
const request = require('request-promise').defaults({jar:true});

var dateAPIURL = "http://api.timezonedb.com/v2.1/get-time-zone?key=K076A7YW6A1Z&format=json&by=zone&zone=Asia/Kolkata";

var stateUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/states";

var districtUrl = "https://cdn-api.co-vin.in/api/v2/admin/location/districts/";

var vaccinationCentersURL = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=";



module.exports = {

    getUrl : function(){
        return hostedUrl;
    },

    getMidUrl : function(){
        return midHostedUrl;
    },

    getMongoUrl : function(){
        return url;
    },
    
    getConnectionParams : function(){
        return connectionParams;
    },
    
    getUpdateAndCreate : function(){
        return updateAndCreate;
    },

    generateStateURL : function(){
        return stateUrl;
    },

    generateDistrictURL : function(id){
        return districtUrl+id;
    },

    generateVaccinationCentersURL : async function(id, date){
        var generatedURL = vaccinationCentersURL + id + "&date=" + date;
        return generatedURL;
    },
    getCurrentIndianDate : async function(){
        var date = "";
    
        var Options = {
            method : "GET",
            uri : dateAPIURL
        }
    
        await request(Options).then(async function(response){
            var response = JSON.parse(response);
            response = response.formatted.split(' ');
            response = response[0];
            date = response;
        });
    
        date = date.split('-');
    
        date = date[2] + "-" + date[1] + "-" + date[0];
    
        return date;
    }
}