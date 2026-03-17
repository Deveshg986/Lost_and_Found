
const db = require("../config/db");


const addItem = (req, res) => {

    const { title, description, location, uploaded_by, status } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!title || !location || !uploaded_by) {
        return res.status(400).json({
            message: "Title, Location and Uploaded By are required"
        });
    }

    const sql = `
        INSERT INTO items
        (title, description, location, image, status, uploaded_by)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [title, description, location, image, status, uploaded_by],
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

    const sql = "SELECT * FROM items";

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
module.exports = {addItem, allItems}