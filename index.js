const mysql = require('mysql2');
const inquirer = require("inquirer");

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'tracker_db'
});

// simple query
connection.query(
    'SELECT * FROM `dummy`',
    function(err, results, fields) {
      console.log(results); // results contains rows returned by server
    }
  );

connection.end();