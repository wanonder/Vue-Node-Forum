var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  
  "userName":String,
  "userPwd": String,
  'userEmail':String,
  'userImg':{type:String,default:'default.jpg'},
  'company':String,
  'blog':String,
  'github':String,
  'city':String,
  'school':String,


});

module.exports = mongoose.model('User',userSchema,'users');