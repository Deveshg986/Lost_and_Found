const db = require("../config/db");
const bcrypt = require("bcrypt");
const { json } = require("express");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please Provide Email and Password"
        });
    }

    const sql = `SELECT * FROM users WHERE email = ?`;

    db.query(sql, [email], async (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Database Error",
                error: err
            });
        }

        if (results.length === 0) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        const user = results[0];

        // Compare password
        //const match = await bcrypt.compare(password, user.password);
        const match = results[0].password === password;//remove when pushing code

        if (!match) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            });
        }

        //JWT token
        const token = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        // Remove password
        delete user.password;

        return res.status(200).json({
            message: "Login Successful",
            token,
            user
        });

    });

};

exports.signup = async(req, res)=>{
    const {full_name, roll_no, email, password, phone, department } = req.body;

    if (!full_name || !roll_no || !email || !password) {
        return res.status(400).json({ message: "Required fields missing" });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)

    const sql =`INSERT INTO users(full_name, roll_no, email, password, phone, department) VALUES (?, ?, ?, ?, ?, ?)`;

    db.query(
        sql,
        [full_name, roll_no, email, hashedPassword, phone, department],
        (err)=>{
            if(err) return res.status(500).json(err);

            res.status(200).json({
                message:"Signup successfull"
            })
        }
    );
};