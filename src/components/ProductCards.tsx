import React, { useState } from "react";
import { Heart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop"
    ],
    title: "Modern Apartment in Downtown",
    location: "New York, NY",
    price: 120,
    rating: 4.8,
    reviews: 234,
    isFavorite: false
  },
  {
    id: 2,
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4a0?w=400&h=300&fit=crop"
    ],
    title: "Cozy Beach House",
    location: "Miami, FL",
    price: 85,
    rating: 4.9,
    reviews: 156,
    isFavorite: true
  },
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1549517045-bc93de075e53?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"
    ],
    title: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: 200,
    rating: 4.7,
    reviews: 89,
    isFavorite: false
  },
  {
    id: 4,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    ],
    title: "Luxury Villa with Pool",
    location: "Los Angeles, CA",
    price: 350,
    rating: 4.6,
    reviews: 312,
    isFavorite: false
  },
  {
    id: 5,
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=400&h=300&fit=crop"
    ],
    title: "Historic Townhouse",
    location: "Boston, MA",
    price: 95,
    rating: 4.5,
    reviews: 67,
    isFavorite: true
  },
  {
    id: 6,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&h=300&fit=crop"
    ],
    title: "Lakefront Lodge",
    location: "Seattle, WA",
    price: 140,
    rating: 4.8,
    reviews: 198,
    isFavorite: false
  }
];

const ProductCard = ({ product, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle(product.id);
  };

  return (
    <div className="bg-white rounded-lg  hover:shadow-md transition-shadow duration-200">
      {/* Image Section */}
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-t-lg bg-gray-100">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart 
            size={16} 
            className={product.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"} 
          />
        </button>

        {/* Navigation Arrows */}
        {product.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-all opacity-0 group-hover:opacity-100"
            >
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 6l6 6-6 6"/>
              </svg>
            </button>
          </>
        )}

        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="font-semibold text-gray-900 truncate pr-2">{product.title}</h3>
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star size={14} className="fill-black text-black" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-600 text-sm mb-2">{product.location}</p>
        
        <div className="flex items-baseline gap-1">
          <span className="font-semibold text-gray-900">${product.price}</span>
          <span className="text-gray-600 text-sm">night</span>
        </div>
      </div>
    </div>
  );
};

const ProductCards = () => {
  const [productList, setProductList] = useState(products);

  const handleFavoriteToggle = (productId) => {
    setProductList(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4"> 
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productList.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCards;