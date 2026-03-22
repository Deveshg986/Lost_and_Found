const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const isStaff = require("../middleware/staffMiddleware");
const { claimItem , updateClaimStatus, getAllClaims} = require("../controllers/claimController");

router.post("/", verifyToken, claimItem);
router.get("/", verifyToken, isStaff, getAllClaims);
router.put("/:id/status", verifyToken, isStaff, updateClaimStatus)

module.exports = router;