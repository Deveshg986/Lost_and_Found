const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const isStaff = require("../middleware/staffMiddleware");

const {
  addItem,
  allItems,
  deleteItems,
  getPendingItem,
  rejectItem,
  approveItem
} = require("../controllers/itemController");

const upload = require("../config/multer");

//These Are all of the Student API
router.post("/report", verifyToken, upload.single("image"), addItem);
router.get("/approved", verifyToken, allItems);

//These Are all of the Staff API 
router.get("/requested", verifyToken, isStaff, getPendingItem);
router.put("/:id/approve", verifyToken, isStaff, approveItem);
router.put("/:id/reject", verifyToken, isStaff, rejectItem);
router.delete("/:id", verifyToken, isStaff, deleteItems);

module.exports = router;