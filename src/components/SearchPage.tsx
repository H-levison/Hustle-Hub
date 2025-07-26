import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchPage: React.FC = () => {
  const query = useQuery();
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const searchTerm = query.get('q') || '';

  useEffect(() => {
    if (!searchTerm) return;
    setLoading(true);
    fetch(`${API_BASE}/products?name=${encodeURIComponent(searchTerm)}`)
      .then(res => res.json())
      .then(data => setResults(Array.isArray(data) ? data : []))
      .finally(() => setLoading(false));
  }, [searchTerm]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Search Results for "{searchTerm}"</h2>
      {loading && <div>Loading...</div>}
      <div>
        {results.map(product => (
          <Link key={product.id} to={`/product/${product.id}`} className="block mb-2 p-2 border rounded hover:bg-gray-50 transition-colors">
            <div className="font-bold">{product.name}</div>
            <div className="text-gray-600">{product.description}</div>
            <div className="text-blue-600 font-semibold">{typeof product.price === 'number' ? `RWF ${product.price.toLocaleString()}` : ''}</div>
          </Link>
        ))}
        {results.length === 0 && !loading && <div>No results found.</div>}
      </div>
    </div>
  );
};

export default SearchPage; 