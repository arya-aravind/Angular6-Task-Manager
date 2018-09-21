const mongoose =require('mongoose');
var UserSchema = new mongoose.Schema({  
  // id:String,
     user_id:String,
  email:String,
  password: String,
  
   
});

mongoose.model('UserPassword', UserSchema);///class.method();

module.exports = mongoose.model('UserPassword');


