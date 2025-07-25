import React from "react";

const stats = [
  { label: "Most Points Given", user: "Cristofer G.", value: 129 },
  { label: "Most Active", user: "Roger K.", value: 37 },
  { label: "Longest Streak", user: "Dane P.", value: 12 },
  { label: "Rank Change", user: "Nolan F.", value: 7 },
];

const LeaderboardStats = () => (
  <div className="flex justify-center gap-6 mb-8">
    {stats.map((stat, idx) => (
      <div key={idx} className="bg-white rounded-xl shadow p-4 flex flex-col items-center min-w-[160px]">
        <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
        <div className="font-bold text-lg mb-1">{stat.user}</div>
        <div className="text-2xl font-extrabold text-blue-600">{stat.value}</div>
      </div>
    ))}
  </div>
);

export default LeaderboardStats; 