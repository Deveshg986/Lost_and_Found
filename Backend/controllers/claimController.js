const db = require("../config/db");
const claimItem = (req, res) => {
  const { item_id, message } = req.body;
  const userId = req.user.id;
  const checkItemQuery = `SELECT status FROM items WHERE id = ?`;

  db.query(checkItemQuery, [item_id], (err, itemResult) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    if (itemResult.length === 0) {
      return res.status(404).json({ message: "Item not found" });
    }

    const itemStatus = itemResult[0].status;
    if (itemStatus !== "APPROVED") {
      return res.status(400).json({
        message: "Only approved items can be claimed"
      });
    }

    const checkClaimQuery = `
      SELECT id FROM claims WHERE item_id = ? AND user_id = ?
    `;

    db.query(checkClaimQuery, [item_id, userId], (err, claimResult) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Database error" });
      }

      if (claimResult.length > 0) {
        return res.status(400).json({
          message: "You already claimed this item"
        });
      }

      const insertQuery = `
        INSERT INTO claims (item_id, user_id, message)
        VALUES (?, ?, ?)
      `;

      db.query(insertQuery, [item_id, userId, message || null], (err, result) => {
        if (err) {
          console.error(err);

          if (err.code === "ER_DUP_ENTRY") {
            return res.status(400).json({
              message: "You already claimed this item"
            });
          }
          return res.status(500).json({ message: "Error creating claim" });
        }

        return res.status(201).json({
          message: "Claim submitted successfully",
          claimId: result.insertId
        });
      });
    });
  });
};

const updateClaimStatus = (req, res) => {
  const claimId = req.params.id;
  const { status } = req.body;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status"
    });
  }
  const getClaimQuery = `SELECT item_id FROM claims WHERE id = ?`;

  db.query(getClaimQuery, [claimId], (err, result) => {
    if (err) return res.status(500).json({ message: "Database error" });

    if (result.length === 0) {
      return res.status(404).json({
        message: "Claim Not Found"
      });
    }

    const itemId = result[0].item_id;

    //Update the Status by staff 
    const updateClaimQuery = `UPDATE claims SET status = ? WHERE id = ?`;

    db.query(updateClaimQuery, [status, claimId], (err) => {
      if (err) return res.status(500).json({ message: "Error Updating Status" });

      //If Staff APPROVE the Claim
      if (status === "APPROVED") {

        //Update item status
        const updateItemQuery = `UPDATE items SET status = 'CLAIMED' WHERE id = ?`;

        db.query(updateItemQuery, [itemId], (err) => {
          if (err) return res.status(500).json({ message: "Error Updating Item" });

          //The claim which is Approved by staff Reject other Automatically
          const rejectOtherClaims = `
            UPDATE claims 
            SET status = 'REJECTED' 
            WHERE item_id = ? AND id != ?
          `;

          db.query(rejectOtherClaims, [itemId, claimId], (err) => {
            if (err) return res.status(500).json({ message: "Error rejecting others" });

            return res.json({ message: "Claim approved successfully" });
          });
        });

      } else {
        // if Staff Reject the Claim
        return res.json({ message: "Claim rejected successfully" });
      }
    });
  });
};

const getAllClaims = (req, res) => {
  const allClaims = `
    SELECT 
      c.id AS claim_id,
      c.message,
      c.status AS claim_status,
      c.created_at,

      u.id AS user_id,
      u.full_name AS user_name,
      u.email,
      u.role,

      i.id AS item_id,
      i.title AS item_title,
      i.description AS item_description,
      i.status AS item_status,
      i.location,
      i.image

    FROM claims c

    INNER JOIN users u ON c.user_id = u.id
    INNER JOIN items i ON c.item_id = i.id

    WHERE 
      c.status = 'PENDING'
      AND i.status = 'APPROVED'

    ORDER BY c.created_at DESC
    LIMIT 50
  `;

  db.query(allClaims, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Database Error" });
    }

    return res.status(200).json({
      count: results.length,
      claims: results
    });
  });
};
module.exports = {claimItem, updateClaimStatus, getAllClaims}