import React, { useRef, useState, useEffect } from "react";
import {
  Feather,
  Hammer,
  Car,
  User,
  Wrench,
  ShoppingCart,
  Pill,
  Shirt,
  Monitor,
  Utensils,
  ChefHat,
  Shield,
  CreditCard,
  Briefcase,
  Store,
  Home,
  Truck,
  Phone,
  HeartHandshake,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
}

// Map category names to icons
const getCategoryIcon = (categoryName: string) => {
  const iconMap: { [key: string]: any } = {
    'Food': Utensils,
    'Electronics': Monitor,
    'Clothing': Shirt,
    'Services': Home,
    'Transport': Car,
    'Health': Pill,
    'Beauty': Feather,
    'Sports': Shield,
    'Books': Briefcase,
    'Home': Home,
    'Automotive': Car,
    'Technology': Monitor,
    'Fashion': Shirt,
    'Entertainment': Phone,
    'Education': Briefcase,
    'Finance': CreditCard,
    'Real Estate': Home,
    'Travel': Truck,
    'Food & Beverage': Utensils,
    'Restaurant': ChefHat,
    'Cafe': Utensils,
    'Bakery': ChefHat,
    'Grocery': ShoppingCart,
    'Pharmacy': Pill,
    'Hardware': Hammer,
    'Tools': Wrench,
    'Furniture': Home,
    'Jewelry': Shield,
    'Shoes': Shirt,
    'Accessories': Shirt,
  };

  // Try to find exact match first
  if (iconMap[categoryName]) {
    return iconMap[categoryName];
  }

  // Try to find partial match
  for (const [key, icon] of Object.entries(iconMap)) {
    if (categoryName.toLowerCase().includes(key.toLowerCase())) {
      return icon;
    }
  }

  // Default icon
  return Store;
};

const SCROLL_AMOUNT = 200;

const CategoryIcons = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/categories');
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: SCROLL_AMOUNT, behavior: "smooth" });
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelected((prev) => (prev === categoryName ? null : categoryName));
  };

  if (loading) {
    return (
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-8 md:px-[80px] border-b border-gray-200">
        <section className="px-2 sm:px-4 py-4 sm:py-2 border-b border-gray-200">
          <div className="relative flex items-center">
            <div className="flex gap-3 sm:gap-6 overflow-x-auto no-scrollbar mx-2 sm:mx-4 flex-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-2 sm:gap-3 min-w-fit whitespace-nowrap px-3 sm:px-4 py-2 sm:py-3 rounded-lg bg-gray-200 animate-pulse">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-300 animate-pulse" />
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="w-full max-w-8xl mx-auto px-4 sm:px-8 md:px-[80px] border-b border-gray-200">
      <section className="px-2 sm:px-4 py-4 sm:py-2 border-b border-gray-200">
        <div className="relative flex items-center">
          <button
            aria-label="Scroll left"
            onClick={scrollLeft}
            className="flex-shrink-0 p-2 sm:p-2.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-colors z-10"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          
          <div
            ref={scrollRef}
            className="flex gap-3 sm:gap-6 overflow-x-auto no-scrollbar mx-2 sm:mx-4 flex-1"
            style={{ scrollBehavior: "smooth" }}
          >
            {categories.map((category) => {
              const Icon = getCategoryIcon(category.name);
              return (
                <button
                  key={category.id}
                  className={`flex items-center gap-2 sm:gap-3 min-w-fit whitespace-nowrap px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                    selected === category.name 
                      ? "bg-blue-50 border-blue-200 border shadow-sm" 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleCategoryClick(category.name)}
                  type="button"
                >
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-colors flex-shrink-0 ${
                    selected === category.name ? "bg-blue-100" : "bg-gray-100"
                  }`}>
                    <Icon size={selected === category.name ? 20 : 18} className={selected === category.name ? "text-blue-600" : "text-gray-600"} />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-700">{category.name}</span>
                </button>
              );
            })}
          </div>
          
          <button
            aria-label="Scroll right"
            onClick={scrollRight}
            className="flex-shrink-0 p-2 sm:p-2.5 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-colors z-10"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default CategoryIcons;