import React, { useState, useEffect } from 'react';
import { Navigation } from "../components/Navigation";
import { useCart } from '../CartContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
  businessId: string;
  vendorName: string;
  vendorWhatsapp: string;
}

interface Vendor {
  id: string;
  name: string;
  whatsapp: string;
}

// Helper to get vendor from cart items
function getVendorFromCart(cart: CartItem[]): Vendor | undefined {
  if (!cart.length) return undefined;
  
  // All items in cart should have the same vendor (single-vendor cart)
  const firstItem = cart[0];
  return {
    id: firstItem.businessId,
    name: firstItem.vendorName,
    whatsapp: firstItem.vendorWhatsapp
  };
}

const CartItems = () => {
  const { cart, removeFromCart } = useCart();
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-4 mb-4 text-center">
        <h2 className="font-semibold mb-2">Shopping Cart</h2>
        <p className="text-gray-500 text-sm">Your cart is empty.</p>
      </div>
    );
  }
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="font-semibold mb-2">Shopping Cart</h2>
      {cart.length > 0 && (
        <div className="text-sm text-gray-600 mb-3">
          Vendor: {cart[0].vendorName}
        </div>
      )}
      <ul className="divide-y divide-gray-200">
        {cart.map((item, idx) => (
          <li key={idx} className="py-4 flex items-center gap-4">
            <img 
              src={item.image || "https://via.placeholder.com/64x64?text=Product"} 
              alt={item.title} 
              className="w-16 h-16 rounded object-cover border"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64?text=Product';
              }}
            />
            <div className="flex-1">
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-gray-500">
                {item.color && `Color: ${item.color}`}
                {item.color && item.size && " | "}
                {item.size && `Size: ${item.size}`}
              </div>
              <div className="text-sm">Qty: {item.quantity}</div>
              <div className="text-hustlehub-blue font-bold">RWF{item.price.toLocaleString()}</div>
            </div>
            <button className="text-red-500 hover:underline text-sm" onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CouponCode = () => (
  <div className="bg-white rounded-xl shadow p-4 mb-4">
    <h2 className="font-semibold mb-2">Coupon Code</h2>
    <input className="w-full border rounded px-2 py-1 mb-2" placeholder="Enter Your Coupon Code" />
    <button className="w-full bg-white border border-hustlehub-blue text-hustlehub-blue rounded py-2">Apply Your Loyalty card</button>
  </div>
);

const OrderSummary = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 0; // Set delivery fee to zero
  const tax = 0; // Set tax to zero
  const total = subtotal + delivery + tax;
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="font-semibold mb-2">Order Summary</h2>
      <div className="flex justify-between text-sm mb-1"><span>Subtotal</span><span>RWF{subtotal.toLocaleString()}</span></div>
      <div className="flex justify-between text-sm mb-1"><span>Delivery</span><span>RWF{delivery.toLocaleString()}</span></div>
      <div className="flex justify-between text-sm mb-1"><span>Tax</span><span>RWF{tax.toLocaleString()}</span></div>
      <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>RWF{total.toLocaleString()}</span></div>
    </div>
  );
};

const PaymentMethod = () => {
  const { cart } = useCart();
  const vendor = getVendorFromCart(cart);
  
  const handleCheckout = () => {
    if (!vendor) return;
    const orderLines = cart.map(item =>
      `- ${item.title} (Qty: ${item.quantity}${item.color ? ", Color: " + item.color : ""}${item.size ? ", Size: " + item.size : ""}) - RWF${item.price * item.quantity}`
    ).join("%0A");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0); // Only subtotal, no fees
    const message = `Hello, I want to order:%0A${orderLines}%0A%0ATotal: RWF${total.toLocaleString()}`;
    const whatsappUrl = `https://wa.me/${vendor.whatsapp.replace(/[^\d]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-2">Payment Method</h2>
      {vendor && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600 mb-1">Ordering from:</div>
          <div className="font-medium">{vendor.name}</div>
          <div className="text-sm text-gray-500">{vendor.whatsapp}</div>
        </div>
      )}
      <div className="flex gap-2 mb-4">
        <span className="bg-gray-100 rounded p-2">Pay on Whatsapp</span>
      </div>
      <button className="w-full bg-hustlehub-blue text-white rounded py-2" onClick={handleCheckout} disabled={!vendor || cart.length === 0}>
        Check Out to {vendor?.name || 'Vendor'}
      </button>
    </div>
  );
};

const Cart = () => {
  return (
    <>
    <Navigation />
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cart Items Section */}
      <div className="lg:col-span-2">
        <CartItems />
      </div>
      {/* Sidebar: Coupon, Order Summary, Payment */}
      <div className="lg:col-span-1 space-y-6">
        <CouponCode />
        <OrderSummary />
        <PaymentMethod />
      </div>
    </div>
    </>
  );
};

export default Cart; 