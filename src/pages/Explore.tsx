import React from "react";
import { Navigation } from "../components/Navigation";
import SearchBar from "../components/SearchBar";
// import ProductCards from "../components/ProductCards";
// import FeaturedStores from "../components/FeaturedStores";

const Explore = () => (
  <>
    <Navigation />
    <SearchBar />
    <main className="p-8"> 
    {/* <ProductCards /> 
    <FeaturedStores /> */}
    </main>
  </>
);

export default Explore;
