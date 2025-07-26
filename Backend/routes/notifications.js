const express = require("express");
const router = express.Router();
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");

// GET /user/:userId/notifications
router.get("/user/:userId/notifications", authMiddleware, async (req, res) => {
  const userId = req.params.userId;

  try {
    const notifications = await Notification.find({ user_id: userId });

    const response = notifications.map(n => ({
      id: n._id,
      message: n.message,
      is_read: n.is_read,
      created_at: n.created_at,
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
