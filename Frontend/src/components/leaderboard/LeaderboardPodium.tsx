import React from "react";

const podiumData = [
  {
    place: 1,
    name: "Roger Korsgaard",
    avatar: "/public/profile.jpg",
    points: 1290,
    role: "DayTrader",
    shop: "Coffee House",
    badge: "Options",
    xscore: 83,
  },
  {
    place: 2,
    name: "Charlie Herwitz",
    avatar: "/public/profile.jpg",
    points: 1100,
    role: "Swing Trader",
    shop: "Book Store",
    badge: "Stocks",
    xscore: 80,
  },
  {
    place: 3,
    name: "Ahmad Mango",
    avatar: "/public/profile.jpg",
    points: 950,
    role: "Short Bias",
    shop: "Grocery Mart",
    badge: "Options",
    xscore: 75,
  },
];

const placeColors = [
  "bg-gradient-to-tr from-yellow-200 to-yellow-50",
  "bg-gradient-to-tr from-gray-200 to-gray-50",
  "bg-gradient-to-tr from-orange-200 to-orange-50",
];

const LeaderboardPodium = () => (
  <div className="flex justify-center items-end gap-6 relative z-10 mb-8">
    {podiumData.map((user, idx) => {
      // 1st place is in the middle, 2nd on the left, 3rd on the right
      const isFirst = idx === 0;
      const isSecond = idx === 1;
      const isThird = idx === 2;
      // Arrange: 2nd, 1st, 3rd
      const order = [1, 0, 2];
      const userIdx = order[idx];
      const userData = podiumData[userIdx];
      const size = isFirst ? "w-32 h-32" : "w-24 h-24";
      const cardScale = isFirst ? "scale-110" : "scale-95";
      const cardPadding = isFirst ? "p-8" : "p-4";
      const cardZ = isFirst ? "z-10" : "z-0";
      const cardMargin = isFirst ? "mb-0" : "mb-8";
      return (
        <div
          key={userData.place}
          className={`flex flex-col items-center rounded-xl shadow-lg ${cardPadding} w-56 ${placeColors[userIdx]} ${cardScale} ${cardZ} ${cardMargin}`}
          style={{ order: idx === 1 ? 0 : idx === 0 ? 1 : 2 }}
        >
          <div className={`rounded-full overflow-hidden border-4 border-white mb-2 ${size}`}>
            <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
          </div>
          <div className="text-lg font-bold mb-1">{userData.name}</div>
          <div className="text-xs text-blue-500 font-semibold mb-1">{userData.role}</div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{userData.badge}</span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">X {userData.xscore}</span>
          </div>
          <div className="text-2xl font-bold text-gray-800 mb-2">{userData.points} pts</div>
          <button className="border border-gray-300 rounded px-4 py-1 text-sm font-medium hover:bg-gray-100">Profile</button>
        </div>
      );
    })}
  </div>
);

export default LeaderboardPodium; 