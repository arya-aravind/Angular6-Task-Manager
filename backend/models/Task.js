const mongoose =require('mongoose');
var UserSchema = new mongoose.Schema({  
  // id:String,
     user_id:String,
  user_name:String,
  task_name: String,
  opening_date:Date,
  closing_date:Date,
   
});

mongoose.model('UserTasks', UserSchema);///class.method();

module.exports = mongoose.model('UserTasks');


