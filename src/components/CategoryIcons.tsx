import React, { useRef, useState } from "react";
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

const categories = [

  { label: "Carpooling", icon: Car },
  { label: "Clothing", icon: Shirt },
  { label: "Electronics", icon: Monitor },
  { label: "Food", icon: Utensils },
  { label: "Services", icon: Home },
  ];

const subcategories: Record<string, string[]> = {
  
  Carpooling: ["Daily Commute", "Airport Rides", "Long Distance", "Event Transportation", "Group Travel"],
  Clothing: ["Men", "Women", "Kids", "Shoes", "Accessories"],
  Electronics: ["Phones", "Laptops", "TVs", "Cameras", "Accessories"],
  Food: ["Pizza", "Sushi", "Burgers", "Vegan", "Grill"],
  "Services": ["Fashion", "Electronics", "Home Goods", "Sports", "Books"],
  };

const SCROLL_AMOUNT = 200;

const CategoryIcons = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<string | null>(null);

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

  const handleCategoryClick = (label: string) => {
    setSelected((prev) => (prev === label ? null : label));
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-4 sm:px-8 md:px-[80px] mt-[-20px] border-b border-gray-200">
      <section className="px-2 sm:px-4 py-4 sm:py-6 border-b border-gray-200">
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
            {categories.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className={`flex flex-col items-center min-w-[60px] sm:min-w-[80px] p-2 sm:p-3 rounded-lg transition-all duration-200 ${
                  selected === label 
                    ? "bg-blue-50 border-blue-200 border shadow-sm" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryClick(label)}
                type="button"
              >
                <div className={`w-9 h-9 sm:w-12 sm:h-12 flex items-center justify-center rounded-full mb-1 sm:mb-2 transition-colors ${
                  selected === label ? "bg-blue-100" : "bg-gray-100"
                }`}>
                  <Icon size={selected === label ? 22 : 20} className={selected === label ? "text-blue-600" : "text-gray-600"} />
                </div>
                <span className="text-[10px] sm:text-xs font-medium text-center text-gray-700 leading-tight">{label}</span>
              </button>
            ))}
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
        
        {selected && subcategories[selected] && (
          <div className="mt-4 sm:mt-6 px-2 sm:px-16">
            <div className="flex gap-2 flex-wrap justify-center">
              {subcategories[selected].map((sub) => (
                <span
                  key={sub}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-xs sm:text-sm font-medium cursor-pointer transition-colors border border-gray-200"
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryIcons;