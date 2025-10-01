const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, findUserByEmail } = require("../models/userModel");

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existing = await findUserByEmail(email);
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in DB
    const user = await createUser(name, email, hashedPassword, role);

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Register Error:", err.message);
    return res.status(500).json({ message: "Server error during registration", error: err.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials - user not found" });
    }

    // Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials - wrong password" });
    }

    // Verify JWT_SECRET is set
    if (!process.env.JWT_SECRET) {
      console.error("❌ JWT_SECRET is missing in .env");
      return res.status(500).json({ message: "Server error: JWT secret not configured" });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("❌ Login Error:", err.message);
    return res.status(500).json({ message: "Server error during login", error: err.message });
  }
};

module.exports = { register, login };
