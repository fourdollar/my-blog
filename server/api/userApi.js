var user_db = require('../user_db');
var express = require('express');
var router = express.Router();

// 增加用户接口
router.put('/addUser', function(req, res) {
  var cl_db = user_db();
  var params = req.body;
  var param = {
    "selector": {
      "username": req.body.username
    },
    "fields": [
      "username"
    ]
  };
  cl_db.find(param, function (err, response) {

    if (err) {
       //エラー処理
       return console.log('データーベース接続エラー', err);
    } else {
       //正常処理
       if (response.docs.length !== 0) {
         console.log('用户名存在');
         res.send('用户名存在');
       }else{
         cl_db.insert(params, function(err, data) {
           if (err){
             console.log(err);
           }else {
             console.log(params);
             console.log('insert success');
             res.send('注册成功');
           }
         });
       }
    };
  });

});

router.post('/getUser', function(req, res) {
  var cl_db = user_db();
  var param = {
    "selector": {
      "username": req.body.username
    },
    "fields": [
      "username",
      "email",
      "password"
    ]
  };

  cl_db.find(param, function (err, response) {

    if (err) {
       //エラー処理
       return console.log('データーベース接続エラー', err);
    } else {
       //正常処理
       var getuser = [];
       for (var i = 0; i < response.docs.length; i++) {
         getuser.push(response.docs[i]);
       };
       console.log('CloudantからUser一覧を取得します');
       console.log('=================');
       console.log(getuser);
       console.log('=================');
       res.send(getuser);
    };
  });
});

module.exports = router;
