import React from "react";
import { Navigation } from "../components/Navigation";
import { NotificationStrip } from "../components/home/NotificationStrip";
import SearchBar from "../components/SearchBar";
import HeroGrid from "../components/home/HeroGrid";
import HeroSliderMobile from "../components/home/HeroSliderMobile";
import CategoryIcons from "../components/home/CategoryIcons";
import CategoryChips from "../components/home/CategoryChips";
import ProductCards from "../components/store/ProductCards";
import FeaturedStores from "../components/store/FeaturedStores";
import InfoSection from "../components/home/InfoSection";
import TrendingProducts from "../components/home/TrendingProducts";
import VendorBanner from "../components/home/VendorBanner";
import SatisfactionSection from "../components/home/SatisfactionSection";
import HelpSection from "../components/home/HelpSection";
import Footer from "../components/home/Footer";

// Declaring the home page
const Home = () => (
  <>
      {/* <NotificationStrip /> */}
      {/* Main Navigation Bar */}
      <Navigation />
      <CategoryIcons />
      {/* <SearchBar /> */}
      <HeroSliderMobile />
      <HeroGrid />
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
