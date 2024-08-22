const express = require("express"); // Corrected the typo "expres" to "express"
const { signup, login, logout } = require("../controllers/auth.controller.js");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/logout", logout);

module.exports = router;
