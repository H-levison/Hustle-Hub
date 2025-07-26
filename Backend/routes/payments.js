const express = require("express");
const router = express.Router();
const Payment = require("../models/Payment");
const authMiddleware = require("../middleware/authMiddleware");

// POST /payments - create a payment (auth required)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, payment_method } = req.body;
    if (!amount || !payment_method) {
      return res.status(400).json({ error: "amount and payment_method are required" });
    }

    const payment = new Payment({
      user_id: req.user._id,
      amount,
      payment_method,
      status: "pending",
    });

    await payment.save();
    res.status(201).json({ message: "Payment created", payment_id: payment._id });
  } catch (err) {
    console.error("Error creating payment:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /payments - get all payments for the current user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find({ user_id: req.user._id }).sort({ createdAt: -1 });
    res.json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
