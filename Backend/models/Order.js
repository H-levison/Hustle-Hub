const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  product_name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  color: { type: String },
  size: { type: String },
  image: { type: String }
});

const orderSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  vendor_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  business_id: { type: mongoose.Schema.Types.ObjectId, ref: "Business" }, // Allow null for explore products
  items: [orderItemSchema],
  subtotal: { type: Number, required: true },
  delivery_fee: { type: Number, default: 0 },
  tax: { type: Number, default: 0 },
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered', 'cancelled'], 
    default: 'pending' 
  },
  customer_name: { type: String, required: true },
  customer_phone: { type: String, required: true },
  customer_address: { type: String },
  notes: { type: String },
  payment_method: { type: String, default: 'whatsapp' },
  payment_status: { 
    type: String, 
    enum: ['pending', 'paid', 'failed'], 
    default: 'pending' 
  },
  whatsapp_sent: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema); 