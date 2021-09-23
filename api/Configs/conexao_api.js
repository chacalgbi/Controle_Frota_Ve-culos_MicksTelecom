const mysql = require('mysql');

// Conecta no BD da Micks
module.exports = mysql.createConnection({
    host: '*******',
    user: '*****',
    password: '*****',
    database: '*******'
  });