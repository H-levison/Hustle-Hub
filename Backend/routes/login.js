const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User"); // adjust the path as needed
require("dotenv").config();

// POST /login
router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);
  try {
    const user = await User.findOne({ email });
    // console.log("User found:", user);
    if (!user) {
      console.log("User not found");
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Password does not match");
      return res.status(401).json({ error: "Invalid email or password" });
    }
    console.log("isMatch:", isMatch);

    const payload = {
      _id: user._id,
      email: user.email,
      is_provider: user.is_provider,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY);
    console.log("Token created:", token);

    return res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        is_provider: user.is_provider,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
