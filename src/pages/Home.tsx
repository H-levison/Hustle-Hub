import React from "react";
import { Navigation } from "../components/Navigation";
import { NotificationStrip } from "../components/NotificationStrip";
import SearchBar from "../components/SearchBar";
import HeroGrid from "../components/HeroGrid";
import CategoryIcons from "../components/CategoryIcons";
import CategoryChips from "../components/CategoryChips";
import ProductCards from "../components/ProductCards";
import FeaturedStores from "../components/FeaturedStores";
import InfoSection from "../components/InfoSection";
import TrendingProducts from "../components/TrendingProducts";
import VendorBanner from "../components/VendorBanner";
import SatisfactionSection from "../components/SatisfactionSection";
import HelpSection from "../components/HelpSection";
import Footer from "../components/Footer";

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
      {/* <TrendingProducts /> */}
      <ProductCards />
      <FeaturedStores />
      <InfoSection />
      <VendorBanner />
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-7xl mx-auto px-4">
        <div className="flex-1">
          <SatisfactionSection />
        </div>
        <div className="flex-1">
          <HelpSection />
        </div>
      </div>
      <Footer />
    </div>
  </>
);

export default Home;
