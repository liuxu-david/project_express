const { dbConfig } = require("../config");
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    port: dbConfig.port,
  }
);

module.exports = sequelize;
