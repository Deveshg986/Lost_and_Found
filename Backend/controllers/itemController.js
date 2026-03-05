const db = require("../config/db");

exports.addItem = (req, res) => {

    const { title, description, location, uploaded_by } = req.body;

    const image = req.file ? req.file.filename : null;

    if (!title || !location || !uploaded_by) {
        return res.status(400).json({
            message: "Title, Location and Uploaded By are required"
        });
    }

    const sql = `
        INSERT INTO items
        (title, description, location, image, status, uploaded_by)
        VALUES (?, ?, ?, ?, 'LOST', ?)
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

exports.allItems = (req, res) => {

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