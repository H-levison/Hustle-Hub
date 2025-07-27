// CartContext.tsx
// Context and provider for managing the shopping cart, vendor grouping, and cart notifications in Hustle-Hub.

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a cart item
export interface CartItem {
  id: string; // Product ID
  title: string; // Product name
  price: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
  businessId: string; // Vendor/Business ID
  vendorName: string;
  vendorWhatsapp: string;
}

// Define vendor group structure for grouping cart items by business
export interface VendorGroup {
  businessId: string;
  vendorName: string;
  vendorWhatsapp: string;
  items: CartItem[];
}

// Context type for cart operations and state
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  clearVendorItems: (businessId: string) => void;
  getVendorGroups: () => VendorGroup[];
  showNotification: boolean;
  notificationMessage: string;
}

// Create the cart context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// CartProvider component to wrap the app and provide cart state
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  /**
   * Adds an item to the cart. Enforces single-vendor rule.
   * If the cart already contains items from another vendor, shows a notification and does not add.
   * If the item exists (same id, color, size, business), increases quantity.
   */
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      // Enforce single-vendor cart
      if (prev.length > 0 && prev[0].businessId !== item.businessId) {
        setNotificationMessage('You can only add products from one vendor at a time.');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        return prev;
      }
      // If item with same id, color, and size exists, increase quantity
      const existing = prev.find(
        i => i.id === item.id && i.color === item.color && i.size === item.size && i.businessId === item.businessId
      );
      if (existing) {
        setNotificationMessage('Item quantity updated in cart!');
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 3000);
        return prev.map(i =>
          i.id === item.id && i.color === item.color && i.size === item.size && i.businessId === item.businessId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      setNotificationMessage(`Item added to cart from ${item.vendorName}!`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 3000);
      return [...prev, item];
    });
  };

  /**
   * Removes an item from the cart by product id.
   */
  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  /**
   * Clears the entire cart.
   */
  const clearCart = () => setCart([]);

  /**
   * Removes all items from a specific vendor/business from the cart.
   */
  const clearVendorItems = (businessId: string) => {
    setCart(prev => prev.filter(item => item.businessId !== businessId));
  };

  /**
   * Groups cart items by vendor/business for display and checkout.
   */
  const getVendorGroups = (): VendorGroup[] => {
    const groups: { [key: string]: VendorGroup } = {};
    
    cart.forEach(item => {
      if (!groups[item.businessId]) {
        groups[item.businessId] = {
          businessId: item.businessId,
          vendorName: item.vendorName,
          vendorWhatsapp: item.vendorWhatsapp,
          items: []
        };
      }
      groups[item.businessId].items.push(item);
    });
    
    return Object.values(groups);
  };

  // Provide cart state and operations to children
  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      clearVendorItems,
      getVendorGroups,
      showNotification, 
      notificationMessage 
    }}>
      {children}
    </CartContext.Provider>
  );
}; 