const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");

// ===============================
// Auth Routes
// ===============================
router.post("/register", register); // Register new user
router.post("/login", login);       // Login existing user

module.exports = router;
