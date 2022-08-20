const mysql = require('mysql2/promise');
require('dotenv').config();

const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST } = process.env;

const connection = mysql.createPool({
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  host: MYSQL_HOST,
  port: 3306,
});

module.exports = connection;
