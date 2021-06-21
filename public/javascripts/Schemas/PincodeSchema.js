var mongoose=require('mongoose'); 
  
var PincodeSchema = new mongoose.Schema({ 
    email : String,
    age : String,
    pincode : String,
    dose : String,
    status : Boolean
}); 
  
module.exports = mongoose.model('Pincode', PincodeSchema ,'PincodeRequest'); 