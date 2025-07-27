import React from 'react';
import { useCart } from '../CartContext';
import { CheckCircle } from 'lucide-react';

const CartNotification: React.FC = () => {
  const { showNotification, notificationMessage } = useCart();

  if (!showNotification) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className="bg-hustlehub-blue text-white px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm">
        <CheckCircle size={20} className="flex-shrink-0" />
        <span className="font-medium">{notificationMessage}</span>
      </div>
    </div>
  );
};

export default CartNotification; 