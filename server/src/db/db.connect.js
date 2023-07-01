const mysql = require("mysql2");
const dbConfig = require("../configs/db.config");

const connectionMySQL = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

connectionMySQL.connect((err) => {
  if (err) throw err;
  console.log("connected");
});

module.exports = connectionMySQL;
