const express = require("express");
const router = express.Router();

const { addItem, allItems } = require("../controllers/itemController");
const upload = require("../config/multer");

router.post("/report", upload.single("image"), addItem);
router.get("/", allItems);

module.exports = router;