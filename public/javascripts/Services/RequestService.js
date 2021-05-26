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

    getAll : async function(res, type){
        var requestsTrue = await RequestSchema.find({status:true});
        var requestsAll = await RequestSchema.find();
        if(type==1){
            return res.send({requests : requestsTrue});
        }
        if(type==2){
            return res.send({requests : requestsAll});
        }
        if(type==3){
            return res.send({count : requestsAll.length});
        }
        if(type==4){
            return res.send({count : requestsTrue.length});
        }
        if(type==5){
            return res.send({
                countAll : requestsAll.length,
                countTrue : requestsTrue.length,
                allRequests : requestsAll,
                trueRequests : requestsTrue
            })
        }
    },
 
    createRequest : async function(email, age, district, districtName, dose, res){

        var query = {
            email : email,
            age : age,
            district : district,
            dose : dose
        }

        var checkRequest = await RequestSchema.find(query);
        if(checkRequest.length===0){
            var newRequest = new RequestSchema({
                email:email,
                age:age,
                district:district,
                districtName : districtName,
                dose : dose,
                status:false
            });

    
            await newRequest.save();
            
        }else{
            if(checkRequest[0].status){
                return res.send({exist : true});
            }
        }

        await MailService.sendRequestStart(email, age, district, districtName, dose);

        return res.send({exists : false});

    },

    sendMailForDeletion : async function(email, age, district, districtName, dose, res){
        await MailService.sendRequestEnd(email, age, district, districtName, dose);
        return res.send({success: true});
    },

    confirmRequest : async function(email, age, district, dose, res){
        var query = {
            email : email,
            age : age, 
            district : district,
            dose: dose
        }

        var prev = await RequestSchema.find(query);
        
        prev = prev[0];

        prev.status = true;

        await RequestSchema.findOneAndUpdate(query, prev);

        return res.send({message:"Request approval successful. Now you will receive alerts whenever there is an available vaccination center."});
    },

    deleteRequest : async function(email, age, district, dose, res){

        var query = {
            email : email,
            age : age,
            district : district,
            dose : dose
        }

        await RequestSchema.findOneAndDelete(query);

        return res.send({message:"Request termination successful. Now you will no longer receive alerts on this request."});
    }
}