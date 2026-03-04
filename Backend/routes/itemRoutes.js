const express = require('express');
const router = express.Router();
const { addItem} = require("../controllers/itemController");
const upload = require('../config/multer');

router.post("/report",upload.single("image"), addItem);

module.exports = router
