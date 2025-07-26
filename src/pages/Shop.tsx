import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Star,
  Heart,
  Mail,
} from 'lucide-react';
import { Navigation } from '../components/Navigation';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

// Product Card Component with new design
const ProductCard = ({ product, onFavoriteToggle, onAddToCart }) => {
  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    onFavoriteToggle(product.id);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  // Generate a random rating between 4.0 and 5.0 for demonstration
  const rating = (4.0 + Math.random()).toFixed(1);

  return (
    <div className="bg-transparent rounded-xl overflow-hidden group cursor-pointer transition-all">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.image || "https://via.placeholder.com/400x400?text=Product+Image"}
            alt={product.name}
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
      </div>
      <div className="pt-3 px-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 text-base leading-tight mb-0.5">{product.name}</h3>
          <div className="flex items-center text-sm">
            <Star size={14} className="fill-black text-black mr-0.5" />
            <span>{rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-900">RWF {product.price.toLocaleString()}</p>
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

const Shop = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [storeData, setStoreData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch store data
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/businesses/${id}`);
        if (response.ok) {
          const store = await response.json();
          setStoreData({
            id: store.id,
            name: store.name,
            description: store.description,
            logo: store.logo || "https://via.placeholder.com/150x150?text=Store+Logo",
            banner: store.logo || "https://via.placeholder.com/400x200?text=Store+Banner",
            followers: 0, // You can add followers logic later
            products: 0, // Will be updated when products are fetched
            subtitle: "Open for business", // You can add business hours later
            whatsapp: store.whatsapp
          });
        } else {
          setError('Store not found');
        }
      } catch (err) {
        console.error('Error fetching store:', err);
        setError('Failed to load store');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchStoreData();
    }
  }, [id]);

  // Fetch products for this store
  useEffect(() => {
    const fetchProducts = async () => {
      if (!storeData) return;
      
      try {
        const response = await fetch(`${API_BASE}/products?store=${encodeURIComponent(storeData.name)}`);
        if (response.ok) {
          const productsData = await response.json();
          
          // Get category names for products
          const productsWithCategories = await Promise.all(
            productsData.map(async (product) => {
              try {
                const categoryResponse = await fetch(`${API_BASE}/categories/${product.category_id}`);
                if (categoryResponse.ok) {
                  const category = await categoryResponse.json();
                  return {
                    ...product,
                    category: category.name,
                    isFavorite: false // Default state
                  };
                }
                return {
                  ...product,
                  category: 'Uncategorized',
                  isFavorite: false
                };
              } catch (err) {
                return {
                  ...product,
                  category: 'Uncategorized',
                  isFavorite: false
                };
              }
            })
          );
          
          setProducts(productsWithCategories);
          
          // Update categories
          const uniqueCategories = ['All', ...new Set(productsWithCategories.map(product => product.category))];
          setCategories(uniqueCategories);
          
          // Update product count
          setStoreData(prev => ({
            ...prev,
            products: productsWithCategories.length
          }));
        }
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, [storeData]);

  const handleFavoriteToggle = (productId) => {
    setProducts(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleAddToCart = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      console.log(`Added ${product.name} to cart!`);
      // You can add your cart logic here
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading store...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">{error}</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // If store data is still loading, show a loading state
  if (!storeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg">Loading store...</p>
      </div>
    );
  }

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-1/4 w-full bg-white border border-gray-100 rounded-xl p-6 text-center sticky top-8 h-fit">
          <img
            src={storeData.logo}
            alt="Store Logo"
            className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150x150?text=Store+Logo';
            }}
          />
          <h2 className="text-xl font-semibold text-gray-900">{storeData.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{storeData.description}</p>
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-semibold">{storeData.products}</span> Products
          </div>
          <p className="text-xs text-gray-500 mt-2">{storeData.subtitle}</p>

          <nav className="mt-6 border-t pt-4">
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-500 text-white font-medium">
              <Mail className="w-4 h-4" /> Shop
            </button>
          </nav>

          <div className="mt-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Categories</h3>
            <div className="flex flex-col gap-2 mt-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-left px-2 py-1 rounded text-sm ${selectedCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full ">

          {/* Filters and Sorting */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="text-gray-600 text-sm">{filteredProducts.length} items</div>
            <div className="flex gap-2">
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Show: 50</option>
                <option>Show: 25</option>
              </select>
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Sort by: Featured</option>
              </select>
            </div>
          </div>

          {/* Product Grid with new design */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onFavoriteToggle={handleFavoriteToggle}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 py-8">No products found.</div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Shop;