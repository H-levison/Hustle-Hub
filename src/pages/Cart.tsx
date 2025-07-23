import React from 'react';
import { Navigation } from "../components/Navigation";
import { useCart } from '../CartContext';

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
      <ul className="divide-y divide-gray-200">
        {cart.map((item, idx) => (
          <li key={idx} className="py-4 flex items-center gap-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 rounded object-cover border" />
            <div className="flex-1">
              <div className="font-semibold">{item.title}</div>
              <div className="text-sm text-gray-500">Color: {item.color} | Size: {item.size}</div>
              <div className="text-sm">Qty: {item.quantity}</div>
              <div className="text-blue-600 font-bold">Rwf{item.price.toLocaleString()}</div>
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
    <button className="w-full bg-white border border-blue-600 text-blue-600 rounded py-2">Apply Your Loyalty card</button>
  </div>
);

const OrderSummary = () => {
  const { cart } = useCart();
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = cart.length > 0 ? 2999 : 0;
  const tax = cart.length > 0 ? 3999 : 0;
  const total = subtotal + delivery + tax;
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="font-semibold mb-2">Order Summary</h2>
      <div className="flex justify-between text-sm mb-1"><span>Subtotal</span><span>Rwf{subtotal.toLocaleString()}</span></div>
      <div className="flex justify-between text-sm mb-1"><span>Delivery</span><span>Rwf{delivery.toLocaleString()}</span></div>
      <div className="flex justify-between text-sm mb-1"><span>Tax</span><span>Rwf{tax.toLocaleString()}</span></div>
      <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>Rwf{total.toLocaleString()}</span></div>
    </div>
  );
};

const PaymentMethod = () => (
  <div className="bg-white rounded-xl shadow p-4">
    <h2 className="font-semibold mb-2">Payment Method</h2>
    <div className="flex gap-2 mb-4">
      <span className="bg-gray-100 rounded p-2">Pay on delivery</span>
    </div>
    <button className="w-full bg-blue-600 text-white rounded py-2">Check Out</button>
  </div>
);

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