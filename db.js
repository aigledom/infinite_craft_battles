const mysql = require('mysql');

//Create a MYSQL connection pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'infiniteCraftGenerator',
});

module.exports = pool;