import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the shape of a cart item
export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  color?: string;
  size?: string;
  quantity: number;
  businessId: string; // Use business_id as unique identifier
  vendorName: string;
  vendorWhatsapp: string;
}

// Define vendor group structure
export interface VendorGroup {
  businessId: string;
  vendorName: string;
  vendorWhatsapp: string;
  items: CartItem[];
}

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

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const addToCart = (item: CartItem) => {
    setCart(prev => {
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

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const clearVendorItems = (businessId: string) => {
    setCart(prev => prev.filter(item => item.businessId !== businessId));
  };

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