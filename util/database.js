const mysql = require("mysql2");

//creating a pool of connection so that we do npt have to reconnect again and again

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-complete",
  password: "12345678@",
});

module.exports = pool.promise();
