// 实现与MySQL交互
var mysql = require('mysql');
var dbConfig = require('../db/dbconfig');
var userSQL = require('../db/usersql');

var express = require('express');
var router = express.Router();

var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
   if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
      });
  } else {
    res.json(ret);
}};
// 添加用户
router.put('/addUser', function(req, res, next) {
  // 从连接池获取连接
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var params = req.body;
    // 用户名检查
    connection.query(userSQL.queryByName, params.username, function(err, data) {
      if (err) {
         //エラー処理
         return console.log('データーベース接続エラー', err);
      }else {
        if (data.length > 0) {
          console.log('用户名存在:',data[0].username);
          res.send('用户名存在');
        }else {
          connection.query(userSQL.insert, [params.username,params.password,params.email], function(err, result) {
            if (err) {
               //エラー処理
               return console.log('データーベース接続エラー', err);
            }else {
              result = {
                code: 200,
                msg:'增加成功'
              };
            }
            console.log('创建用户：'+params.username);
            // 以json形式，把操作结果返回给前台页面
            responseJSON(res, result);
          });
        }
      }
      // 释放连接
      connection.release();
    });
  });
});


router.post('/getUser', function(req, res) {
  pool.getConnection(function(err, connection) {
    // 获取前台页面传过来的参数
    var params = req.body;
    connection.query(userSQL.queryByName, params.username, function(err, result) {
      if (err) {
         //エラー処理
         return console.log('データーベース接続エラー', err);
      }else {
        var getuser = result[0];
        responseJSON(res, getuser);
    		connection.release();
      }
    });
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
