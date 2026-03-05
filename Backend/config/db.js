const mysql = require("mysql2");

const db = mysql.createConnection({
<<<<<<< HEAD
  
=======
>>>>>>> f75c8b274ae81c07ad25b3d559f1e72b889ee322
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
<<<<<<< HEAD
=======

>>>>>>> f75c8b274ae81c07ad25b3d559f1e72b889ee322
module.exports = db;