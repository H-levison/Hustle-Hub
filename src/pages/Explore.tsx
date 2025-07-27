import React, { useState, useEffect } from "react";
import { Navigation } from "../components/Navigation";
// import SearchBar from "../components/SearchBar";
import ProductFilterSidebar from "../components/explore/ProductFilterSidebar";
import ProductGrid from "../components/explore/ProductGrid";
import { SlidersHorizontal, Search } from "lucide-react";
import { useSearchParams } from "react-router-dom";
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
  isFavorite?: boolean;
}

interface Store {
  id: string;
  name: string;
  description: string;
  logo: string;
  whatsapp: string;
  category_id: string;
  category?: string;
}

const Explore = () => {
  const [searchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const searchFilter = searchParams.get('search');
  const tabFilter = searchParams.get('tab');
  
  const [activeTab, setActiveTab] = useState<'products' | 'stores'>(
    (tabFilter as 'products' | 'stores') || 'products'
  );
  const [productList, setProductList] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [activeFilter, setActiveFilter] = useState<string | null>(categoryFilter);
  const [searchQuery, setSearchQuery] = useState(searchFilter || "");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || '');
  const [priceRange, setPriceRange] = useState<{min: number, max: number}>({min: 0, max: 1000000});
  const [categories, setCategories] = useState<Array<{id: string, name: string}>>([]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
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
      }
    };

    fetchProducts();
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE}/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(`${API_BASE}/businesses`);
        if (response.ok) {
          const data = await response.json();
          
          // Get category names for stores
          const storesWithDetails = await Promise.all(
            data.map(async (store: Store) => {
              try {
                // Get category name
                const categoryResponse = await fetch(`${API_BASE}/categories/${store.category_id}`);
                let categoryName = 'Uncategorized';
                if (categoryResponse.ok) {
                  const category = await categoryResponse.json();
                  categoryName = category.name;
                }

                return {
                  ...store,
                  category: categoryName
                };
              } catch (err) {
                return {
                  ...store,
                  category: 'Uncategorized'
                };
              }
            })
          );
          
          setStores(storesWithDetails);
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  // Filter products based on category, search, and price range
  useEffect(() => {
    let filtered = productList;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(product => 
        product.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(product => 
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.business?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by price range
    filtered = filtered.filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    setFilteredProducts(filtered);
    setActiveFilter(selectedCategory || searchQuery || null);
  }, [productList, selectedCategory, searchQuery, priceRange]);

  // Filter stores based on category and search
  useEffect(() => {
    let filtered = stores;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(store => 
        store.category?.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(store => 
        store.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        store.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredStores(filtered);
  }, [stores, selectedCategory, searchQuery]);

  const handleFavoriteToggle = (productId: string) => {
    setProductList(prev => 
      prev.map(product => 
        product.id === productId
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Filtering is now handled by the useEffect hooks
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handlePriceRangeChange = (range: {min: number, max: number}) => {
    setPriceRange(range);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  // Transform products to match ProductGrid expected format
  const transformedProducts = filteredProducts.map(product => ({
    id: product.id, // Keep as string, don't convert to integer
    images: [product.image || "https://via.placeholder.com/400x400?text=Product+Image"],
    title: product.name,
    location: product.business || 'Unknown Store',
    price: product.price,
    rating: 0, // Set to 0 by default - will be updated when reviews are implemented
    reviews: 0, // Set to 0 by default - will be updated when reviews are implemented
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
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-hustlehub-blue mx-auto"></div>
            <p className="mt-4 text-lg">Loading...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      {/* SearchBar removed from Explore page, use sidebar filter instead */}
      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* Category Filter Header */}
          {categoryFilter && (
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {categoryFilter} {activeTab === 'products' ? 'Products' : 'Stores'}
              </h1>
              <p className="text-gray-600">
                Showing {activeTab === 'products' ? filteredProducts.length : filteredStores.length} {activeTab} in {categoryFilter}
              </p>
            </div>
          )}
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Hidden on mobile, toggleable */}
            <div className="hidden md:block md:w-1/4 lg:w-1/5 flex-shrink-0">
              <ProductFilterSidebar 
                onFilterChange={handleFilterChange}
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                priceRange={priceRange}
                onPriceRangeChange={handlePriceRangeChange}
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                activeTab={activeTab}
              />
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
            
            {/* Content Area */}
            <div className="flex-1">
              {/* Tab Navigation */}
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

              {/* Content based on active tab */}
              {activeTab === 'products' ? (
                <div>
                  {/* Filter summary and clear button */}
                  {(selectedCategory || searchQuery || priceRange.min > 0 || priceRange.max < 1000000) && (
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-600">
                        {filteredProducts.length} products found
                        {selectedCategory && <span className="ml-2">• Category: {selectedCategory}</span>}
                        {searchQuery && <span className="ml-2">• Search: "{searchQuery}"</span>}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory('');
                          setSearchQuery('');
                          setPriceRange({min: 0, max: 1000000});
                        }}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}
                  
                  <ProductGrid 
                    products={transformedProducts} 
                    onFavoriteToggle={handleFavoriteToggle} 
                  />
                </div>
              ) : (
                <div className="w-full">
                  {/* Filter summary and clear button for stores */}
                  {(selectedCategory || searchQuery) && (
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm text-gray-600">
                        {filteredStores.length} stores found
                        {selectedCategory && <span className="ml-2">• Category: {selectedCategory}</span>}
                        {searchQuery && <span className="ml-2">• Search: "{searchQuery}"</span>}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCategory('');
                          setSearchQuery('');
                          setPriceRange({min: 0, max: 1000000});
                        }}
                        className="text-sm text-indigo-600 hover:text-indigo-800"
                      >
                        Clear all filters
                      </button>
                    </div>
                  )}

                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-sm text-gray-500">
                        Showing 1-{filteredStores.length} of {filteredStores.length} stores
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredStores.length > 0 ? (
                      filteredStores.map(store => (
                        <Link key={store.id} to={`/shop/${store.id}`}>
                          <StoreCard store={store} />
                        </Link>
                      ))
                    ) : (
                      <p className="col-span-full text-center text-gray-500 py-8">
                        {searchQuery || selectedCategory ? 'No stores match your filters' : 'No stores available'}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
       
    </>
  );
};

// Store Card Component
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

export default Explore;
