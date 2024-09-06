require("dotenv").config();
const mysqlConn = require("mysql2");

//** Connection */

const connection = mysqlConn.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
});

connection.connect((err) => {
  if (err) {
    console.log("Error connectiong to notes db", err);
    return;
  }

  console.log("Connection to notes api successful");
});
/************** */

module.exports = connection;
