import React from "react";
import { Navigation } from "../components/Navigation";
import { NotificationStrip } from "../components/NotificationStrip";
import SearchBar from "../components/SearchBar";
import HeroGrid from "../components/HeroGrid";
import HeroSliderMobile from "../components/HeroSliderMobile";
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

// Declaring the home page
const Home = () => (
  <>
      {/* <NotificationStrip /> */}
      {/* Main Navigation Bar */}
      <Navigation />
      {/* <SearchBar /> */}
      <HeroSliderMobile />
      <HeroGrid />
      <CategoryIcons />
      {/* <TrendingProducts /> */}
      <ProductCards />
      <FeaturedStores />
      {/* <InfoSection /> */}
      <VendorBanner />
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8 w-full max-w-8xl mx-auto px-2 sm:px-4 md:px-[80px] mt-4 sm:mt-[20px]">
        <div className="flex-1">
          <SatisfactionSection />
        </div>
        <div className="flex-1">
          <HelpSection />
        </div>
      </div>
      <Footer />
  </>
);

export default Home;
