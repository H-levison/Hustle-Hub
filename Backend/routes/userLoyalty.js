const express = require("express");
const router = express.Router();
const UserLoyaltyCard = require("../models/UserLoyaltyCard");
const LoyaltyCard = require("../models/LoyaltyCard");
const Business = require("../models/Business");
const authMiddleware = require("../middleware/authMiddleware");

// GET /user-loyalty - Get all loyalty cards for the current user
router.get("/", authMiddleware, async (req, res) => {
  try {
    const userLoyaltyCards = await UserLoyaltyCard.find({ 
      user_id: req.user._id,
      is_active: true 
    }).populate('business_id', 'name logo category_id');

    // Get business loyalty tiers for each card
    const cardsWithTiers = await Promise.all(
      userLoyaltyCards.map(async (userCard) => {
        const businessTiers = await LoyaltyCard.find({ 
          business_id: userCard.business_id._id 
        }).sort({ minSpend: 1 });

        // Find current tier and next tier
        const currentTier = businessTiers.find(tier => tier.tier === userCard.current_tier);
        const nextTier = businessTiers.find(tier => tier.minSpend > userCard.points);

        return {
          id: userCard._id,
          business_id: userCard.business_id._id,
          business_name: userCard.business_id.name,
          business_logo: userCard.business_id.logo,
          business_category: userCard.business_id.category_id,
          points: userCard.points,
          current_tier: userCard.current_tier,
          total_spent: userCard.total_spent,
          orders_count: userCard.orders_count,
          last_order_date: userCard.last_order_date,
          current_tier_data: currentTier ? {
            tier: currentTier.tier,
            discount: currentTier.discount,
            minSpend: currentTier.minSpend,
            color: currentTier.color
          } : null,
          next_tier_data: nextTier ? {
            tier: nextTier.tier,
            discount: nextTier.discount,
            minSpend: nextTier.minSpend,
            color: nextTier.color
          } : null,
          available_tiers: businessTiers
        };
      })
    );

    res.json(cardsWithTiers);
  } catch (err) {
    console.error("Error fetching user loyalty cards:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /user-loyalty/business/:businessId - Get loyalty card for specific business
router.get("/business/:businessId", authMiddleware, async (req, res) => {
  try {
    const { businessId } = req.params;
    
    let userLoyaltyCard = await UserLoyaltyCard.findOne({ 
      user_id: req.user._id,
      business_id: businessId,
      is_active: true 
    }).populate('business_id', 'name logo category_id');

    // If no loyalty card exists, create one
    if (!userLoyaltyCard) {
      userLoyaltyCard = new UserLoyaltyCard({
        user_id: req.user._id,
        business_id: businessId,
        points: 0,
        current_tier: "Bronze",
        total_spent: 0,
        orders_count: 0
      });
      await userLoyaltyCard.save();
      await userLoyaltyCard.populate('business_id', 'name logo category_id');
    }

    // Get business loyalty tiers
    const businessTiers = await LoyaltyCard.find({ 
      business_id: businessId 
    }).sort({ minSpend: 1 });

    const currentTier = businessTiers.find(tier => tier.tier === userLoyaltyCard.current_tier);
    const nextTier = businessTiers.find(tier => tier.minSpend > userLoyaltyCard.points);

    const response = {
      id: userLoyaltyCard._id,
      business_id: userLoyaltyCard.business_id._id,
      business_name: userLoyaltyCard.business_id.name,
      business_logo: userLoyaltyCard.business_id.logo,
      business_category: userLoyaltyCard.business_id.category_id,
      points: userLoyaltyCard.points,
      current_tier: userLoyaltyCard.current_tier,
      total_spent: userLoyaltyCard.total_spent,
      orders_count: userLoyaltyCard.orders_count,
      last_order_date: userLoyaltyCard.last_order_date,
      current_tier_data: currentTier ? {
        tier: currentTier.tier,
        discount: currentTier.discount,
        minSpend: currentTier.minSpend,
        color: currentTier.color
      } : null,
      next_tier_data: nextTier ? {
        tier: nextTier.tier,
        discount: nextTier.discount,
        minSpend: nextTier.minSpend,
        color: nextTier.color
      } : null,
      available_tiers: businessTiers
    };

    res.json(response);
  } catch (err) {
    console.error("Error fetching business loyalty card:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /user-loyalty/apply-discount - Apply loyalty discount to order
router.post("/apply-discount", authMiddleware, async (req, res) => {
  try {
    const { businessId, orderTotal } = req.body;

    if (!businessId || !orderTotal) {
      return res.status(400).json({ error: "Business ID and order total are required" });
    }

    // Get user's loyalty card for this business
    let userLoyaltyCard = await UserLoyaltyCard.findOne({ 
      user_id: req.user._id,
      business_id: businessId,
      is_active: true 
    });

    if (!userLoyaltyCard) {
      return res.json({
        discount_applied: 0,
        discount_percentage: 0,
        final_total: orderTotal,
        message: "No loyalty card found for this business"
      });
    }

    // Get current tier data
    const currentTier = await LoyaltyCard.findOne({ 
      business_id: businessId,
      tier: userLoyaltyCard.current_tier 
    });

    if (!currentTier) {
      return res.json({
        discount_applied: 0,
        discount_percentage: 0,
        final_total: orderTotal,
        message: "No loyalty tier found"
      });
    }

    // Check if order meets minimum spend requirement
    if (orderTotal < currentTier.minSpend) {
      return res.json({
        discount_applied: 0,
        discount_percentage: currentTier.discount,
        final_total: orderTotal,
        message: `Minimum spend of RWF${currentTier.minSpend.toLocaleString()} required for ${currentTier.discount}% discount`
      });
    }

    // Calculate discount
    const discountAmount = (orderTotal * currentTier.discount) / 100;
    const finalTotal = orderTotal - discountAmount;

    res.json({
      discount_applied: discountAmount,
      discount_percentage: currentTier.discount,
      final_total: finalTotal,
      loyalty_card_id: userLoyaltyCard._id,
      current_tier: userLoyaltyCard.current_tier,
      message: `${currentTier.discount}% discount applied!`
    });

  } catch (err) {
    console.error("Error applying loyalty discount:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /user-loyalty/update-points - Update points after order completion
router.post("/update-points", authMiddleware, async (req, res) => {
  try {
    const { businessId, orderTotal, pointsEarned } = req.body;

    if (!businessId || !orderTotal) {
      return res.status(400).json({ error: "Business ID and order total are required" });
    }

    // Get or create user loyalty card
    let userLoyaltyCard = await UserLoyaltyCard.findOne({ 
      user_id: req.user._id,
      business_id: businessId,
      is_active: true 
    });

    if (!userLoyaltyCard) {
      userLoyaltyCard = new UserLoyaltyCard({
        user_id: req.user._id,
        business_id: businessId,
        points: 0,
        current_tier: "Bronze",
        total_spent: 0,
        orders_count: 0
      });
    }

    // Update loyalty card data
    userLoyaltyCard.points += pointsEarned || Math.floor(orderTotal / 1000); // 1 point per 1000 RWF spent
    userLoyaltyCard.total_spent += orderTotal;
    userLoyaltyCard.orders_count += 1;
    userLoyaltyCard.last_order_date = new Date();

    // Check if user qualifies for higher tier
    const businessTiers = await LoyaltyCard.find({ 
      business_id: businessId 
    }).sort({ minSpend: -1 }); // Sort by highest minSpend first

    for (const tier of businessTiers) {
      if (userLoyaltyCard.points >= tier.minSpend) {
        userLoyaltyCard.current_tier = tier.tier;
        break;
      }
    }

    await userLoyaltyCard.save();

    res.json({
      message: "Loyalty points updated successfully",
      updated_card: {
        points: userLoyaltyCard.points,
        current_tier: userLoyaltyCard.current_tier,
        total_spent: userLoyaltyCard.total_spent,
        orders_count: userLoyaltyCard.orders_count
      }
    });

  } catch (err) {
    console.error("Error updating loyalty points:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router; 