import React, { useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => { 
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Check if the search query contains store-related keywords
      const storeKeywords = ['store', 'shop', 'business', 'vendor', 'seller'];
      const isStoreSearch = storeKeywords.some(keyword => 
        searchQuery.toLowerCase().includes(keyword)
      );
      
      // Navigate to explore with appropriate tab
      const tab = isStoreSearch ? 'stores' : 'products';
      navigate(`/explore?search=${encodeURIComponent(searchQuery.trim())}&tab=${tab}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto rounded-xl shadow-sm border p-1 px-6">
      <div className="flex items-center"> 
        
        <div className="flex-1"> 
          <div className="flex gap-2">
            <Search size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search products..."
              className="w-full border-none bg-transparent text-gray-900 text-sm focus:outline-none"
            /> 
          </div>
        </div>
        
        <button 
          type="submit"
          className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;