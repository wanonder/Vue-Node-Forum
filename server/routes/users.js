var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Datas = require('../model/data');

mongoose.connect('mongodb://127.0.0.1:27017/artidata');

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

router.post('/login',function(req,res,next){
  console.log(req.body.userName);
  console.log(req.body.userPwd);
  
  res.json({
    status:'0',
    msg:'1',
    result:'suc'
  })
})

let artidata;
router.get('https://cnodejs.org/api/v1/topics',function(req,res,next){
    artidata =  res.data.data;
})


router.post('/getdata',function(req,res,next){
    res.send('artidata');
})

module.exports = router;
