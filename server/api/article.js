var mysql = require('mysql');
var models = require('../models');
var express = require('express');
var router = express.Router();
var crypto = require('crypto');

var now = Date.now();
var params = {
  "title" : "hello world",
  "created" : now,
  "content" : "hello",
  "description" : "",
  "status" : 1,
  "clicknum" : 2,
  "tags" : "html"
}


// 发布文章
router.post('/article', function(req, res) {
  models.blog.create(params)
  .then(function (p) {
      console.log('created.' + JSON.stringify(p));
  }).catch(function (err) {
      console.log('failed: ' + err);
  });
});


// 获取文章
router.get('/getarticle', function(req, res) {
  models.blog.findAll()
   .then(function (articles) {
     if (articles.length>0) {
       for (var i in articles) {
         console.log(articles[i].dataValues.title);
       }
     }
   }).catch(function (err) {
       // error
   });
});
