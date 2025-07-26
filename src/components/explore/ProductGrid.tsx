import React, { useState, useEffect } from 'react';
import { Heart, Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

type Product = {
  id: number;
  images: string[];
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  description: string;
  details: string;
};

type Store = {
  id: string;
  name: string;
  description: string;
  logo: string;
  whatsapp: string;
};

interface ProductGridProps {
  products: Product[];
  onFavoriteToggle: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onFavoriteToggle }) => {
  const [sortOption, setSortOption] = useState('featured');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('products');
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetch stores from backend
  useEffect(() => {
    const fetchStores = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/businesses`);
        if (response.ok) {
          const data = await response.json();
          setStores(data);
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Top Rated' },
  ];

  const getSortedProducts = () => {
    switch (sortOption) {
      case 'price-low':
        return [...products].sort((a, b) => a.price - b.price);
      case 'price-high':
        return [...products].sort((a, b) => b.price - a.price);
      case 'rating':
        return [...products].sort((a, b) => b.rating - a.rating);
      default:
        return products;
    }
  };

  const sortedProducts = getSortedProducts();

  return (
    <div className="w-full">
      <div className="flex border-b mb-6">
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'products' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('products')}
        >
          Products
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${activeTab === 'stores' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          onClick={() => setActiveTab('stores')}
        >
          Stores
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-500">
            Showing 1-{activeTab === 'products' ? products.length : stores.length} of {activeTab === 'products' ? products.length : stores.length} {activeTab}
          </p>
        </div>
        {activeTab === 'products' && (
          <div className="relative">
            <button 
              className="flex items-center gap-2 text-sm border rounded-md px-3 py-1.5"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              Sort by: {sortOptions.find(option => option.value === sortOption)?.label}
              {showSortOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
            {showSortOptions && (
              <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md z-10">
                {sortOptions.map(option => (
                  <button
                    key={option.value}
                    className={`block w-full text-left px-4 py-2 text-sm ${sortOption === option.value ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                    onClick={() => {
                      setSortOption(option.value);
                      setShowSortOptions(false);
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {activeTab === 'products' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard 
                product={product} 
                onFavoriteToggle={onFavoriteToggle} 
              />
            </Link>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading ? (
            // Loading skeleton for stores
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="relative h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg bg-gray-200 animate-pulse" />
            ))
          ) : stores.length > 0 ? (
            stores.map(store => (
              <Link key={store.id} to={`/shop/${store.id}`}>
                <StoreCard store={store} />
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 py-8">No stores available</p>
          )}
        </div>
      )}
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onFavoriteToggle: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFavoriteToggle(product.id);
  };

  return (
    <div className="bg-transparent rounded-xl overflow-hidden group cursor-pointer transition-all">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Product+Image';
            }}
          />
        </div>
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart 
            size={18} 
            className={product.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"} 
          />
        </button>
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${index === currentImageIndex ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="pt-3 px-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 text-base leading-tight mb-0.5">{product.title}</h3>
          <div className="flex items-center text-sm">
            <Star size={14} className="fill-black text-black mr-0.5" />
            <span>{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-1">{product.location}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-900">RWF{product.price.toFixed(2)}</p>
          <button className="text-xs bg-indigo-50 text-indigo-600 px-3 py-2 rounded-full hover:bg-indigo-100 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

interface StoreCardProps {
  store: Store;
}

const StoreCard: React.FC<StoreCardProps> = ({ store }) => {
  return (
    <div className="relative h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg group cursor-pointer">
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
    </div>
  );
};

export default ProductGrid;