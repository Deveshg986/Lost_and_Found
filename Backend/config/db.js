const mysql = require("mysql2");

// Create connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT), // important: ensure it's a number
  ssl: {
    rejectUnauthorized: false // required for Railway public connection
  },
  connectTimeout: 20000
});

// Connect to database
db.connect((err) => {
  if (err) {
    console.error("Database Connection Error:", err);
  } else {
    console.log("Database Connected Successfully");
  }
});

module.exports = db;
