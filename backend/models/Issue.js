const mongoose =require('mongoose');
var UserSchema = new mongoose.Schema({  
  // id:String,
    email: String,
    firstName: String,
    lastName: String,
   
});

mongoose.model('Users', UserSchema);///class.method();

module.exports = mongoose.model('Users');


