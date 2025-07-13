import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Star, Heart, Share2, MapPin, Clock, Phone, Mail, Filter, Grid, List } from 'lucide-react';
import { Navigation } from '../components/Navigation';

const Shop = () => {
  const { id } = useParams();
  const location = useLocation();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Mock store data - in real app this would come from API
  const store = {
    id: id || '1',
    name: "Alu Luxury Cars",
    description: "Premium luxury car dealership offering the finest selection of high-end vehicles. We specialize in exotic cars, sports cars, and luxury sedans.",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    reviews: 156,
    location: "Dakar, Senegal",
    phone: "+221 77 123 4567",
    email: "info@aluluxurycars.com",
    hours: "Mon-Fri: 9AM-6PM, Sat: 10AM-4PM",
    category: "Automotive",
    followers: 1247,
    products: 89,
    isFollowing: false
  };

  const categories = ['All', 'Sports Cars', 'Luxury Sedans', 'SUVs', 'Electric', 'Classic'];
  
  const products = [
    {
      id: 1,
      name: "Mercedes-Benz S-Class 2024",
      price: 125000000,
      originalPrice: 140000000,
      image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 23,
      category: "Luxury Sedans",
      isFavorite: false
    },
    {
      id: 2,
      name: "Porsche 911 GT3",
      price: 180000000,
      originalPrice: 200000000,
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 45,
      category: "Sports Cars",
      isFavorite: true
    },
    {
      id: 3,
      name: "BMW X7 M60i",
      price: 95000000,
      originalPrice: 105000000,
      image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&h=300&fit=crop",
      rating: 4.7,
      reviews: 18,
      category: "SUVs",
      isFavorite: false
    },
    {
      id: 4,
      name: "Tesla Model S Plaid",
      price: 110000000,
      originalPrice: 120000000,
      image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 67,
      category: "Electric",
      isFavorite: false
    },
    {
      id: 5,
      name: "Ferrari F8 Tributo",
      price: 250000000,
      originalPrice: 280000000,
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=400&h=300&fit=crop",
      rating: 4.8,
      reviews: 34,
      category: "Sports Cars",
      isFavorite: true
    },
    {
      id: 6,
      name: "Rolls-Royce Phantom",
      price: 350000000,
      originalPrice: 380000000,
      image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?w=400&h=300&fit=crop",
      rating: 4.9,
      reviews: 12,
      category: "Luxury Sedans",
      isFavorite: false
    }
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Store Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Store Image */}
            <div className="lg:w-1/3">
              <div className="relative">
                <img
                  src={store.image}
                  alt={store.name}
                  className="w-full h-64 lg:h-48 object-cover rounded-lg"
                />
                <div className="absolute top-4 right-4">
                  <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors">
                    <Share2 className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>

            {/* Store Info */}
            <div className="lg:w-2/3">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(store.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-sm font-medium text-gray-700">{store.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({store.reviews} reviews)</span>
                    <span className="text-sm text-gray-500">• {store.category}</span>
                  </div>
                </div>
                <button className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  store.isFollowing 
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}>
                  {store.isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              <p className="text-gray-600 mb-4 leading-relaxed">{store.description}</p>

              {/* Store Stats */}
              <div className="flex items-center gap-6 mb-4 text-sm">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{store.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{store.hours}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-600">{store.phone}</span>
                </div>
              </div>

              {/* Store Stats */}
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <span className="font-semibold text-gray-900">{store.followers}</span>
                  <span className="text-gray-500 ml-1">followers</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-900">{store.products}</span>
                  <span className="text-gray-500 ml-1">products</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and View Options */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${viewMode === 'list' ? 'w-48 h-32' : 'aspect-square'}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <button className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors">
                  <Heart className={`w-4 h-4 ${product.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
                {product.originalPrice > product.price && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold text-gray-900">
                    Rwf{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through">
                      Rwf{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <button className="w-full bg-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Products Message */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your filters or browse all categories.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop; 