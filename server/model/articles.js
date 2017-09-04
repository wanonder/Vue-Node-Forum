var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var replySchema = new Schema();
var praiseSchema = new Schema();

replySchema.add({
    content:String,
    author_name:String,
    parent_name:String,
    parent_index:Number,
    date:{
         type:Date,
         default:Date.now()
        },
   replyStatus:{type:Boolean,default:false},
   praiseStatus:{type:Boolean,default:true},
   temp_content:String,
   parent_id:String,
   praiseNum:Number,
   praise:Array
})

praiseSchema.add({
    praiseName:String
})




var CommentSchema=new Schema({
    content:String,
    author_id:String,
    author_img:{type:String,default:'default.jpg'},
    author_name:String,
    praiseNum:Number,
    opposeNum:Number, 
    replyStatus:{type:Boolean,default:false},
    praiseStatus:{type:Boolean,default:false},
    date:{
        type:Date,
        default:Date.now()
    },
    reply:[replySchema],
    praise:Array,
    parent_id:String,
    temp_content:String

});


   


var articleSchema = new Schema({
  title:String,
  author_name:String,
  author_img:{type:String,default:'default.jpg'},
  content: String,
  comment:[CommentSchema],
  createDate:{
        type:Date,
        default:new Date()     //这个default没有什么用，如果两篇文章的创建事件差不多，就不能区别创建创建时间
    },
    visited_count:{
        type:Number,
        default:0
    },
    reply_count:{
        type:Number,
        default:0
    }

    
});

module.exports = mongoose.model('Article',articleSchema,'articles');