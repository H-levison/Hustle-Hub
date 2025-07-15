import React from "react";
import { Navigation } from "../components/Navigation";

const tiers = [
  { name: "Bronze", icon: "🥉" },
  { name: "Silver", icon: "🥈" },
  { name: "Gold", icon: "🥇" },
  { name: "Platinum", icon: "💎" },
];
const currentTier = "Gold"; // Mock current tier

const stores = [
  {
    name: "Coffee House",
    tier: "Gold",
    points: 1200,
    logo: "/public/logo (1).png",
  },
  {
    name: "Book Store",
    tier: "Silver",
    points: 800,
    logo: "/public/logo (2).png",
  },
  {
    name: "Grocery Mart",
    tier: "Bronze",
    points: 350,
    logo: "/public/LOGO.png",
  },
];

const LoyaltyCards = () => (
  <>
    <Navigation />
    <main className="p-8 max-w-5xl mx-auto">
      {/* Tier Card List */}
      <div className="flex justify-center gap-6 mb-10 mt-4">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`flex flex-col items-center px-6 py-4 rounded-xl shadow-lg border-2 transition-all duration-200
              ${tier.name === currentTier ? "border-yellow-400 bg-yellow-50 scale-105" : "border-gray-200 bg-white opacity-70"}`}
          >
            <div className="text-4xl mb-2">{tier.icon}</div>
            <div className={`font-bold text-lg ${tier.name === currentTier ? "text-yellow-600" : "text-gray-500"}`}>{tier.name}</div>
            {tier.name === currentTier && (
              <div className="mt-1 text-xs text-yellow-700 font-semibold">Current Tier</div>
            )}
          </div>
        ))}
      </div>
      {/* Store Cards Grid */}
      <h2 className="text-xl font-bold mb-4">Your Store Loyalty Cards</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {stores.map((store) => (
          <div key={store.name} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center border border-gray-100">
            <img src={store.logo} alt={store.name} className="w-16 h-16 mb-3 rounded-full object-cover border-2 border-gray-200" />
            <div className="font-bold text-lg mb-1">{store.name}</div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{tiers.find(t => t.name === store.tier)?.icon}</span>
              <span className="font-semibold text-gray-700">{store.tier} Tier</span>
            </div>
            <div className="mb-3 text-sm text-gray-500">Points: <span className="font-bold text-blue-600">{store.points}</span></div>
            <button className="mt-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Shop Now</button>
          </div>
        ))}
      </div>
    </main>
  </>
);

export default LoyaltyCards;
