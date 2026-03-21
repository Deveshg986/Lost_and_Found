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
module.exports = {claimItem}