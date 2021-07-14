const {Sequelize} = require('sequelize');
const mysqlDatabase = require('../../../mysql');

module.exports = new Sequelize({
  dialect: 'mysql',
  host: mysqlDatabase.host,
  port: 3306,
  username: mysqlDatabase.username,
  password: mysqlDatabase.password,
  database: 'money',
});
