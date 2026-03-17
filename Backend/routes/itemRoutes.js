const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/authMiddleware");


const { addItem, allItems } = require("../controllers/itemController");
const upload = require("../config/multer");
router.post("/report", verifyToken, upload.single("image"), addItem);
router.get("/", allItems);

module.exports = router;