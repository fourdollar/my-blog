"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
var config  = require(__dirname + '/../db/dbconfig.js');
config = config.dev;
var sequelize = new Sequelize(config.database, config.user, config.password, config);
var db        = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});
console.log('init sequelize...');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
