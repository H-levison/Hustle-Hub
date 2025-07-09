import React from "react";
import { Navigation } from "../components/Navigation";
import { NotificationStrip } from "../components/NotificationStrip";
import SearchBar from "../components/SearchBar";
import HeroGrid from "../components/HeroGrid";
import CategoryIcons from "../components/CategoryIcons";
import CategoryChips from "../components/CategoryChips";
import LocationCards from "../components/LocationCards";
import ProgressBar from "../components/ProgressBar";

const Home = () => (
  <>
  <div className="bg-white">
    {/* Top Notification Bar */}
    <NotificationStrip />
    {/* Main Navigation Bar */}
    <Navigation />
    <SearchBar />
    <HeroGrid />
    <CategoryIcons />
    <CategoryChips />
    <LocationCards />
    <ProgressBar />
  </div>
    
  </>
);

export default Home;
