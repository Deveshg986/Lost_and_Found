const mysql = require('mysql2')

const db = mysql.createConnection({
    host: 'localhost',
    user: "root",
    password: "dev@123",
    database: 'lost_and_found'
})

db.connect((err)=>{
    if(err){
        console.log("Error While Connecting to Database", err);
    }
    else{
        console.log("Connected to Database Successfully");
    }
});

module.exports = db;