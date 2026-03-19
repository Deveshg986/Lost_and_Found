const { response } = require("express");
const db = require("../config/db");

const addItem = (req, res) => {

    const { title, description, location, uploaded_by } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!title || !location || !uploaded_by) {
        return res.status(400).json({
            message: "Title, Location and Uploaded By are required"
        });
    }

    const sql = `
    INSERT INTO items (title, description, location, image, status, uploaded_by)
    VALUES (?, ?, ?, ?, 'PENDING', ?)
    `;

    db.query(
        sql,
        [title, description, location, image, uploaded_by],
        (err, result) => {

            if (err) {
                console.error("Database Error:", err);
                return res.status(500).json({ message: "Database Error" });
            }

            return res.status(201).json({
                message: "Item Reported Successfully",
                itemId: result.insertId
            });
        }
    );
};

const allItems = (req, res) => {

    const sql = "SELECT * FROM items WHERE status = 'APPROVED'";
    db.query(sql, (err, results) => {

        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({
                message: "Database Error"
            });
        }
        return res.status(200).json({
            count: results.length,
            items: results
        });
    });

};

const deleteItems = (req, res) => {
    const itemID = req.params.id;

    if (!itemID || isNaN(itemID)) {
        return res.status(400).json({
            message: "Invalid Item ID"
        });
    }

    const sql = `
    UPDATE items 
    SET status = 'DELETED' 
    WHERE id = ? AND claimed_by IS NULL
    `;

    db.query(sql, [itemID], (err, result) => {
        if (err) {
            return res.status(500).json({
                message: "Server Error",
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Item not found or already claimed"
            });
        }

        return res.status(200).json({
            message: "Item Deleted Successfully"
        });
    });
};

const getPendingItem = (req, res)=>{
    const sql = "SELECT * FROM items WHERE status = 'PENDING'";
    db.query(sql, (err, results)=>{
        if (err) {
            console.error("Database Error:", err);
            return res.status(500).json({
                message: "Database Error"
            });
        }
        return res.status(200).json({
            count: results.length,
            items: results
        });       
    })
}

const rejectItem = (req, res)=>{
    const {id}= req.params;
    const sql = `
        UPDATE items 
        SET status = 'REJECTED' 
        WHERE id = ? AND status = 'PENDING' 
    `;

    db.query(sql, [id], (err, result)=>{
        if(err){
            return res.status(500).json({
                message: "Database Error"
            })
        }

        if(result.affectedRows===0){
            return res.status(404).json({
                message: "Item not found or already approved/rejected"
            })
        }
        return res.status(200).json({
            message: "Item rejected successfully"
        });
    })
}

const approveItem = (req, res)=>{
    const {id}= req.params;
    const sql = `
        UPDATE items 
        SET status = 'APPROVED' 
        WHERE id = ? AND status = 'PENDING' 
    `;

    db.query(sql, [id], (err, result)=>{
        if(err){
            return res.status(500).json({
                message: "Database Error"
            })
        }

        if(result.affectedRows===0){
            return res.status(404).json({
                message: "Item not found or already approved/rejected"
            })
        }
        return res.status(200).json({
            message: "Item Approved successfully"
        });
    })
}

module.exports = {addItem, allItems, getPendingItem ,deleteItems, rejectItem, approveItem}