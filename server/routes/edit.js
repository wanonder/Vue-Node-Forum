var express = require('express');
var router = express.Router();
var Article = require('../model/articles');
var User = require('../model/user');

/*Test*/
router.get('/check', function(req, res, next) {
  if(req.cookies.userName) {
    res.json({
      status:'0',
      msg:'',
      result:'suc'
    })
  } else {
    res.json({
      status:'1001',
      msg:'',
      result:'请先登录！'
    })
  }
});



// 文章发表接口

router.post('/publish',function(req,res,next){

   User.findOne({userName:req.cookies.userName},(err,doc)=>{
       var img = doc.userImg;
       console.log(img);
       var param = {                  
        "title" :req.body.title,
        "author_name":req.cookies.userName,
        "content":req.body.content,
        "createDate":req.body.createDate,
        "author_img":img
      }
       
    var article = new Article(param);
      article.save(function(err){
      if(err) {      
      res.json({
        status:'1',
        msg:err.message,
        result:'fail'
      })
    } else {
     res.json({
       status:'0',
        msg:'suc',
       result:'suc'
       })
      }
    })

   })    
})

//得到文章基本信息列表

router.post('/getArticleList',function(req,res,next){
   let obj={}
   let page = parseInt(req.body.page);
   let pageSize =  parseInt(req.body.pageSize);
   let skip = (page-1)*pageSize;
   let sort = req.body.sort.toString();
   if(sort == 'new')
    obj.createDate=-1;
    else
    obj.comment=-1;

   
   let nums;
   Article.find(function(err,doc1){
      nums = doc1.length;
   })

   let articleModel = Article.find().skip(skip).limit(pageSize);
   articleModel.sort(obj)
   articleModel.exec(function(err,doc){    
     if(err) {
       res.json({
        status:'1',
        msg:'',
        result:'',
      })
    }   else {
        res.json({
        status:'0',
        msg:nums||'',
        result:doc
      })
    }
   })    
})

//得到具体文章页
router.post('/getSingleArticle',function(req,res,next){
  var id = req.body.id;


  Article.findOne({'_id':id},function(err,doc){
     if(err) {
      res.json({
          status:'1',
          msg:err.message,
          result:''
      })
     }
     
     if(doc) {
     var v_count = doc.visited_count;
    

     Article.findByIdAndUpdate(id,{$set:{visited_count:v_count+1}},{new:true},function(err1,doc1){
        if(err1) {
          res.json({
          status:'1',
          msg:err1.message,
          result:''
      })
     } else {
      res.json({
         status:'0',
         msg:'',
         result:doc1
      })
     }
     })
    }
  })
    
})


//根据条件拿到文章
router.post('/getArticlesByParam',function(req,res,next){
  var obj = {};
  for(key in req.body) {
    obj[key] = req.body[key];
  }
   console.log(obj);
  Article.find(obj,function(err,doc){
    if(err) {
      res.json({
        status:'',
        msg:err,message,
        resutl:''
      })
    } else {
      res.json({
        status:'',
        msg:'',
        result:doc
      })
    }
  })  
})



//发表评论

router.post('/replypublish',function(req,res,next){
  var username = req.cookies.userName;
  var body = req.body;
  var img ;
  

  User.findOne({userName:username},function(err,doc0){
      img = doc0.userImg;
 
  })

  Article.findOne({_id:req.body.id},function(err0,article) {
    if(err0) {
      res.json({
        status:'1',
        msg:err0.message,
        result:''
      })     
    } 
    
     
     var comments=article.comment||[];
     
     var replyCount = article.reply_count;
     var reply={}
     console.log(comments);
    if(body.parent_name) {                    //如果是回复已有评论
      reply.content = body.reply;
      reply.author_name = username;
      reply.parent_name = body.parent_name;
      reply.parent_index = body.index;
      reply.parent_id = body.parent_id;
      reply.praiseNum = 0;
      comments[body.index].reply.push(reply) ;   
     }
    else { 
         comm = {                           //如果是直接评论
            content:req.body.reply,
            author_name:username,
            praiseNum:0,
            opposeNum:0,
            date:Date.now(),
            author_img:img,
            praise:[]
        }
        replyCount = replyCount+1;
        comments.push(comm);
   }
    Article.findByIdAndUpdate(req.body.id,{$set:{comment:comments,reply_count:replyCount}},{new:true},function(err1,doc1){
        if(err1) {
             res.json({
             status:'1',
             msg:err1.message,
              result:'fail'
          })     
        } 
      else 
        {      
            res.json({
            status:'0',
            msg:'',
            result:doc1
          })
          
        }
     })    
  })

 })  


   



  
router.post('/deleteReply',function(req,res,next){
  let id = req.body.id;
  let index = req.body.index;
  let body = req.body;

  Article.findOne({_id:id},function(err,doc){
    var comment = doc.comment||[];
    var count = doc.reply_count;

    if(body.child) {           //如果是删除第二级评论
        comment[body.parentIndex].reply.splice(index,1);

    } else {
       comment.splice(index,1);  //如果是删除一级评论
       count = count-1
    }

    Article.findByIdAndUpdate({_id:id},{$set:{'comment':comment,reply_count:count}},{new:true},function(err1,doc1){

      if(err1) {
      res.json({
              status:'1',
              msg:err1.message,
              result:'fail'
      })
     } else {
      res.json({
        status:'0',
        msg:'',
        result:doc1
      })
     }
    })

  })
})


router.post('/praise',function(req,res,next){
  let body = req.body;
  let index =  body.index;
  let id =   body.id;
  let name = body.name;
  let num = body.num;

  Article.findOne({_id:id},function(err,doc) {

    var comments = doc.comment||[];


    if(body.child) {
      comments[index].reply[body.child_index].praiseNum+=num;
      if(num==-1) {
        var tag = comments[index].reply[body.child_index].praise.indexOf(name);
        comments[index].reply[body.child_index].praise.splice(tag,1);
      } else {
        comments[index].reply[body.child_index].praise.push(name);
      }

    }
    
    else {
    comments[index].praiseNum +=num ;
    if(num==-1) {
      var idx = comments[index].praise.indexOf(name);
      comments[index].praise.splice(idx,1);
  
    } else {

       comments[index].praise.push(name);
    }
   
   }



    Article.findByIdAndUpdate({_id:id},{$set:{'comment':comments}},{new:true},function(err2,doc2){
      if(err2) {
         res.json({
          status:'1',
          msg:err1.message,
          result:'fail'
       })
      } else {
        res.json({
          status:'0',
          msg:'',
          result:doc2
        })
      }
    })
  })



})



module.exports = router;
