const express = require('express');
const cors = require('cors');
const db  = require('./db');

 const app = express();

 app.use(cors());
 app.use(express.json());

 app.get('/', (req, res)=>{
    res.send("hello world");
 });

 app.listen(5000, ()=>{
    console.log("Server is Running on Port 5000")
 });

 app.post('/', (req, res)=>{
    const {email, password} = req.body;
    const sql = `
        SELECT id, full_name, roll_no, email, role, department
        FROM users
        WHERE email = ? AND password = ?
    `;
    db.query(sql, [email, password], (err, results)=>{
        if(err){
            console.log("Something Went Wrong", err);
            res.status(401).json({message: "Something Went Wrong"});
        }
        if(results.length > 0){
            res.status(200).json({message: "Login Sucessful", user: results[0]});
        }
        else{
            res.status(401).json({message: "Invalide Email or Passwors"});
        }
    })
 })