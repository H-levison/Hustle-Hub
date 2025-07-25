import React, { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => { 
  const [category, setCategory] = useState("");
  const [store, setStore] = useState("");
  const [product, setProduct] = useState("");

  return (
    <div className="w-full  max-w-2xl mx-auto  rounded-xl shadow-sm border p-1 px-6 ">
      <div className="flex  items-center gap-6"> 
        
        <div className="flex-1  "> 
          <div className="flex gap-2">
          <Search size={20} />
          <input
            type="text"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            placeholder="Search  product"
            className="w-full border-none bg-transparent text-gray-900 text-sm focus:outline-none"
          /> 
          </div>
        </div>
        
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-colors font-medium">
          {/* <Search size={20} /> */}
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;