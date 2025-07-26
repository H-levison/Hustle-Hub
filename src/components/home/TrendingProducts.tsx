import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  business_id: string;
  vendor_id: string;
  stock: number;
  colors: string[];
  sizes: string[];
  category?: string;
  business?: string;
}

const TrendingProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/products`);
        if (response.ok) {
          const data = await response.json();
          
          // Get category names and business names for products
          const productsWithDetails = await Promise.all(
            data.slice(0, 4).map(async (product: Product) => {
              try {
                // Get category name
                const categoryResponse = await fetch(`${API_BASE}/categories/${product.category_id}`);
                let categoryName = 'Uncategorized';
                if (categoryResponse.ok) {
                  const category = await categoryResponse.json();
                  categoryName = category.name;
                }

                // Get business name
                const businessResponse = await fetch(`${API_BASE}/businesses/${product.business_id}`);
                let businessName = 'Unknown Store';
                if (businessResponse.ok) {
                  const business = await businessResponse.json();
                  businessName = business.name;
                }

                return {
                  ...product,
                  category: categoryName,
                  business: businessName
                };
              } catch (err) {
                return {
                  ...product,
                  category: 'Uncategorized',
                  business: 'Unknown Store'
                };
              }
            })
          );
          
          setProducts(productsWithDetails);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Trending Products</h2>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="min-w-[180px] bg-white rounded-xl shadow p-2 flex flex-col">
              <div className="w-full h-28 bg-gray-200 rounded-t-xl mb-2 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded mb-1 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded mb-1 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded mb-1 animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-4">Trending Products</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No trending products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-xl font-bold mb-4">Trending Products</h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="min-w-[180px] bg-white rounded-xl shadow p-2 flex flex-col hover:shadow-lg transition-shadow">
            <img 
              src={product.image || "https://via.placeholder.com/400x300?text=Product+Image"} 
              alt={product.name} 
              className="w-full h-28 object-cover rounded-t-xl mb-2"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=Product+Image';
              }}
            />
            <div className="font-semibold text-sm mb-1 line-clamp-1">{product.name}</div>
            <div className="text-xs text-gray-500 mb-1">{product.category}, {product.business}</div>
            <div className="flex items-center gap-1 text-xs text-yellow-500 mb-1">
              <span>★</span> 4.5 ({(Math.random() * 200 + 50).toFixed(0)})
            </div>
            <div className="text-base font-bold text-blue-600">RWF{product.price.toLocaleString()}</div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingProducts; 