  const express = require("express");
  const router = express.Router();

  const verifyToken = require("../middleware/authMiddleware");
  const isStaff = require("../middleware/staffMiddleware");

  const {
    addItem,
    allItems,
    deleteItems,
    getPendingItems,
    rejectItem,
    approveItem,
    addItemStaff,
    searchItems,
    getStaff,
    userReports
  } = require("../controllers/itemController");
  const upload = require("../middleware/upload");

  //These Are all of the Student API
  router.post("/report", verifyToken, upload.single("image"), addItem);
  router.get("/pending", verifyToken, getPendingItems);
  router.get("/search", searchItems);
  router.get("/", verifyToken, allItems);
  router.get("/staff", verifyToken, getStaff)//Use this API to Show the Dropdown of Staff List
  router.get("/user-reports", verifyToken, userReports)
  
  //These Are all of the Staff API 
  router.post("/staff/report", verifyToken, isStaff,   upload.single("image"), addItemStaff)
  router.get("/pending", verifyToken, isStaff, getPendingItems);
  router.put("/:id/approve", verifyToken, isStaff, approveItem);
  router.put("/:id/reject", verifyToken, isStaff, rejectItem);
  router.delete("/:id", verifyToken, isStaff, deleteItems);

  module.exports = router;