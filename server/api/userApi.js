// 实现与MySQL交互
var mysql = require('mysql');
var models = require('../models');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');



// 添加用户
router.put('/addUser', function(req, res, next) {
    // 获取前台页面传过来的参数
    var params = req.body;
    var md5 = crypto.createHash('md5');
    params.password = md5.update(req.body.password).digest('hex');

    // 用户名检查
    models.user.findAll({
      where: {
        username:params.username
      }
    }).then(function (users) {
      if (users.length>0) {
        console.log('用户名存在',params.username);
        res.send('用户名存在');
      } else {
        models.user.create(params)
        .then(function (p) {
           console.log('created.' + JSON.stringify(p));
           console.log('创建用户成功：'+params.username);
           res.send('创建成功');
        }).catch(function (err) {
           console.log('failed: ' + err);
        });
      }
    }).catch(function (err) {
       // error
       console.log('failed: ' + err);
    });
});


router.post('/getUser', function(req, res) {
    // 获取前台页面传过来的参数
    var params = req.body;
    var md5 = crypto.createHash('md5');
    params.password = md5.update(req.body.password).digest('hex');

    // 用户名检查
    models.user.findAll({
        where: {
          username:params.username
        }
    }).then(function (users) {
        if (users.length == 0) {
            console.log('用户不存在',params.username);
            res.send('用户不存在');
        } else {
            if (users[0].dataValues.password !== params.password) {
                console.log(params.username,'  密码错误');
                res.send('密码错误');
            } else {
                console.log(users[0].dataValues.username,'  登陆成功');
                res.send('登陆成功');
            }
      }
    }).catch(function (err) {
       // error
       console.log('failed: ' + err);
    });
});


// var user_db = require('../user_db');
//
// // 增加用户接口(cloudant)
// router.put('/addUser', function(req, res) {
//   var cl_db = user_db();
//   var params = req.body;
//   var param = {
//     "selector": {
//       "username": req.body.username
//     },
//     "fields": [
//       "username"
//     ]
//   };
//   cl_db.find(param, function (err, response) {
//
//     if (err) {
//        //エラー処理
//        return console.log('データーベース接続エラー', err);
//     } else {
//        //正常処理
//        if (response.docs.length !== 0) {
//          console.log('用户名存在');
//          res.send('用户名存在');
//        }else{
//          cl_db.insert(params, function(err, data) {
//            if (err){
//              console.log(err);
//            }else {
//              console.log(params);
//              console.log('insert success');
//              res.send('注册成功');
//            }
//          });
//        }
//     };
//   });
//
// });
//
// router.post('/getUser', function(req, res) {
//   var cl_db = user_db();
//   var param = {
//     "selector": {
//       "username": req.body.username
//     },
//     "fields": [
//       "username",
//       "email",
//       "password"
//     ]
//   };
//
//   cl_db.find(param, function (err, response) {
//
//     if (err) {
//        //エラー処理
//        return console.log('データーベース接続エラー', err);
//     } else {
//        //正常処理
//        var getuser = [];
//        for (var i = 0; i < response.docs.length; i++) {
//          getuser.push(response.docs[i]);
//        };
//        console.log('CloudantからUser一覧を取得します');
//        console.log('=================');
//        console.log(getuser);
//        console.log('=================');
//        res.send(getuser);
//     };
//   });
// });

module.exports = router;
