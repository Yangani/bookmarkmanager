/*
      1. Insert HOST name
      2. Add your MySQL database name
      3. Add your MySQL password
      4. Create a MySQL Database called bookmarks - using the schema given in shema.sql file
*/

var mysql = require('mysql');

//Create connection to MySQL Database
function Connection() {
  this.pool = null;

  this.init = function() {
    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: 'localhost',
      user: 'USER-NAME',
      password: 'MySQL-PASSWORD',
      database: 'bookmarks'
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();