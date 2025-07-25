import React from "react";
import { Navigation } from "../components/Navigation";
import ShopSelector from "../components/leaderboard/ShopSelector";
import LeaderboardPodium from "../components/leaderboard/LeaderboardPodium";
import LeaderboardStats from "../components/leaderboard/LeaderboardStats";
import LeaderboardTable from "../components/leaderboard/LeaderboardTable";

const Leaderboard = () => (
  <>
    <Navigation />
    <main className="p-8 max-w-7xl mx-auto">
      <div className="flex flex-col items-center mb-8">
        <ShopSelector />
        {/* <h1 className="text-4xl font-bold mt-4 mb-2 text-center opacity-20 absolute z-0">Champions</h1> */}
        <LeaderboardPodium />
      </div>
      <LeaderboardStats />
      <LeaderboardTable />
    </main>
  </>
);

export default Leaderboard;
