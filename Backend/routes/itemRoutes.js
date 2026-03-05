const express = require('express');
const router = express.Router();
const { addItem} = require("../controllers/itemController");
<<<<<<< HEAD
const upload = require('../config/multer');

router.post("/report",upload.single("image"), addItem);
=======

router.post("/report", addItem);
>>>>>>> f75c8b274ae81c07ad25b3d559f1e72b889ee322

module.exports = router
