var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../model/user');
var Article = require('../model/articles');
var formidable = require('formidable');
var fs = require('fs')



mongoose.connect('mongodb://127.0.0.1:27017/myForum');

mongoose.connection.on("connected", function () {
  console.log("MongoDB connected success.")
});

mongoose.connection.on("error", function () {
  console.log("MongoDB connected fail.")
});

mongoose.connection.on("disconnected", function () {
  console.log("MongoDB connected disconnected.")
});



/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


//登录接口
router.post('/login',function(req,res,next){
   var param = {
      userName:req.body.userName,
      userPwd:req.body.userPwd

  }
  User.findOne(param, function (err,doc) {
      if(err){
          res.json({
              status:"1",
              msg:err.message
          });
      }else{
          if(doc){
              res.cookie("userName",doc.userName,{ 
                path:'/',
                maxAge:1000*60*60*3*24*30        //成功后并将用户名存入cookie--
              });
              //req.session.user = doc;
              res.json({
                  status:'0',
                  msg:'',
                  result:{
                      userName:doc.userName
                  }
              });
          } else {
            res.json({
              status:'2',
              msg:'',
              result:''
            })
          }
      }
  });
})


//登出接口，清除cookie--
router.post("/logout", function (req,res,next) {
  res.cookie("userName","",{
    path:"/",
    maxAge:-1
  });
  res.json({
    status:"0",
    msg:'',
    result:''
  })
});

//每次进入页面检查是否存在cookie,若有则保持登录状态--

router.get("/checkLogin", function (req,res,next) {
   var obj={}
  if(req.cookies.userName){
      obj.name = req.cookies.userName
     User.findOne({'userName':req.cookies.userName},function(err,doc){
       obj.img = doc.userImg;

        res.json({
        status:'0',
        msg:'',
        result:obj || ''
      });
     })  
  }else{
    res.json({
      status:'1',
      msg:'未登录',
      result:''
    });
  }
});




//注册接口
router.post('/reg',function(req,res,next){
  var param = {
    'userName' : req.body.userName,
    'userPwd'  : req.body.userPwd,
    'userEmail': req.body.userEmail
  }
  let name = req.body.userName;
  var user = new User(param);

  User.findOne({'userName':req.body.userName},function(err,doc){
    if(err) {
      res.json({
        status:'1',
        msg:err.message,
        result:'fail' 
     })
    } else {
      if(doc){
        res.json({ 
          status:'1',            //首先判断是否有已存在的用户名--
          msg:'',
          result:'该用户名已存在'
        })
      } else {

    user.save(function(err){    //如果没有，则将提交的数据存入数据库--
    if(err) {      
      res.json({
        status:'1',
        msg:err.message,
        result:'fail'
      })
    } else {
    res.cookie("userName",req.body.userName,{ 
        path:'/',
        maxAge:1000*60*60*3*24*30       //成功后并将用户名存入cookie--
    });
    res.json({
       status:'0',
       msg:'suc',
       result:{
       userName:name
         }
       })
      }
     })
    }
  }
})
  
})


/*得到特定的用户信息*/
router.post('/getuserInfo',function(req,res,next){
  User.findOne( {'userName':req.body.username},function(err,doc){
    if(err) {
      res.json({
        status:'1',
        msg:err.message,
        result:''
      })
    } else {
      res.json({
        status:'0',
        mas:'',
        result:doc
      })
    }
  })
})


/*存入已登记的用户信息*/
router.post('/saveUserInfo',function(req,res,next){
    var obj = {}
    var username = req.body.username;
     for(var key in req.body) {
       if( key === username ) continue;
        obj[key] = req.body[key]
     } 

    User.update({'userName':username},obj,function(err,doc){
      if(err){
        res.json({
          status:'1',
          msg:err.message,
          result:'呵呵'
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

/*上传用户图片*/
//处理个人图片上传

router.post('/upload',(req,res,next)=>{
   var form = new formidable.IncomingForm();

    form.uploadDir = 'static';


    form.keepExtensions = true;

    var name = req.cookies.userName;

   form.parse(req, function(error, fields, files) {
    fs.rename(files.upfile.path,'static/'+files.upfile.name,function(err){
      console.log(err);
    })
    
     User.update({userName:name},{$set:{userImg:files.upfile.name}},(err1,doc)=>{
      if(err1){
      res.json({
        status:'1',
        msg:err1.message,
        result:''
       })
      }
     })
     
    Article.updateMany({"comment.author_name":name},{$set:{'comment.$.author_img':files.upfile.name}},{upsert:true},function(err2){
      if(err2) {
        res.json({
          status:'3',
          msg:err2.msg,
          result:''
        })
      }
    })
     
     Article.update({author_name:name},{$set:{author_img:files.upfile.name}},{multi: true},(err3,doc3)=>{
      if(err3){
      res.json({
        status:'2',
        msg:err3.message,
        result:''
       })
      }
     })


     res.end('upload successfully'); 
   
  });

})


module.exports = router;
