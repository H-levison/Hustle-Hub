import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Star, Gift, CreditCard, Award, TrendingUp, ArrowRight, ShoppingBag, User, Crown, Zap } from 'lucide-react';

// Mock data for demonstration
const mockLoyaltyCards = [
  {
    businessName: "Fresh Bakes by Amina",
    points: 32,
    discountLevel: 10,
    pointsGoal: 50,
    icon: "🧁",
    category: "Bakery",
    vendorTier: "Bronze",
    vendorPoints: 320,
    nextTierPoints: 500,
    gradient: "from-pink-400 to-rose-500"
  },
  {
    businessName: "Campus Cuts & Styles",
    points: 18,
    discountLevel: 5,
    pointsGoal: 30,
    icon: "💇‍♂️",
    category: "Beauty",
    vendorTier: "Bronze",
    vendorPoints: 180,
    nextTierPoints: 500,
    gradient: "from-purple-400 to-indigo-500"
  },
  {
    businessName: "Jewelry by Kofi",
    points: 50,
    discountLevel: 15,
    pointsGoal: 60,
    icon: "💎",
    category: "Jewelry",
    vendorTier: "Silver",
    vendorPoints: 750,
    nextTierPoints: 1000,
    gradient: "from-emerald-400 to-teal-500"
  },
];

const tiers = [
  { 
    name: "Bronze", 
    icon: "🥉", 
    minPoints: 0, 
    benefits: "JAN-MAR GIVE AWAY",
    color: "from-orange-400 to-amber-600",
    bgColor: "bg-amber-50",
    borderColor: "border-amber-200"
  },
  { 
    name: "Silver", 
    icon: "🥈", 
    minPoints: 500, 
    benefits: "APR-JUN GIVE AWAY",
    color: "from-gray-400 to-gray-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200"
  },
  { 
    name: "Gold", 
    icon: "🥇", 
    minPoints: 1000, 
    benefits: "JUL-SEP GIVE AWAY",
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-200"
  },
  { 
    name: "Platinum", 
    icon: "💎", 
    minPoints: 2000, 
    benefits: "OCT-DEC GIVE AWAY",
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  },
];

const currentTier = "Gold";
const totalPoints = 1250;

const LoyaltyCard = ({ businessName, points, discountLevel, pointsGoal, icon, category, vendorTier, vendorPoints, nextTierPoints, gradient }) => {
  const progress = (points / pointsGoal) * 100;
  const tierProgress = (vendorPoints / nextTierPoints) * 100;
  
  return (
    <div className="group cursor-pointer">
      <div className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 group-hover:border-gray-200 group-hover:-translate-y-2">
        {/* Card Header with Gradient */}
        <div className={`bg-gradient-to-br ${gradient} p-6 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <div className="text-8xl transform rotate-12">{icon}</div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">{icon}</div>
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <span className="text-xs font-bold">{vendorTier}</span>
              </div>
            </div>
            <h3 className="text-xl font-bold mb-1">{businessName}</h3>
            <p className="text-white/80 text-sm mb-4">{category}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold">{discountLevel}%</span>
              <span className="text-white/80 text-sm">Discount</span>
            </div>
          </div>
        </div>
        
        {/* Card Body */}
        <div className="p-6 space-y-4">
          {/* Current Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Loyalty Points</span>
              <span className="text-sm font-bold text-gray-900">{points} / {pointsGoal}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className={`bg-gradient-to-r ${gradient} h-3 rounded-full transition-all duration-700 relative`}
                style={{ width: `${Math.min(progress, 100)}%` }}
              >
                <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-1">Earn more points for bigger rewards</p>
          </div>
          
          {/* Vendor Tier Progress */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">Vendor Progress</span>
              <span className="text-xs text-gray-500">{vendorPoints} / {nextTierPoints}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(tierProgress, 100)}%` }}
              ></div>
            </div>
          </div>
          
          {/* Action Button */}
          <button className="w-full bg-gradient-to-r from-gray-900 to-gray-700 hover:from-gray-800 hover:to-gray-600 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 group-hover:shadow-lg">
            <CreditCard className="h-4 w-4" />
            Use Card
          </button>
        </div>
      </div>
    </div>
  );
};

const LoyaltyCards = () => {
  const currentTierData = tiers.find(tier => tier.name === currentTier);
  const nextTierData = tiers[tiers.findIndex(tier => tier.name === currentTier) + 1];

  return (
    <>
    <Navigation />
    <div className="min-h-screen  bg-gradient-to-br from-gray-50 via-white to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden  mx-5 mt-5 rounded-xl">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative px-6 py-20 max-w-7xl mx-auto">
          <div className="text-center text-white">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-full px-6 py-3 mb-8 border border-white/20">
              <Crown className="h-5 w-5 text-yellow-300" />
              <span className="text-sm font-semibold">Premium Loyalty Program</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Your Digital
              <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                Wallet
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-12 leading-relaxed">
              Earn points across all vendors, unlock exclusive rewards, and enjoy personalized benefits at your favorite campus businesses
            </p>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <Zap className="h-8 w-8 text-yellow-300" />
                </div>
                <div className="text-3xl font-bold mb-1">{totalPoints}</div>
                <div className="text-blue-200 text-sm">Total Points</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <ShoppingBag className="h-8 w-8 text-green-300" />
                </div>
                <div className="text-3xl font-bold mb-1">{mockLoyaltyCards.length}</div>
                <div className="text-blue-200 text-sm">Active Cards</div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-center mb-3">
                  <Award className="h-8 w-8 text-purple-300" />
                </div>
                <div className="text-3xl font-bold mb-1">{currentTier}</div>
                <div className="text-blue-200 text-sm">Global Tier</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        {/* Current Tier Status */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
            <div className={`bg-gradient-to-r ${currentTierData?.color} p-8 text-white relative overflow-hidden`}>
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                <div className="text-9xl">{currentTierData?.icon}</div>
              </div>
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="text-6xl">{currentTierData?.icon}</div>
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{currentTier} Member</h2>
                    <p className="text-white/90 text-lg">{currentTierData?.benefits}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <User className="h-4 w-4" />
                      <span className="text-sm">Global Platform Tier</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold mb-1">{totalPoints}</div>
                  <div className="text-white/90">Points</div>
                </div>
              </div>
            </div>
            
            {nextTierData && (
              <div className="p-8 bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600 font-medium">Progress to {nextTierData.name}</span>
                  <span className="text-sm font-bold text-gray-800 bg-gray-200 px-3 py-1 rounded-full">
                    {totalPoints} / {nextTierData.minPoints} points
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 mb-4 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 h-4 rounded-full transition-all duration-1000 relative"
                    style={{ width: `${Math.min((totalPoints / nextTierData.minPoints) * 100, 100)}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-gray-600 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  {nextTierData.minPoints - totalPoints} more points to unlock {nextTierData.benefits}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Membership Tiers */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Membership Tiers</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Universal points, vendor-specific benefits. Earn everywhere, unlock rewards per business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier, index) => (
              <div key={tier.name} className={`relative rounded-3xl p-8 border-2 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                tier.name === currentTier 
                  ? `border-blue-500 ${tier.bgColor} shadow-2xl scale-105 ring-4 ring-blue-200` 
                  : `border-gray-200 bg-white hover:border-gray-300 hover:shadow-lg`
              }`}>
                {tier.name === currentTier && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                      Current Tier
                    </span>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="text-5xl mb-4">{tier.icon}</div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                  <div className="bg-gray-100 rounded-full px-3 py-1 mb-4 inline-block">
                    <span className="text-sm font-medium text-gray-700">{tier.minPoints}+ points</span>
                  </div>
                  <p className="text-gray-600">{tier.benefits}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Individual Business Cards */}
        <section className="pb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Individual Business Cards</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Each vendor has their own tier system based on your spending with them specifically.
            </p>
          </div>
          
          {mockLoyaltyCards.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockLoyaltyCards.map((card, idx) => (
                <LoyaltyCard
                  key={idx}
                  {...card}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
                <Gift className="h-16 w-16 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No business cards yet</h3>
              <p className="text-gray-600 mb-8 text-lg">Support a business to start earning vendor-specific rewards!</p>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-10 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Discover Businesses
              </button>
            </div>
          )}
        </section>
      </div>
    </div>
    </>
  );
};

export default LoyaltyCards;