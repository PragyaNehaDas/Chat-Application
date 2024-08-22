const express = require("express"); // Corrected the typo "expres" to "express"
const { sendMessage, getMessage } = require("../controllers/message.controller");
const isAuthenticate = require("../middleware/verifyToken");

const router = express.Router();

router.post("/send/:id", isAuthenticate, sendMessage);
router.get("/:id", isAuthenticate, getMessage)

module.exports = router;