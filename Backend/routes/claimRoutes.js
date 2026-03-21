const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");

const { claimItem } = require("../controllers/claimController");

router.post("/", verifyToken, claimItem);

module.exports = router;