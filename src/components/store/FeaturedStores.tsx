import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Store {
  id: string;
  name: string;
  description: string;
  logo: string;
  category_id: string;
  whatsapp: string;
}

const FeaturedStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch('http://localhost:5000/businesses');
        if (response.ok) {
          const data = await response.json();
          // Take the first 5 stores (you can implement popularity logic later)
          setStores(data.slice(0, 5));
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
      <section className="px-2 sm:px-4 md:mx-24 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Stores</h2>
        <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="relative h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg bg-gray-200 animate-pulse min-w-[250px] max-w-[320px] sm:min-w-0 sm:max-w-none snap-start" />
          ))}
        </div>
      </section>
    );
  }

  if (stores.length === 0) {
    return (
      <section className="px-2 sm:px-4 md:mx-24 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Stores</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No stores available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-2 sm:px-4 md:mx-24 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Stores</h2>
      <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
        {stores.map((store) => (
          <Link
            key={store.id}
            to={`/shop/${store.id}`}
            className="relative h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg group cursor-pointer block min-w-[250px] max-w-[320px] sm:min-w-0 sm:max-w-none snap-start"
          >
            <img
              src={store.logo || "https://via.placeholder.com/400x300?text=Store+Logo"}
              alt={store.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Store+Logo';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
            
            <button className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 rounded-full p-1.5 sm:p-2 hover:bg-white transition-colors">
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            
            <div className="absolute bottom-12 sm:bottom-14 left-2 sm:left-3 text-white">
              <h3 className="font-semibold text-base sm:text-lg leading-tight">{store.name}</h3>
              <p className="text-xs sm:text-sm opacity-90 line-clamp-2">{store.description}</p>
            </div>
            
            <button className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-white text-black rounded-full py-1.5 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors">
              Browse shop
            </button>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedStores;