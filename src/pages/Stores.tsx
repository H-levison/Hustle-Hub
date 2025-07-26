import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const placeholderImage = 'https://via.placeholder.com/400x300?text=Store+Logo';

const Stores = () => {
  const [stores, setStores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/businesses`);
        if (response.ok) {
          const data = await response.json();
          setStores(Array.isArray(data) ? data : []);
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  if (loading) {
    return (
      <>
        <Navigation />
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-6">All Stores</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
                  <div className="w-full h-32 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded mb-1 animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse w-full" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6">All Stores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {stores.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 py-8">No stores found.</p>
            ) : (
              stores.map(store => (
                <Link key={store.id} to={`/shop/${store.id}`} className="bg-white rounded-xl shadow p-4 flex flex-col items-start hover:shadow-lg transition-shadow">
                  <img
                    src={store.logo || placeholderImage}
                    alt={store.name}
                    className="w-full h-32 object-cover rounded mb-2"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = placeholderImage;
                    }}
                  />
                  <h3 className="font-semibold text-lg mb-1">{store.name}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">{store.description}</p>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Stores; 