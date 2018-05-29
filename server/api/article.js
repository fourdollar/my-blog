var mysql = require('mysql');
var dbConfig = require('../db/dbconfig');
var userSQL = require('../db/usersql');

var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var pool = mysql.createPool( dbConfig.mysql );
// 响应一个JSON数据
var responseJSON = function (res, ret) {
   if(typeof ret === 'undefined') {
        res.json({     code:'-200',     msg: '操作失败'
      });
  } else {
    res.json(ret);
}};


// 发布文章
router.post('/article', function(req, res) {

});


// 获取文章
router.get('/getarticle', function(req, res) {
  
});
