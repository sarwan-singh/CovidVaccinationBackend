var Functions = require('../Functions');
var MailService = require('./MailService');
var RequestSchema = require('../Schemas/RequestSchema');
const request = require('request-promise').defaults({jar:true});

module.exports = {
    getStatesOptions : function(){
        var Options = {
            method : "GET",
            uri : Functions.generateStateURL(),
        };
        return Options;
    },

    getDistrictsOptions : function(id){
        var Options = {
            method : "GET",
            uri : Functions.generateDistrictURL(id),
        };
        return Options;
    },

    getVaccinationCentersOptions : async function(id){
        var Options = {
            method : "GET",
            uri : Functions.generateVaccinationCentersURL(id)
        };
        return Options;
    },

    sendAlerts : async function(){
        var query = {
            status : true
        }

        var requests = await RequestSchema.find(query);

        requests.map(async (user)=>{
            var options = {
                method : "GET",
                uri : await Functions.generateVaccinationCentersURL(user.district)
            }

            request(options).then(async function(response){
                var data = JSON.parse(response);
                var vaccineAvailableCenters = [];
                data.centers.map((value)=>{
                    value.sessions.map((session)=>{
                        var center;
                        var status = false;
                        if(user.age==0){
                            if(status){
                                
                                if(user.dose=='1'){
                                    center.available+=session.available_capacity_dose1;
                                }else if(user.dose=='2'){
                                    center.available+= session.available_capacity_dose2;
                                }else{
                                    center.available += session.available_capacity; 
                                }
                            }else{
                                status = true;
                                if(session.available_capacity!=0){
                                    center = {
                                        name : value.name,
                                        address : value.address,
                                        district : value.district_name,
                                        block : value.block_name,
                                        pincode : value.pincode,
                                        from : value.from,
                                        to : value.to,
                                        fee : value.fee_type,
                                        min_age_limit : session.min_age_limit,
                                        available : session.available_capacity,
                                        vaccine : session.vaccine
                                    }

                                    if(user.dose=='1'){
                                        center.available=session.available_capacity_dose1;
                                    }else if(user.dose=='2'){
                                        center.available = session.available_capacity_dose2;
                                    }
                                    if(center.available>0){
                                        vaccineAvailableCenters.push(center);
                                    }
                                    return;
                                }
                            }
                        }else{
                            if(status){
                                if(user.dose=='1'){
                                    center.available+=session.available_capacity_dose1;
                                }else if(user.dose=='2'){
                                    center.available+= session.available_capacity_dose2;
                                }else{
                                    center.available += session.available_capacity; 
                                }
                            }else{
                                if(session.available_capacity!=0&&session.min_age_limit==user.age){
                                    status = true;
                                    center = {
                                        name : value.name,
                                        address : value.address,
                                        district : value.district_name,
                                        block : value.block_name,
                                        pincode : value.pincode,
                                        from : value.from,
                                        to : value.to,
                                        fee : value.fee_type,
                                        min_age_limit : session.min_age_limit,
                                        available : session.available_capacity,
                                        vaccine : session.vaccine
                                    }
                                    if(user.dose=='1'){
                                        center.available=session.available_capacity_dose1;
                                    }else if(user.dose=='2'){
                                        center.available = session.available_capacity_dose2;
                                    }
                                    if(center.available>0){
                                        vaccineAvailableCenters.push(center);
                                    }
                                    return;
                                }
                            }
                        }
                    })
                });
                if(vaccineAvailableCenters.length!=0){
                    MailService.sendAlert(user.email, user.age, user.district, user.districtName, user.dose, vaccineAvailableCenters);
                }
            })

        })
    },

};

