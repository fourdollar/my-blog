"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    // id:{type: DataTypes.INTEGER, autoIncrement: true},
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  });

  return User;
};
