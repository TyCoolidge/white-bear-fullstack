require("dotenv").config();
const nodeUtil = require("util");
const mysql = require("mysql");

const db = mysql.createPool({
   connectionLimit: 10,
   host: process.env.RDS_HOST || "localhost",
   user: process.env.RDS_USER || "root",
   password: process.env.RDS_PASSWORD || "Yusuke98",
   database: process.env.RDS_DATABASE || "white_bear",
});

// Promisify for Node.js async/await.
// https://medium.com/@mhagemann/create-a-mysql-database-middleware-with-node-js-8-and-async-await-6984a09d49f4
db.query = nodeUtil.promisify(db.query);

//exporting files inside of node
module.exports = db;
