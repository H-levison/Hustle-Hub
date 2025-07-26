import React, { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import ProductFilterSidebar from "../components/explore/ProductFilterSidebar";
import ProductGrid from "../components/explore/ProductGrid";
import { SlidersHorizontal, Search } from "lucide-react";

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
  isFavorite?: boolean;
}

const Explore = () => {
  const [productList, setProductList] = useState<Product[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/products`);
        if (response.ok) {
          const data = await response.json();
          
          // Get category names and business names for products
          const productsWithDetails = await Promise.all(
            data.map(async (product: Product) => {
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
          
          setProductList(productsWithDetails);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFavoriteToggle = (productId: number) => {
    setProductList(prev => 
      prev.map(product => 
        product.id === productId.toString()
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Implement filtering logic here
  };

  // Transform products to match ProductGrid expected format
  const transformedProducts = productList.map(product => ({
    id: parseInt(product.id),
    images: [product.image || "https://via.placeholder.com/400x400?text=Product+Image"],
    title: product.name,
    location: product.business || 'Unknown Store',
    price: product.price,
    rating: 4.5, // Default rating
    reviews: Math.floor(Math.random() * 500) + 50, // Random reviews for demo
    isFavorite: false,
    description: product.description,
    details: product.description
  }));

  if (loading) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-lg">Loading products...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      
      {/* Search Bar */}
      
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Hidden on mobile, toggleable */}
            <div className="hidden md:block md:w-1/4 lg:w-1/5 flex-shrink-0">
              <ProductFilterSidebar onFilterChange={handleFilterChange} />
            </div>
            
            {/* Mobile filter toggle button */}
            <div className="md:hidden mb-4">
              <button 
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => console.log('Toggle mobile filters')}
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              <ProductGrid 
                products={transformedProducts} 
                onFavoriteToggle={handleFavoriteToggle} 
              />
            </div>
          </div>
        </div>
      </section>
       
    </>
  );
};

export default Explore;
