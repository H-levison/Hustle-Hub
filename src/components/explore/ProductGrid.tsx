import React, { useState } from 'react';
import { Star, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../../CartContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

type Product = {
  id: string;
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
  onFavoriteToggle: (productId: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onFavoriteToggle }) => {
  const [sortOption, setSortOption] = useState('featured');
  const [showSortOptions, setShowSortOptions] = useState(false);

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
      <div className="flex justify-between items-center mb-6">
        <div>
          <p className="text-sm text-gray-500">
            Showing 1-{products.length} of {products.length} products
          </p>
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
      </div>

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
    </div>
  );
};

interface ProductCardProps {
  product: Product;
  onFavoriteToggle: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart, cart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    // Use the location as business name and create a unique business ID
    const businessId = 'explore_' + product.id; // Create a unique identifier
    addToCart({
      id: product.id.toString(),
      title: product.title,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      businessId: businessId,
      vendorName: product.location, // Use the location as vendor name
      vendorWhatsapp: '+250788123456', // Default WhatsApp number
    });
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
        {/* Heart icon removed */}
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
            <span>{product.reviews > 0 ? product.rating : 0}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-1">{product.location}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-900">RWF{product.price.toFixed(2)}</p>
          <button 
            onClick={handleAddToCart}
            className="text-xs bg-indigo-50 text-indigo-600 px-3 py-2 rounded-full hover:bg-indigo-100 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;