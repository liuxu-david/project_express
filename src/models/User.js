const { DataTypes } = require("sequelize");
const sequelize = require("../db/mysql");

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, //主键
      autoIncrement: true, //主键是否递增
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, //是否允许为空
      unique: true, //是否唯一
    },
  },
  { tableNames: "users", timestamps: false } //是否在创建的时候自动添加时间字段
);

module.exports = User;
