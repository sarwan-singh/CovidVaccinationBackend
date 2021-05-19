var nodemailer = require('nodemailer');
var Functions = require('../Functions');
var SecurityService = require('./SecurityService');
var GenerateMailService = require('./GenerateMailService')

function generateMailOptions(email, age, district, districtName, type, centers){
    var mailOptions = {
        from: 'helpsws2.0@gmail.com',
        to: email,
        subject: '',
        html: ""
    };

    if(type==1){
      mailOptions.html = GenerateMailService.generateEmailStart(email, age, district, districtName);
      mailOptions.subject = "Confirmation for creating request";
    }
    if(type==2){
      mailOptions.html = GenerateMailService.generateEmailMid(email, age, district, districtName, centers);
      mailOptions.subject = "Hurry up! Vaccines are available";
    }
    if(type==3){
      mailOptions.html = GenerateMailService.generateEmailEnd(email, age, district, districtName);
      mailOptions.subject = "Confirmation for deleting request";
    }

      return mailOptions;
}

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'help.covidvaccination@gmail.com',
      pass: 'Qwerty@100'
    }
});

module.exports = {

    sendRequestStart : async function(email, age, district, districtName, content = []){
      transporter.sendMail(generateMailOptions(email, age, district, districtName, 1, content), function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    },

    sendRequestEnd : async function(email, age, district, districtName, content = []){
      transporter.sendMail(generateMailOptions(email, age, district, districtName, 3, content), function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    },

    sendAlert : async function(email, age, district, districtName, centers){
      transporter.sendMail(generateMailOptions(email, age, district, districtName, 2, centers),  function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
    }
}