var mongoose=require('mongoose'); 
  
var RequestSchema = new mongoose.Schema({ 
    email : String,
    age : String, 
    district : String,
    districtName : String,
    status : Boolean
}); 
  
module.exports = mongoose.model( 
    'Request', RequestSchema ,'Requests'); 