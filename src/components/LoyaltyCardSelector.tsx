import React, { useState, useEffect } from 'react';
import { CreditCard, Star, Gift, ChevronDown, ChevronUp } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface LoyaltyCard {
  id: string;
  business_id: string;
  business_name: string;
  business_logo: string;
  points: number;
  current_tier: string;
  current_tier_data: {
    tier: string;
    discount: number;
    minSpend: number;
    color: string;
  } | null;
  next_tier_data: {
    tier: string;
    discount: number;
    minSpend: number;
    color: string;
  } | null;
}

interface LoyaltyCardSelectorProps {
  businessId: string;
  orderTotal: number;
  onDiscountApplied: (discount: number, percentage: number, finalTotal: number) => void;
}

const LoyaltyCardSelector: React.FC<LoyaltyCardSelectorProps> = ({
  businessId,
  orderTotal,
  onDiscountApplied
}) => {
  const [loyaltyCard, setLoyaltyCard] = useState<LoyaltyCard | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [discountApplied, setDiscountApplied] = useState(false);

  useEffect(() => {
    fetchLoyaltyCard();
  }, [businessId]);

  const fetchLoyaltyCard = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_BASE}/user-loyalty/business/${businessId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setLoyaltyCard(data);
      }
    } catch (err) {
      console.error('Error fetching loyalty card:', err);
    }
  };

  const applyDiscount = async () => {
    if (!loyaltyCard || !loyaltyCard.current_tier_data) return;

    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to apply loyalty discounts');
        return;
      }

      const response = await fetch(`${API_BASE}/user-loyalty/apply-discount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          businessId,
          orderTotal
        })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.discount_applied > 0) {
          setDiscountApplied(true);
          onDiscountApplied(data.discount_applied, data.discount_percentage, data.final_total);
        } else {
          setError(data.message);
        }
      } else {
        setError(data.error || 'Failed to apply discount');
      }
    } catch (err) {
      setError('Failed to apply discount. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!loyaltyCard) {
    return null;
  }

  const currentTier = loyaltyCard.current_tier_data;
  const nextTier = loyaltyCard.next_tier_data;
  const progressToNext = nextTier ? (loyaltyCard.points / nextTier.minSpend) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{loyaltyCard.business_name}</h3>
            <p className="text-sm text-gray-500">Loyalty Card</p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-gray-400 hover:text-gray-600"
        >
          {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      {isExpanded && (
        <div className="space-y-4">
          {/* Current Tier Info */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Current Tier</span>
              <span className="text-sm font-bold text-blue-600">{currentTier?.tier || 'Bronze'}</span>
            </div>
            {currentTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount:</span>
                  <span className="font-semibold text-green-600">{currentTier.discount}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Min. Spend:</span>
                  <span className="font-semibold">RWF{currentTier.minSpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Your Points:</span>
                  <span className="font-semibold text-blue-600">{loyaltyCard.points}</span>
                </div>
              </div>
            )}
          </div>

          {/* Next Tier Progress */}
          {nextTier && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Progress to {nextTier.tier}</span>
                <span className="text-sm text-gray-500">{loyaltyCard.points} / {nextTier.minSpend}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(progressToNext, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500">
                {nextTier.minSpend - loyaltyCard.points} more points for {nextTier.discount}% discount
              </p>
            </div>
          )}

          {/* Apply Discount Button */}
          {currentTier && orderTotal >= currentTier.minSpend && !discountApplied && (
            <button
              onClick={applyDiscount}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              ) : (
                <Gift className="h-4 w-4" />
              )}
              Apply {currentTier.discount}% Discount
            </button>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {discountApplied && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-600 font-medium">
                ✓ Discount applied successfully!
              </p>
            </div>
          )}

          {/* Minimum Spend Warning */}
          {currentTier && orderTotal < currentTier.minSpend && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <p className="text-sm text-yellow-700">
                Spend RWF{(currentTier.minSpend - orderTotal).toLocaleString()} more to unlock {currentTier.discount}% discount
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LoyaltyCardSelector; 