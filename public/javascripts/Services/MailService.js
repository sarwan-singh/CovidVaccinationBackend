var nodemailer = require('nodemailer');
var Functions = require('../Functions');
var SecurityService = require('./SecurityService');
var GenerateMailService = require('./GenerateMailService')

function generateMailOptions(from, email, age, district, districtName, dose, type, centers){
    var mailOptions = {
        from: from,
        to: email,
        subject: '',
        html: ""
    };

    if(type==1){
      mailOptions.html = GenerateMailService.generateEmailStart(email, age, district, districtName, dose);
      mailOptions.subject = "Confirmation for creating request";
    }
    if(type==2){
      mailOptions.html = GenerateMailService.generateEmailMid(email, age, district, districtName, dose, centers);
      mailOptions.subject = "Hurry up! Vaccines are available";
    }
    if(type==3){
      mailOptions.html = GenerateMailService.generateEmailEnd(email, age, district, districtName, dose);
      mailOptions.subject = "Confirmation for deleting request";
    }

      return mailOptions;
}

var emails = ["help.covidvaccination@gmail.com", "help.covidvaccination2@gmail.com", "help.covidvaccination3@gmail.com", "help.covidvaccination4@gmail.com"];

async function sendMail(email, age, district, districtName, dose, type, content, i=0){
    var from = "";
    from = emails[i];
    let transporter = await nodemailer.createTransport({
      service: 'gmail',
      secure: true,
      pool: true,
      auth: {
        user: emails[i],
        pass: 'Qwerty@100'
      }
    })

    let temp = await transporter.sendMail(generateMailOptions(from, email, age, district, districtName, dose, type, content), function(error, info){
      if (error) {
        if(i==4){
          console.log("ALLL SERVERS FULL!!!");
        }else{
          sendMail(email, age, district, districtName, dose, type, content, i+1);
        }
      } else {
      }
    });
  
}


module.exports = {

    sendRequestStart : async function(email, age, district, districtName, dose, content = []){
      sendMail(email, age, district, districtName, dose, 1, content)
    },

    sendRequestEnd : async function(email, age, district, districtName, dose, content = []){
      sendMail(email, age, district, districtName, dose, 3, content)
    },

    sendAlert : async function(email, age, district, districtName, dose, centers){
      sendMail(email, age, district, districtName, dose, 2, centers)
    }
}