const express = require('express');
const app = express();
const dev = app.get('env') !== 'production'
const mysql = require('mysql');
var path = require('path');
const morgan = require('morgan')

var pool;

//database connection for production environment

//database connection for development environment


pool = mysql.createPool({
    connectionLimit: 100,
    host: '127.0.0.1',
    user: 'root',
    password: 'Akshay@123',
    database: 'proxy',
    multipleStatements: true,
    charset: "utf8_general_ci",
    debug: false,
});



module.exports = pool // exporting db pool to use it for APIs