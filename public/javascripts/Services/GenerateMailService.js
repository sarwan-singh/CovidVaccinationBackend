const { UnavailableForLegalReasons } = require('http-errors');
var Functions = require('../Functions');
var SecurityService = require('../Services/SecurityService');

module.exports={
    generateEmailStart : function(email, age, district, districtName){
        var result = "<p><h3>Hello "+ email + "</h3></p><p>We have received a request for vaccination centers availability alerts on your mail with district of <b>" + districtName + "</b> with minimum age limit of <b>" + age + "</b>.</p>" + "<p>Kindly click <b><a href='" + Functions.getMidUrl() + "confirmRequest?email="+SecurityService.encrypt(email)+"&age="+SecurityService.encrypt(age)+"&district="+SecurityService.encrypt(""+district)+"'>here</a></b> to confirm the request.<p><p>If its not you, ignore the mail</p>";
        return result;
    },

    generateEmailEnd : function(email, age, district, districtName){
        var result = "<p><h3>Hello "+ email + "</h3></p><p>We have received a request for termination of vaccination centers availability alerts on your mail with district of <b>" + districtName + "</b> with age limits of <b>" + age + "</b>.</p>" + "<p>Kindly click <b><a href='" + Functions.getMidUrl() + "deleteRequest?email="+SecurityService.encrypt(email)+"&age="+SecurityService.encrypt(age)+"&district="+SecurityService.encrypt(""+district)+"'>here</a></b> to confirm the request.<p><p>If its not you, ignore the mail</p>";
        return result;
    },

    generateEmailMid : function(email, age, district, districtName, centers){
        var result = '<table">'+
                '<tr>'+
                    '<td><p><h3>Hello '+email+'</h3></p></td>'+
                '</tr>'+
                '<tr>'+
                    '<td><p>Vaccines are available in your '+districtName+'. Click <a href="https://www.cowin.gov.in/home">here</a> to book you slot now. Here below are the available centers for minimum '+age+' years : </p></td>'+
                '</tr>'+
            '</table>'

    for(var i=0;i<centers.length;i++){
        var value = centers[i];

        var colorFee = "";

        if(value.fee=="Free"){
            colorFee = "green";
        }else{
            colorFee = "#F74B00";
        }

        result = result + '<table style="background-color: #ffffff; width: 96%; margin-left: 2%; margin-right: 2%; padding: 10px; border-bottom: 1px solid black;">'+

        '<tr>'+
            '<td style="color: #192bc2; font-size: large;"><b>'+value.name+'</b></td>'+
            '<td style="float: right; font-size: medium; padding-top: 3px;"><b>'+value.from+ '-' +value.to+'</b></td>'+
        '</tr>'+
        '<tr>'+
            '<td style="font-size:small;">'+value.address+'</td>'+
            '<td style="font-size:small; float:right;">'+value.pincode+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td >Age : '+value.min_age_limit+'</td>'+
            '<td style="float: right;">Fee : <b><span style="color:'+colorFee+';">'+value.fee+'</span><b></td>'+
        '</tr>'+
        '<tr>'+
            '<td >Vaccines available : <span style="color:#F74B00;"><b>'+value.available+'</b></span></td>'+
            '<td style="float: right;">Vaccine : '+value.vaccine+'</td>'+
        '</tr>'+
        '<tr>'+
            '<td colspan="2" style="text-align: center;"><b>Block : '+value.block+', '+value.district+'</b></td>'+
        '</tr>'+
    '</table>'
    }
    
    result = result + '<table">'+
       '<tr><td ><p>Book your slot now, click <a href="https://www.cowin.gov.in/home">here</a></p></td></tr>'+

       '<tr><td ><p>If you want to disable alerts, click <a href="'+ Functions.getUrl() + 'deleteRequest?email='+SecurityService.encrypt(email)+'&age='+SecurityService.encrypt(age)+'&district='+SecurityService.encrypt(district)+'">here</a></p></td></tr>'+
        
        '<tr><td ><p><b>Covid vaccination help Team</b></p></td></tr>'+
    '</table>'

        return result;
    }
}