import React, { useState } from 'react';
import { Heart, Star, ChevronDown, ChevronUp } from 'lucide-react';

// Import product type from ProductCards or define it here
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

interface ProductGridProps {
  products: Product[];
  onFavoriteToggle: (productId: number) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onFavoriteToggle }) => {
  const [sortOption, setSortOption] = useState('featured');
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [activeTab, setActiveTab] = useState('products'); // 'products' or 'stores'

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
      {/* Tabs for Products and Stores */}
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
          <p className="text-sm text-gray-500">Showing 1-{products.length} of {products.length} {activeTab === 'products' ? 'products' : 'stores'}</p>
        </div>
        <div className="relative">
          <button 
            className="flex items-center gap-2 text-sm border rounded-md px-3 py-1.5"
            onClick={() => setShowSortOptions(!showSortOptions)}
          >
            Sort by: {sortOptions.find(option => option.value === sortOption)?.label}
            {showSortOptions ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {showSortOptions && (
            <div className="absolute right-0 mt-1 w-48 bg-white border rounded-md  z-10">
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
      </div>

      {activeTab === 'products' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onFavoriteToggle={onFavoriteToggle} 
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <p className="col-span-full text-center text-gray-500 py-8">Store listings coming soon</p>
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

  const handleNextImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const handlePrevImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <div className="bg-transparent rounded-xl overflow-hidden group cursor-pointer  transition-all">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
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
          <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <button className="text-xs bg-indigo-50 text-indigo-600 px-3 py-2 rounded-full hover:bg-indigo-100 transition-colors">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;