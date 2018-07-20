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
router.post('/add', function(req, res) {
  models.blog.create(req.body)
  .then(function (p) {
      console.log('created.' + JSON.stringify(p));
      res.send('博客创建成功');
  }).catch(function (err) {
      console.log('failed: ' + err);
  });
});


// 获取文章
router.get('/get', function(req, res) {
  models.blog.findAll()
   .then(function (articles) {
     var resblog = [];
     if (articles.length>0) {
       for (var i in articles) {
         resblog.push({
           id:articles[i].dataValues.id,
           title:articles[i].dataValues.title,
           status:articles[i].dataValues.status,
           description:articles[i].dataValues.description,
           content:articles[i].dataValues.content,
           created:articles[i].dataValues.created,
           clicknum:articles[i].dataValues.clicknum,
           image:"./static/img/1.jpg"
         })
         console.log(articles[i].dataValues);
       }
     }
     res.send(resblog);
   }).catch(function (err) {
       // error
       console.log('get.failed: ' + err);
   });
});

// 删除文章
router.put('/delete', function(req, res) {
  models.blog.destroy({
    where:req.body
  })
  .then(function (p) {
      console.log('delete.' + JSON.stringify(p));
      res.send('博客删除成功');
  }).catch(function (err) {
      console.log('delete.failed: ' + err);
  });
});

module.exports = router;
