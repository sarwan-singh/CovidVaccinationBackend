var Functions = require('../Functions')
var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

const url = "mongodb+srv://covid:Qwerty123@covidvaccination.dfspb.mongodb.net/covid?retryWrites=true&w=majority"

const connectionParams = {
    useNewUrlParser: true, 
    useCreateIndex: true, 
    useUnifiedTopology: true,
    useFindAndModify : false
  }


mongoose.Promise = global.Promise;

mongoose.connect(url, connectionParams, function(error){
    if(error){
        console.log("Error!" + error);
    }
})
module.exports = router;
