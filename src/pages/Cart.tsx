import React from 'react';
import { Navigation } from "../components/Navigation";

const CartItems = () => (
  <div className="bg-white rounded-xl shadow p-4 mb-4">
    <h2 className="font-semibold mb-2">Shopping Cart</h2>
    <p className="text-gray-500 text-sm">(Cart items placeholder)</p>
  </div>
);

const CouponCode = () => (
  <div className="bg-white rounded-xl shadow p-4 mb-4">
    <h2 className="font-semibold mb-2">Coupon Code</h2>
    <input className="w-full border rounded px-2 py-1 mb-2" placeholder="Enter Your Coupon Code" />
    <button className="w-full bg-white border border-blue-600 text-blue-600 rounded py-2">Apply Your Loyalty card</button>
  </div>
);

const OrderSummary = () => (
  <div className="bg-white rounded-xl shadow p-4 mb-4">
    <h2 className="font-semibold mb-2">Order Summary</h2>
    <div className="flex justify-between text-sm mb-1"><span>Discount</span><span>$0.00</span></div>
    <div className="flex justify-between text-sm mb-1"><span>Delivery</span><span>$29.99</span></div>
    <div className="flex justify-between text-sm mb-1"><span>Tax</span><span>$39.99</span></div>
    <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>$1879.93</span></div>
  </div>
);

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