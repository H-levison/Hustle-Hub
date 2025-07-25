import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
const placeholderImage = 'https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=400&q=80';

const Stores = () => {
  const [stores, setStores] = useState<any[]>([]);

  useEffect(() => {
    fetch(`${API_BASE}/businesses`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setStores(Array.isArray(data) ? data : []));
  }, []);

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
                <div key={store.id} className="bg-white rounded-xl shadow p-4 flex flex-col items-start">
                  <img
                    src={store.image || placeholderImage}
                    alt={store.name}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <h3 className="font-semibold text-lg mb-1">{store.name}</h3>
                  <p className="text-gray-600 mb-2">{store.description}</p>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Stores; 