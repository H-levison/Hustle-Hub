const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// PUT /user/become-vendor
router.put("/become-vendor", authMiddleware, async (req, res) => {
  try {
    console.log("Decoded user from token:", req.user); // ✅ see what’s inside the token

    const user = await User.findById(req.user._id);
    if (!user) {
      console.log("User not found for ID:", req.user._id); // 🧪 debug
      return res.status(404).json({ error: "User not found" });
    }

    if (user.is_provider) {
      return res.status(200).json({ message: "Already a vendor" });
    }

    user.is_provider = true;
    await user.save();

    return res.status(200).json({ message: "You are now a vendor", is_provider: true });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
