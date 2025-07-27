const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const authMiddleware = require("../middleware/authMiddleware");

// POST /orders - Create a new order
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      business_id,
      items,
      subtotal,
      delivery_fee = 0,
      tax = 0,
      total,
      customer_name,
      customer_phone,
      customer_address,
      notes
    } = req.body;

    // Validate required fields
    if (!business_id || !items || !total || !customer_name || !customer_phone) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Handle business_id - it might be a fake ID for explore products
    let vendor_id = req.user._id; // Default to customer ID
    let actual_business_id = business_id;
    
    // Check if business_id is a valid MongoDB ObjectId
    if (business_id && !business_id.startsWith('explore_')) {
      try {
        const Business = require("../models/Business");
        const business = await Business.findById(business_id);
        
        if (business) {
          vendor_id = business.owner_id; // Use the business owner as vendor
          actual_business_id = business_id;
        }
      } catch (err) {
        console.error("Error finding business:", err);
        // Continue with default values
      }
    } else {
      // For explore products, we don't have a real business_id
      // We'll use a placeholder or null
      actual_business_id = null;
    }

    // Create the order
    const order = new Order({
      customer_id: req.user._id,
      vendor_id: vendor_id,
      business_id: actual_business_id,
      items,
      subtotal,
      delivery_fee,
      tax,
      total,
      customer_name,
      customer_phone,
      customer_address,
      notes
    });

    await order.save();

    res.status(201).json({
      message: "Order created successfully",
      order: {
        id: order._id,
        status: order.status,
        total: order.total,
        created_at: order.created_at
      }
    });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /orders/vendor - Get orders for the current vendor
router.get("/vendor", authMiddleware, async (req, res) => {
  try {
    // Only vendors can access this endpoint
    if (!req.user.is_provider) {
      return res.status(403).json({ error: "Only vendors can access this endpoint" });
    }

    const orders = await Order.find({ vendor_id: req.user._id })
      .sort({ created_at: -1 }) // Most recent first
      .populate('business_id', 'name');

    const response = orders.map(order => ({
      id: order._id,
      items: order.items,
      subtotal: order.subtotal,
      delivery_fee: order.delivery_fee,
      tax: order.tax,
      total: order.total,
      status: order.status,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_address: order.customer_address,
      notes: order.notes,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      whatsapp_sent: order.whatsapp_sent,
      created_at: order.created_at,
      updated_at: order.updated_at,
      business_name: order.business_id?.name || 'Explore Store'
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching vendor orders:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /orders/customer - Get orders for the current customer
router.get("/customer", authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ customer_id: req.user._id })
      .sort({ created_at: -1 })
      .populate('business_id', 'name');

    const response = orders.map(order => ({
      id: order._id,
      items: order.items,
      subtotal: order.subtotal,
      delivery_fee: order.delivery_fee,
      tax: order.tax,
      total: order.total,
      status: order.status,
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      customer_address: order.customer_address,
      notes: order.notes,
      payment_method: order.payment_method,
      payment_status: order.payment_status,
      whatsapp_sent: order.whatsapp_sent,
      created_at: order.created_at,
      updated_at: order.updated_at,
      business_name: order.business_id?.name || 'Explore Store'
    }));

    res.json(response);
  } catch (err) {
    console.error("Error fetching customer orders:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /orders/:orderId/status - Update order status (vendor only)
router.put("/:orderId/status", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    // Only vendors can update order status
    if (!req.user.is_provider) {
      return res.status(403).json({ error: "Only vendors can update order status" });
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const order = await Order.findOneAndUpdate(
      { _id: orderId, vendor_id: req.user._id },
      { 
        status,
        updated_at: new Date()
      },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found or not owned by vendor" });
    }

    res.json({
      message: "Order status updated successfully",
      order: {
        id: order._id,
        status: order.status,
        updated_at: order.updated_at
      }
    });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// PUT /orders/:orderId/whatsapp-sent - Mark WhatsApp message as sent
router.put("/:orderId/whatsapp-sent", authMiddleware, async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findOneAndUpdate(
      { _id: orderId, customer_id: req.user._id },
      { whatsapp_sent: true },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found or not owned by customer" });
    }

    res.json({
      message: "WhatsApp sent status updated",
      whatsapp_sent: order.whatsapp_sent
    });
  } catch (err) {
    console.error("Error updating WhatsApp sent status:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router; 