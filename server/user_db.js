

//cloudant数据库连接
var Cloudant = require('cloudant');

var cloudant = Cloudant("https://31174a02-6cd5-497b-9896-00192108d62f-bluemix:92ef74acf0d57790053b5ac8112cb2f86f5ed663a489b228d0b04cb4284930ee@31174a02-6cd5-497b-9896-00192108d62f-bluemix.cloudant.com");

var originals = {};

var date_time = require('./date_time');

module.exports = function() {

    //数据库名：user
    var db = cloudant.db.use('user');

    originals.insert = db.insert;
    db.insert = insert;

    return db;
};

/**
 * @param params {Object} - 登録したいデータ
 * @param callback {Function} - コールバック関数
 */
var insert = function(params, callback) {

  var now = date_time.now();

  var data = Object.assign(
    params,
    {created_at: now}
  );

  originals.insert(data, callback);
}

// mysql数据库连接配置
// module.exports = {
//     mysql: {
//         host: 'mybloginstance.cfkhlvoutd9s.ap-northeast-1.rds.amazonaws.com',
//         user: 'fengsiyuan',
//         password: 'ziqing2013',
//         database: 'blogdb',
//         port: '3306'
//     }
// }
