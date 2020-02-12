const mysql = require ('mysql');

module.exports = mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'proteusbackend',
    multipleStatements: true
})