// routes/loyalty.js
// Express routes for managing loyalty cards and tiers for users and businesses in Hustle-Hub.

const express = require("express");
const router = express.Router();
const LoyaltyCard = require("../models/LoyaltyCard");
const authMiddleware = require("../middleware/authMiddleware");

// GET /loyalty-cards (for business loyalty tiers)
// Returns all loyalty tiers defined for businesses (for vendor dashboard and customer selection)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const loyaltyCards = await LoyaltyCard.find({ business_id: { $exists: true } });
    
    const formattedCards = loyaltyCards.map((card) => ({
      id: card._id,
      tier: card.tier,
      discount: card.discount,
      minSpend: card.minSpend,
      minCompletedOrders: card.minCompletedOrders,
      color: card.color,
    }));

    return res.json(formattedCards);
  } catch (err) {
    console.error("Error fetching loyalty cards:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// POST /loyalty-cards (create loyalty tier)
// Allows vendors to create a new loyalty tier for their business
router.post("/", authMiddleware, async (req, res) => {
  const { tier, discount, minSpend, minCompletedOrders, color, business_id } = req.body;
  console.log("Loyalty tier creation attempt by:", req.user.email);

  try {
    // Only providers can create loyalty tiers
    if (!req.user.is_provider) {
      return res.status(403).json({ error: "Only vendors can create loyalty tiers" });
    }

    if (!tier || !discount || !minSpend) {
      return res.status(400).json({ error: "Tier name, discount, and minimum spend are required" });
    }

    const newLoyaltyCard = new LoyaltyCard({
      tier,
      discount: parseInt(discount),
      minSpend: parseInt(minSpend),
      minCompletedOrders: parseInt(minCompletedOrders) || 0,
      color: color || "bg-blue-500",
      business_id,
      user_id: req.user._id, // Temporary user_id for tier creation
    });

    await newLoyaltyCard.save();

    return res.status(201).json({
      id: newLoyaltyCard._id,
      tier: newLoyaltyCard.tier,
      discount: newLoyaltyCard.discount,
      minSpend: newLoyaltyCard.minSpend,
      minCompletedOrders: newLoyaltyCard.minCompletedOrders,
      color: newLoyaltyCard.color,
    });
  } catch (err) {
    console.error("Error creating loyalty tier:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// DELETE /loyalty-cards/:id (delete loyalty tier)
// Allows vendors to delete a loyalty tier from their business
router.delete("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  console.log("Loyalty tier deletion attempt by:", req.user.email);

  try {
    // Only providers can delete loyalty tiers
    if (!req.user.is_provider) {
      return res.status(403).json({ error: "Only vendors can delete loyalty tiers" });
    }

    const loyaltyCard = await LoyaltyCard.findByIdAndDelete(id);
    if (!loyaltyCard) {
      return res.status(404).json({ error: "Loyalty tier not found" });
    }

    return res.status(200).json({ message: "Loyalty tier deleted successfully" });
  } catch (err) {
    console.error("Error deleting loyalty tier:", err);
    return res.status(500).json({ error: "Server error" });
  }
});

// GET /user/:userId/loyalty (get a user's loyalty card)
// Returns the loyalty card/tier for a specific user (for customer dashboard)
router.get("/user/:userId/loyalty", authMiddleware, async (req, res) => {
  const userId = req.params.userId;

  try {
    const card = await LoyaltyCard.findOne({ user_id: userId });

    if (!card) {
      return res.status(404).json({ error: "Loyalty card not found" });
    }

    return res.json({
      tier: card.tier,
      discount: card.discount,
      minSpend: card.minSpend,
      minCompletedOrders: card.minCompletedOrders,
      color: card.color,
    });
  } catch (err) {
    console.error("Error fetching loyalty card:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
