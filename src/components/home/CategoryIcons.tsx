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
    <div className="w-full max-w-8xl mx-auto px-4 sm:px-8 md:px-[80px]   border-b border-gray-200">
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
            {categories.map(({ label, icon: Icon }) => (
              <button
                key={label}
                className={`flex items-center gap-2 sm:gap-3 min-w-fit whitespace-nowrap px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 ${
                  selected === label 
                    ? "bg-blue-50 border-blue-200 border shadow-sm" 
                    : "hover:bg-gray-50"
                }`}
                onClick={() => handleCategoryClick(label)}
                type="button"
              >
                <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full transition-colors flex-shrink-0 ${
                  selected === label ? "bg-blue-100" : "bg-gray-100"
                }`}>
                  <Icon size={selected === label ? 20 : 18} className={selected === label ? "text-blue-600" : "text-gray-600"} />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700">{label}</span>
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
      </section>
    </div>
  );
};

export default CategoryIcons;