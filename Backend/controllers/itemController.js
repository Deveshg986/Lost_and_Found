const { response, json } = require("express");
const db = require("../config/db");
const cloudinary = require("../config/cloudinary");
//Common Reoprt Controller For Both STUDENT and STAFF with Different Logic


const insertItem = async (req, res, status) => {
  try {
    const { title, description, location, submitted_to } = req.body;
    const uploaded_by = req.user?.id;

    if (!uploaded_by) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const allowedStatus = ["PENDING", "APPROVED"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    if (!title?.trim() || !location?.trim()) {
      return res.status(400).json({
        message: "Title and Location are required"
      });
    }

    if (!submitted_to) {
      return res.status(400).json({
        message: "Staff selection is required"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        message: "Image is required"
      });
    }

    const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
        {
        folder: "lost_and_found",
        resource_type: "image",
        format: "jpg",
        },
        (error, result) => {
        if (error) reject(error);
        else resolve(result);
        }
    ).end(req.file.buffer);
    });
    const image = result.secure_url.replace("/upload/", "/upload/fl_attachment:false/");

    const sql = `
      INSERT INTO items
      (title, description, location, image, status, uploaded_by, submitted_to)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const desc = description?.trim() || null;

    db.query(
      sql,
      [title.trim(), desc, location.trim(), image, status, uploaded_by, submitted_to],
      (err, resultDb) => {
        if (err) {
          console.error("Database Error:", err);
          return res.status(500).json({ message: "Database Error" });
        }

        return res.status(201).json({
          message:
            status === "APPROVED"
              ? "Item added and auto-approved"
              : "Item submitted for approval",
          itemId: resultDb.insertId
        });
      }
    );

  } catch (err) {
    console.error("Upload Error:", err);
    return res.status(500).json({ message: "Upload failed" });
  }
};

// routes
const addItem = (req, res) => insertItem(req, res, "PENDING");
const addItemStaff = (req, res) => insertItem(req, res, "APPROVED");
//This is For Both the STUDENT and STAFF to See Approved Items
const allItems = (req, res) => {
    const sql = `
    SELECT 
        items.*, 
        users.full_name AS reported_by_name
    FROM items
    JOIN users ON items.uploaded_by = users.id
    WHERE items.status IN ('APPROVED', 'CLAIMED')
    ORDER BY items.id DESC
    `;

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }

        return res.status(200).json({
            count: results.length,
            items: results
        });
    });
};
//By This Staff Will Get All the Report With Status = PENDING
const getPendingItems= (req, res) => {
    const sql = "SELECT * FROM items WHERE status = 'PENDING'";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }

        return res.status(200).json({
            count: results.length,
            items: results
        });
    });
};
//This Controller Set Item Status DELETED For Soft Delete
const deleteItems = (req, res) => {
    const { id } = req.params;

    const sql = `
        UPDATE items 
        SET status = 'DELETED' 
        WHERE id = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }

        return res.status(200).json({
            message: "Item Deleted Successfully"
        });
    });
};
//This is Reject Controller For Staff To Reject Report
const rejectItem = (req, res) => {
    const { id } = req.params;

    const sql = `
        UPDATE items 
        SET status = 'REJECTED' 
        WHERE id = ? AND status = 'PENDING'
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }

        return res.status(200).json({
            message: "Item Rejected Successfully"
        });
    });
};
//This is Approve Controller For Staff To Approve Report
const approveItem = (req, res) => {
    const { id } = req.params;

    const sql = `
        UPDATE items 
        SET status = 'APPROVED' 
        WHERE id = ? AND status = 'PENDING'
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }

        return res.status(200).json({
            message: "Item Approved Successfully"
        });
    });
};
const searchItems = (req, res) => {
    const { search, status, location, sort } = req.query;

    let query = "SELECT * FROM items WHERE status IN ('APPROVED', 'CLAIMED')"; // coz home has claimed + approved(unclaimed) items
    let params = [];

    if (search) {
        query += " AND (LOWER(title) LIKE ? OR LOWER(description) LIKE ?)";
        params.push(`%${search.toLowerCase()}%`, `%${search.toLowerCase()}%`);
    }

    if (status) {
        query += " AND status = ?";
        params.push(status);
    }

    if (location) {
        query += " AND LOWER(location) LIKE ?";
        params.push(`%${location.toLowerCase()}%`);
    }

    if (sort === "latest") {
        query += " ORDER BY created_at DESC";
    } else if (sort === "oldest") {
        query += " ORDER BY created_at ASC";
    } else {
        query += " ORDER BY created_at DESC"; // default sorting
    }

    db.query(query, params, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Database Error" });
        }

        return res.status(200).json({
            count: results.length,
            items: results
        });
    });
};
const getStaff = (req, res) => {
  const sql = `
    SELECT id, name, department 
    FROM users 
    WHERE role = 'staff'
  `;

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({
        message: "Error fetching staff"
      });
    }

    return res.status(200).json({
      count: result.length,
      staff: result
    });
  });
};

const userReports = (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const sql = `
        SELECT * 
        FROM items 
        WHERE uploaded_by = ? 
        ORDER BY created_at DESC
    `;

    db.query(sql, [userId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }
        if(result.length === 0){
            return res.status(404).json({ message: "No reports found"})
        }

        return res.status(200).json({
            count: result.length,
            items: result
        });
    });
};
module.exports = {
    addItem,
    allItems,
    getPendingItems,
    deleteItems,
    rejectItem,
    approveItem,
    addItemStaff,
    insertItem,
    searchItems,
    getStaff,
    userReports
};