import React from "react";
import { Navigation } from "../components/Navigation";
import LoyaltyCard from "../components/LoyaltyCard";

// Mock data for demonstration
const mockLoyaltyCards = [
  {
    businessName: "Fresh Bakes by Amina",
    points: 32,
    discountLevel: 10,
    pointsGoal: 50,
  },
  {
    businessName: "Campus Cuts & Styles",
    points: 18,
    discountLevel: 5,
    pointsGoal: 30,
  },
  {
    businessName: "Jewelry by Kofi",
    points: 50,
    discountLevel: 15,
    pointsGoal: 60,
  },
];

const LoyaltyCards = () => (
  <>
    <Navigation />
    <main className="min-h-screen bg-[#f9fafb]">
      <section className="py-12 px-6 max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 text-center text-[#1c09ed]">Loyalty Cards</h1>
        <p className="mb-10 text-gray-600 max-w-2xl mx-auto text-center text-base sm:text-lg">
          Here are your digital loyalty cards for businesses you support on campus. Earn points with every purchase and unlock exclusive discounts!
        </p>
        {mockLoyaltyCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockLoyaltyCards.map((card, idx) => (
              <LoyaltyCard
                key={idx}
                businessName={card.businessName}
                points={card.points}
                discountLevel={card.discountLevel}
                pointsGoal={card.pointsGoal}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-16">
            <span className="text-5xl block mb-4">🎁</span>
            <p>No loyalty cards yet. Support a business to start earning rewards!</p>
          </div>
        )}
      </section>
    </main>
  </>
);

export default LoyaltyCards;
