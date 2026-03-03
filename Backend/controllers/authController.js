const db = require("../config/db");

exports.loginUser =(req, res)=>{
    const {email, password}= req.body;
    if(!email || !password){
        return res.status(400).json({message: "Please Provide Email and Password"})
    }
    const sql =  `
    SELECT id, full_name, roll_no, email, role, department
    FROM users
    WHERE email = ? AND password = ?`;
    
    db.query(sql, [email, password], (err, results)=>{
        if(err){
            return res.status(500).json({message: "Database Error", error: err})
        }
        // Check if User Exists if sql returns empty array then user does not exist
        if(results.length === 0){
            return res.status(401).json({message: "Invalid Email Or Password"});
        }
        return res.status(200).json({message: "Login Successful", user: results[0]});
    })
}