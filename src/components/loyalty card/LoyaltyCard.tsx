import React from "react";

interface LoyaltyCardProps {
  businessName: string;
  points: number;
  discountLevel: number; // percent
  logo?: string; // emoji or image url
  pointsGoal?: number; // for progress bar
}

const getLogo = (business: string) => {
  if (business.toLowerCase().includes("bake")) return "🧁";
  if (business.toLowerCase().includes("cut")) return "💇‍♂️";
  if (business.toLowerCase().includes("jewel")) return "💎";
  return "🏆";
};

const LoyaltyCard: React.FC<LoyaltyCardProps> = ({ businessName, points, discountLevel, logo, pointsGoal = 50 }) => {
  const progress = Math.min(points / pointsGoal, 1);
  const displayLogo = logo || getLogo(businessName);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full h-auto hover:-translate-y-1 hover:scale-[1.01] transition duration-300 ease-in-out">
      {/* Left: Logo/emoji */}
      <div className="flex-shrink-0 rounded-md bg-gradient-to-br from-[#1D0AEE]/10 to-[#1D0AEE]/20 p-4 flex items-center justify-center text-4xl drop-shadow-sm">
        <span>{displayLogo}</span>
      </div>
      {/* Right: Content */}
      <div className="flex-1 flex flex-col h-full w-full justify-between">
        <div className="flex items-start justify-between w-full">
          <span className="text-lg font-semibold text-gray-900">{businessName}</span>
          <span className="bg-yellow-100 text-yellow-800 text-xs px-3 py-1 rounded-full ml-auto font-semibold mt-1 sm:mt-0">
            {discountLevel}% Discount
          </span>
        </div>
        <div className="text-sm text-gray-500 mt-1">Loyalty Points</div>
        <div className="flex items-end gap-2 mt-1">
          <span className="text-2xl font-bold text-[#1D0AEE] leading-none">{points}</span>
          <span className="text-sm text-gray-400 leading-none">/ {pointsGoal}</span>
        </div>
        {/* Progress bar */}
        <div className="w-full h-2 mt-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="bg-[#1D0AEE] h-full transition-all"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <div className="text-xs text-gray-400 mt-2">Earn more points for bigger rewards</div>
      </div>
    </div>
  );
};

export default LoyaltyCard; 