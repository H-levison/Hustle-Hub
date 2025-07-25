import React from 'react';
import ProductCards from '../store/ProductCards';
import FeaturedStores from '../store/FeaturedStores';

interface SearchResultsSectionProps {
  activeFilter: string | null;
}

const SearchResultsSection: React.FC<SearchResultsSectionProps> = ({ activeFilter }) => {
  // In a real application, you would filter the products and stores based on the activeFilter
  // For now, we'll just display all products and stores
  
  return (
    <div className="space-y-12">
      {/* This component would conditionally render different content based on the activeFilter */}
      {/* For now, we'll show both stores and products */}
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Stores {activeFilter && activeFilter !== 'All' ? `in ${activeFilter}` : ''}</h2>
        <FeaturedStores />
      </section>
      
      <section>
        <h2 className="text-2xl font-bold mb-6">Products {activeFilter && activeFilter !== 'All' ? `in ${activeFilter}` : ''}</h2>
        <ProductCards />
      </section>
    </div>
  );
};

export default SearchResultsSection;