import React from "react";

const tableData = [
  {
    rank: 1,
    name: "Roger Korsgaard",
    avatar: "/public/profile.jpg",
    tier: "Expert Level",
    shop: "Coffee House",
    points: 1290,
    visits: 54,
    discount: "15%",
    rewards: 8,
    loyaltyScore: 83,
  },
  {
    rank: 2,
    name: "Charlie Herwitz",
    avatar: "/public/profile.jpg",
    tier: "Master",
    shop: "Book Store",
    points: 1100,
    visits: 47,
    discount: "12%",
    rewards: 6,
    loyaltyScore: 80,
  },
  {
    rank: 3,
    name: "Ahmad Mango",
    avatar: "/public/profile.jpg",
    tier: "Expert Level",
    shop: "Grocery Mart",
    points: 950,
    visits: 39,
    discount: "10%",
    rewards: 5,
    loyaltyScore: 75,
  },
  {
    rank: 4,
    name: "Cristofer George",
    avatar: "/public/profile.jpg",
    tier: "Master",
    shop: "Book Store",
    points: 800,
    visits: 30,
    discount: "8%",
    rewards: 3,
    loyaltyScore: 66,
  },
  {
    rank: 5,
    name: "Roger George",
    avatar: "/public/profile.jpg",
    tier: "Expert Level",
    shop: "Grocery Mart",
    points: 700,
    visits: 25,
    discount: "5%",
    rewards: 2,
    loyaltyScore: 60,
  },
];

const LeaderboardTable = () => (
  <div className="mt-8">
    <table className="min-w-full bg-white rounded-xl shadow overflow-hidden">
      <thead>
        <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
          <th className="px-4 py-3 text-left">Name</th>
          <th className="px-2 py-3">Rank</th>
          <th className="px-2 py-3">Shop</th>
          <th className="px-2 py-3">Tier</th>
          <th className="px-2 py-3">Points</th>
          <th className="px-2 py-3">Visits</th>
          <th className="px-2 py-3">Discount</th>
          <th className="px-2 py-3">Rewards Redeemed</th>
          <th className="px-2 py-3">Loyalty Score</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((user, idx) => (
          <tr key={user.rank} className={`border-b ${idx < 3 ? "border-yellow-300" : "border-gray-100"} hover:bg-gray-50 transition`}>
            <td className="flex items-center gap-3 px-4 py-2">
              <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
              <div>
                <div className="font-semibold">{user.name}</div>
              </div>
            </td>
            <td className="text-center">{user.rank}</td>
            <td className="text-center">{user.shop}</td>
            <td className="text-center">
              <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs font-semibold">{user.tier}</span>
            </td>
            <td className="text-center">{user.points}</td>
            <td className="text-center">{user.visits}</td>
            <td className="text-center">{user.discount}</td>
            <td className="text-center">{user.rewards}</td>
            <td className="text-center">
              <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs font-semibold">{user.loyaltyScore}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default LeaderboardTable; 