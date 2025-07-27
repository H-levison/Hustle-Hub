import React, { useState } from "react";
import { Search } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const SearchBar = () => { 
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE}/products`);
        if (response.ok) {
          const data = await response.json();
          // Filter products by name (case-insensitive)
          const filtered = data.filter((product: any) =>
            product.name.toLowerCase().includes(searchQuery.trim().toLowerCase())
          );
          setResults(filtered);
        } else {
          setError('Failed to fetch products');
          setResults([]);
        }
      } catch (err) {
        setError('Failed to fetch products');
        setResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setResults([]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(e as any);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="rounded-xl shadow-sm border p-1 px-6">
        <div className="flex items-center"> 
          <div className="flex-1"> 
            <div className="flex gap-2">
              <Search size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search products by name..."
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
      {/* Results */}
      {loading && <div className="text-center py-4 text-gray-500">Searching...</div>}
      {error && <div className="text-center py-4 text-red-500">{error}</div>}
      {results.length > 0 && (
        <div className="bg-white rounded-xl shadow mt-2 p-4">
          <h3 className="font-semibold mb-2">Results:</h3>
          <ul className="divide-y divide-gray-100">
            {results.map(product => (
              <li key={product.id} className="flex items-center gap-4 py-2">
                <img
                  src={product.image || 'https://via.placeholder.com/48x48?text=Product'}
                  alt={product.name}
                  className="w-12 h-12 rounded object-cover border"
                />
                <div className="flex-1">
                  <div className="font-semibold">{product.name}</div>
                  <div className="text-sm text-gray-500">RWF {product.price?.toLocaleString()}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      {results.length === 0 && searchQuery.trim() && !loading && !error && (
        <div className="text-center py-4 text-gray-500">No products found.</div>
      )}
    </div>
  );
};

export default SearchBar;