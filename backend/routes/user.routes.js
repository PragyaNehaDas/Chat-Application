const express = require("express"); // Corrected the typo "expres" to "express"

const isAuthenticate = require("../middleware/verifyToken");
const { getUserForSideBar } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", isAuthenticate, getUserForSideBar);

module.exports = router;