"use strict";

module.exports = function(sequelize, DataTypes) {
  var Blog = sequelize.define("blog", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: DataTypes.STRING,
    tags: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.INTEGER,// 1:正常，0:草稿 －1:删除
    clicknum: DataTypes.INTEGER,
    content_html: DataTypes.TEXT,
    content: DataTypes.TEXT,
    created: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, {
    timestamps: false,
    underscored: true,
    tableName: 'Blog',
    charset: 'utf8mb4'
  });

  return Blog;
};
