import React, { useState, useEffect } from 'react';
import { Navigation } from "../components/Navigation";
import { useCart, VendorGroup } from '../CartContext';
import { Trash2, ShoppingBag } from 'lucide-react';
import LoyaltyCardSelector from '../components/LoyaltyCardSelector';

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

const CartItems = ({ 
  vendorDiscounts, 
  setVendorDiscounts 
}: { 
  vendorDiscounts: {[key: string]: {discount: number, percentage: number, finalTotal: number}};
  setVendorDiscounts: React.Dispatch<React.SetStateAction<{[key: string]: {discount: number, percentage: number, finalTotal: number}}>>;
}) => {
  const { cart, removeFromCart, clearVendorItems, getVendorGroups } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-6 mb-4 text-center">
        <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h2 className="font-semibold text-xl mb-2">Your cart is empty</h2>
        <p className="text-gray-500">Add some products to get started!</p>
      </div>
    );
  }

  const vendorGroups = getVendorGroups();

  return (
    <div className="space-y-6">
      {vendorGroups.map((vendorGroup) => (
        <div key={vendorGroup.businessId} className="bg-white rounded-xl shadow p-6">
          {/* Vendor Header */}
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
            <div>
              <h3 className="font-semibold text-lg">{vendorGroup.vendorName}</h3>
              <p className="text-sm text-gray-500">{vendorGroup.vendorWhatsapp}</p>
            </div>
            <button 
              onClick={() => clearVendorItems(vendorGroup.businessId)}
              className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1"
            >
              <Trash2 size={16} />
              Clear all
            </button>
          </div>

          {/* Vendor Items */}
          <ul className="divide-y divide-gray-200">
            {vendorGroup.items.map((item, idx) => (
              <li key={`${item.id}-${item.color}-${item.size}`} className="py-4 flex items-center gap-4">
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
                  <div className="text-hustlehub-blue font-bold">RWF{(item.price * item.quantity).toLocaleString()}</div>
                </div>
                <button 
                  className="text-red-500 hover:text-red-700 text-sm" 
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* Loyalty Card Selector */}
          <LoyaltyCardSelector
            businessId={vendorGroup.businessId}
            orderTotal={vendorGroup.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)}
            onDiscountApplied={(discount, percentage, finalTotal) => {
              setVendorDiscounts(prev => ({
                ...prev,
                [vendorGroup.businessId]: { discount, percentage, finalTotal }
              }));
            }}
          />

          {/* Vendor Subtotal */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Subtotal for {vendorGroup.vendorName}:</span>
              <span className="font-bold text-lg text-hustlehub-blue">
                RWF{vendorGroup.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}
              </span>
            </div>
            {vendorDiscounts[vendorGroup.businessId] && (
              <div className="mt-2 pt-2 border-t border-gray-100">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-green-600">Loyalty Discount ({vendorDiscounts[vendorGroup.businessId].percentage}%):</span>
                  <span className="text-green-600 font-semibold">
                    -RWF{vendorDiscounts[vendorGroup.businessId].discount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="font-semibold">Final Total:</span>
                  <span className="font-bold text-lg text-green-600">
                    RWF{vendorDiscounts[vendorGroup.businessId].finalTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
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

const OrderSummary = ({ vendorDiscounts }: { vendorDiscounts: {[key: string]: {discount: number, percentage: number, finalTotal: number}} }) => {
  const { cart, getVendorGroups } = useCart();
  const vendorGroups = getVendorGroups();
  
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const delivery = 0; // Set delivery fee to zero
  const tax = 0; // Set tax to zero
  
  // Calculate total loyalty discounts
  const totalLoyaltyDiscount = Object.values(vendorDiscounts).reduce((sum, discount) => sum + discount.discount, 0);
  
  // Calculate final total with loyalty discounts
  const total = subtotal + delivery + tax - totalLoyaltyDiscount;
  
  return (
    <div className="bg-white rounded-xl shadow p-4 mb-4">
      <h2 className="font-semibold mb-2">Order Summary</h2>
      
      {/* Vendor Breakdown */}
      {vendorGroups.length > 1 && (
        <div className="mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm font-medium mb-2">Orders by Vendor:</div>
          {vendorGroups.map((vendor) => (
            <div key={vendor.businessId} className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">{vendor.vendorName}:</span>
              <span>RWF{vendor.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}</span>
            </div>
          ))}
        </div>
      )}
      
      <div className="flex justify-between text-sm mb-1"><span>Subtotal</span><span>RWF{subtotal.toLocaleString()}</span></div>
      {totalLoyaltyDiscount > 0 && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-green-600">Loyalty Discounts</span>
          <span className="text-green-600">-RWF{totalLoyaltyDiscount.toLocaleString()}</span>
        </div>
      )}
      <div className="flex justify-between text-sm mb-1"><span>Delivery</span><span>RWF{delivery.toLocaleString()}</span></div>
      <div className="flex justify-between text-sm mb-1"><span>Tax</span><span>RWF{tax.toLocaleString()}</span></div>
      <div className="flex justify-between font-bold text-lg mt-2">
        <span>Total</span>
        <span className={totalLoyaltyDiscount > 0 ? "text-green-600" : ""}>RWF{total.toLocaleString()}</span>
      </div>
    </div>
  );
};

const PaymentMethod = () => {
  const { cart, getVendorGroups, clearCart } = useCart();
  const vendorGroups = getVendorGroups();
  const [isCreatingOrder, setIsCreatingOrder] = useState(false);
  const [showWhatsAppOption, setShowWhatsAppOption] = useState(false);
  
  const createOrder = async (vendorGroup: VendorGroup) => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      if (!user) {
        alert('Please log in to place an order');
        return;
      }

      const orderData = {
        business_id: vendorGroup.businessId,
        items: vendorGroup.items.map(item => ({
          product_id: item.id,
          product_name: item.title,
          price: item.price,
          quantity: item.quantity,
          color: item.color,
          size: item.size,
          image: item.image
        })),
        subtotal: vendorGroup.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        delivery_fee: 0,
        tax: 0,
        total: vendorGroup.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        customer_name: user.name || 'Customer',
        customer_phone: user.phone || '+250788123456',
        customer_address: '',
        notes: ''
      };

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Failed to create order' }));
        throw new Error(errorData.error || 'Failed to create order');
      }

      const result = await response.json();
      console.log('Order created:', result);
      
      // Mark WhatsApp as sent
      try {
        await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/orders/${result.order.id}/whatsapp-sent`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
      } catch (whatsappError) {
        console.error('Error marking WhatsApp as sent:', whatsappError);
        // Don't throw error for this, as the order was created successfully
      }

      return result;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const handleCheckoutAll = async () => {
    setIsCreatingOrder(true);
    try {
      // Create orders for all vendors
      const orderPromises = vendorGroups.map(vendorGroup => createOrder(vendorGroup));
      await Promise.all(orderPromises);
      
      // Clear cart after successful order creation
      clearCart();
      alert('Orders created successfully! Vendors will be notified.');
      
      // Show WhatsApp option as fallback
      setShowWhatsAppOption(true);
    } catch (error) {
      console.error('Error creating orders:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to create orders: ${errorMessage}. You can still use WhatsApp as a fallback.`);
      setShowWhatsAppOption(true);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleCheckoutVendor = async (vendorGroup: VendorGroup) => {
    setIsCreatingOrder(true);
    try {
      await createOrder(vendorGroup);
      
      // Remove items from this vendor from cart
      const updatedCart = cart.filter(item => item.businessId !== vendorGroup.businessId);
      // Note: You might need to add a method to update cart with specific items
      
      alert('Order created successfully! Vendor will be notified.');
      setShowWhatsAppOption(true);
    } catch (error) {
      console.error('Error creating order:', error);
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      alert(`Failed to create order: ${errorMessage}. You can still use WhatsApp as a fallback.`);
      setShowWhatsAppOption(true);
    } finally {
      setIsCreatingOrder(false);
    }
  };

  const handleWhatsAppFallback = () => {
    // For multiple vendors, we'll create separate WhatsApp messages
    vendorGroups.forEach((vendorGroup) => {
      const orderLines = vendorGroup.items.map(item =>
        `- ${item.title} (Qty: ${item.quantity}${item.color ? ", Color: " + item.color : ""}${item.size ? ", Size: " + item.size : ""}) - RWF${item.price * item.quantity}`
      ).join("%0A");
      const vendorTotal = vendorGroup.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const message = `Hello, I want to order:%0A${orderLines}%0A%0ATotal: RWF${vendorTotal.toLocaleString()}`;
      const whatsappUrl = `https://wa.me/${vendorGroup.vendorWhatsapp.replace(/[^\d]/g, '')}?text=${message}`;
      window.open(whatsappUrl, '_blank');
    });
  };

  const handleWhatsAppVendor = (vendorGroup: VendorGroup) => {
    const orderLines = vendorGroup.items.map(item =>
      `- ${item.title} (Qty: ${item.quantity}${item.color ? ", Color: " + item.color : ""}${item.size ? ", Size: " + item.size : ""}) - RWF${item.price * item.quantity}`
    ).join("%0A");
    const vendorTotal = vendorGroup.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const message = `Hello, I want to order:%0A${orderLines}%0A%0ATotal: RWF${vendorTotal.toLocaleString()}`;
    const whatsappUrl = `https://wa.me/${vendorGroup.vendorWhatsapp.replace(/[^\d]/g, '')}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };
  
  return (
    <div className="bg-white rounded-xl shadow p-4">
      <h2 className="font-semibold mb-2">Payment Method</h2>
      
      {vendorGroups.length > 1 && (
        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
          <div className="text-sm text-blue-800 mb-2">
            <strong>Multiple Vendors:</strong> You have items from {vendorGroups.length} different vendors.
          </div>
          <div className="text-xs text-blue-600">
            Orders will be created in the system and vendors will be notified.
          </div>
        </div>
      )}
      
      <div className="flex gap-2 mb-4">
        <span className="bg-gray-100 rounded p-2">System Order + WhatsApp</span>
      </div>
      
      {/* Checkout All Button */}
      <button 
        className="w-full bg-hustlehub-blue text-white rounded py-2 mb-3" 
        onClick={handleCheckoutAll} 
        disabled={cart.length === 0 || isCreatingOrder}
      >
        {isCreatingOrder ? 'Creating Orders...' : `Checkout All Vendors (${vendorGroups.length})`}
      </button>
      
      {/* Individual Vendor Checkout Buttons */}
      {vendorGroups.length > 1 && (
        <div className="space-y-2">
          <div className="text-sm font-medium text-gray-700 mb-2">Or checkout individually:</div>
          {vendorGroups.map((vendorGroup) => (
            <button
              key={vendorGroup.businessId}
              className="w-full bg-gray-100 text-gray-800 rounded py-2 text-sm hover:bg-gray-200 transition-colors disabled:opacity-50"
              onClick={() => handleCheckoutVendor(vendorGroup)}
              disabled={isCreatingOrder}
            >
              {isCreatingOrder ? 'Creating Order...' : `Checkout ${vendorGroup.vendorName} - RWF${vendorGroup.items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toLocaleString()}`}
            </button>
          ))}
        </div>
      )}

      {/* WhatsApp Fallback Option */}
      {showWhatsAppOption && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <h3 className="font-medium text-yellow-800 mb-2">WhatsApp Fallback</h3>
          <p className="text-sm text-yellow-700 mb-3">
            You can also send WhatsApp messages directly to vendors as a backup.
          </p>
          <div className="space-y-2">
            <button
              onClick={handleWhatsAppFallback}
              className="w-full bg-yellow-500 text-white rounded py-2 text-sm hover:bg-yellow-600 transition-colors"
            >
              Send WhatsApp to All Vendors
            </button>
            {vendorGroups.length > 1 && (
              <div className="space-y-1">
                {vendorGroups.map((vendorGroup) => (
                  <button
                    key={vendorGroup.businessId}
                    className="w-full bg-yellow-100 text-yellow-800 rounded py-1 text-xs hover:bg-yellow-200 transition-colors"
                    onClick={() => handleWhatsAppVendor(vendorGroup)}
                  >
                    WhatsApp {vendorGroup.vendorName}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Cart = () => {
  const [vendorDiscounts, setVendorDiscounts] = useState<{[key: string]: {discount: number, percentage: number, finalTotal: number}}>({});

  return (
    <>
    <Navigation />
    <div className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cart Items Section */}
      <div className="lg:col-span-2">
        <CartItems vendorDiscounts={vendorDiscounts} setVendorDiscounts={setVendorDiscounts} />
      </div>
      {/* Sidebar: Coupon, Order Summary, Payment */}
      <div className="lg:col-span-1 space-y-6">
        <CouponCode />
        <OrderSummary vendorDiscounts={vendorDiscounts} />
        <PaymentMethod />
      </div>
    </div>
    </>
  );
};

export default Cart; 