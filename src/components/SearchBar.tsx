import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => { 
  const [category, setCategory] = useState("");
  const [store, setStore] = useState("");
  const [product, setProduct] = useState("");

  return (
    <div className="w-full max-w-4xl mx-auto  rounded-full shadow-sm border p-2 px-6 mt-8">
      <div className="flex  items-center gap-6">
        <div className="flex-1 ">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Search by category"
            className="w-full border-none bg-transparent text-gray-900 text-sm focus:outline-none"
          />
        </div>
        
        <div className="w-px h-12 bg-gray-200"></div>
        
        <div className="flex-1 ">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Store</label>
          <input
            type="text"
            value={store}
            onChange={(e) => setStore(e.target.value)}
            placeholder="Search by store"
            className="w-full border-none bg-transparent text-gray-900 text-sm focus:outline-none"
          />
        </div>
        
        <div className="w-px h-12 bg-gray-200"></div>
        
        <div className="flex-1 ">
          <label className="block text-sm font-semibold text-gray-900 mb-2">Product</label>
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Search by product"
            className="w-full border-none bg-transparent text-gray-900 text-sm focus:outline-none"
          />
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors font-medium">
          <Search size={20} />
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;