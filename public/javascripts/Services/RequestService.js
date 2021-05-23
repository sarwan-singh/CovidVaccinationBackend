var RequestSchema = require('../Schemas/RequestSchema'); 
var MailService = require('../Services/MailService');

module.exports = {
    getRequest : async function(email, res){

        var query = {
            email : email,
            status : true
        }

        var requests = await RequestSchema.find(query);

        return res.send({requests : requests});
    },
 
    createRequest : async function(email, age, district, districtName, res){

        var query = {
            email : email,
            age : age,
            district : district
        }

        var checkRequest = await RequestSchema.find(query);
        if(checkRequest.length===0){
            var newRequest = new RequestSchema({
                email:email,
                age:age,
                district:district,
                districtName : districtName,
                status:false
            });
    
            await newRequest.save();
            
        }else{
            if(checkRequest[0].status){
                return res.send({exist : true});
            }
        }

        await MailService.sendRequestStart(email, age, district, districtName);

        return res.send({exists : false});

    },

    sendMailForDeletion : async function(email, age, district, districtName, res){
        await MailService.sendRequestEnd(email, age, district, districtName);
        return res.send({success: true});
    },

    confirmRequest : async function(email, age, district, res){
        var query = {
            email : email,
            age : age, 
            district : district
        }
        var prev = await RequestSchema.find(query);
        
        prev = prev[0];

        prev.status = true;

        await RequestSchema.findOneAndUpdate(query, prev);

        return res.send({message:"Request approval successful. Now you will recieve alerts whenever there is an available vaccination center."});
    },

    deleteRequest : async function(email, age, district, res){

        var query = {
            email : email,
            age : age,
            district : district
        }

        await RequestSchema.findOneAndDelete(query);

        return res.send({message:"Request termination successful. Now you will no longer receive alerts on terminated request."});
    }
}