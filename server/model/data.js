var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var dataSchema = new Schema({
  "id":{type:String},
  "author_id":String,
  "tab":String,
  "content":String,
  "title":String,
  "good":Boolean,
  "top":Boolean,
  "reply_count":Number,
  "visit_count":Number,
  "author":String
});

module.exports = mongoose.model('data',dataSchema,'artidata');
