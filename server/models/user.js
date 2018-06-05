"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("user", {
    id:{type: DataTypes.INTEGER, primaryKey: true,autoIncrement: true},
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
          timestamps: false
      });

  return User;
};
