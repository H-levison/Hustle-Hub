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
  { label: "Cleaning", icon: Feather },
  { label: "Handyman", icon: Hammer },
  { label: "Carpooling", icon: Car },
  { label: "Assistant", icon: User },
  { label: "Home Repairs", icon: Wrench },
  { label: "Grocery", icon: ShoppingCart },
  { label: "Pharmacy", icon: Pill },
  { label: "Clothing", icon: Shirt },
  { label: "Electronics", icon: Monitor },
  { label: "Food", icon: Utensils },
  { label: "Chef", icon: ChefHat },
  { label: "Security", icon: Shield },
  { label: "Cashier", icon: CreditCard },
  { label: "Manager", icon: Briefcase },
  { label: "Retail Store", icon: Store },
  { label: "Home Services", icon: Home },
  { label: "Delivery", icon: Truck },
  { label: "Support", icon: Phone },
  { label: "Consulting", icon: HeartHandshake },
];

const subcategories: Record<string, string[]> = {
  Cleaning: ["House Cleaning", "Office Cleaning", "Deep Cleaning", "Window Cleaning", "Carpet Cleaning"],
  Handyman: ["Furniture Assembly", "Wall Mounting", "Minor Repairs", "Installation", "Maintenance"],
  Carpooling: ["Daily Commute", "Airport Rides", "Long Distance", "Event Transportation", "Group Travel"],
  Assistant: ["Virtual Assistant", "Personal Assistant", "Administrative", "Data Entry", "Research"],
  "Home Repairs": ["Plumbing", "Electrical", "Painting", "Carpentry", "Roofing"],
  Grocery: ["Fruits", "Vegetables", "Dairy", "Snacks", "Drinks"],
  Pharmacy: ["Medicine", "Supplements", "Personal Care", "First Aid", "Health Products"],
  Clothing: ["Men", "Women", "Kids", "Shoes", "Accessories"],
  Electronics: ["Phones", "Laptops", "TVs", "Cameras", "Accessories"],
  Food: ["Pizza", "Sushi", "Burgers", "Vegan", "Grill"],
  Chef: ["Private Chef", "Meal Prep", "Catering", "Baking", "Special Diets"],
  Security: ["Home Security", "Event Security", "Surveillance", "Guard Services", "Safety Consulting"],
  Cashier: ["Retail", "Restaurant", "Gas Station", "Grocery Store", "Event Cashier"],
  Manager: ["Store Manager", "Team Lead", "Project Manager", "Operations", "Supervisor"],
  "Retail Store": ["Fashion", "Electronics", "Home Goods", "Sports", "Books"],
  "Home Services": ["Lawn Care", "Pool Maintenance", "Pet Care", "Elder Care", "Babysitting"],
  Delivery: ["Food Delivery", "Package Delivery", "Grocery Delivery", "Furniture Delivery", "Express Delivery"],
  Support: ["Customer Service", "Technical Support", "Help Desk", "Phone Support", "Live Chat"],
  Consulting: ["Business Consulting", "IT Consulting", "Marketing", "Financial Advice", "Career Coaching"],
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
    <div className="w-full max-w-8xl mx-auto px-[80px] mt-[-20px] border-b border-gray-200">
    <section className=" px-4 py-6 border-b border-gray-200">
      <div className="relative flex items-center">
        <button
          aria-label="Scroll left"
          onClick={scrollLeft}
          className="flex-shrink-0 p-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-colors z-10"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>
        
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto no-scrollbar mx-4 flex-1"
          style={{ scrollBehavior: "smooth" }}
        >
          {categories.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`flex flex-col items-center min-w-[80px] p-3 rounded-lg transition-all duration-200 ${
                selected === label 
                  ? "bg-blue-50 border-blue-200 border shadow-sm" 
                  : "hover:bg-gray-50"
              }`}
              onClick={() => handleCategoryClick(label)}
              type="button"
            >
              <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 transition-colors ${
                selected === label ? "bg-blue-100" : "bg-gray-100"
              }`}>
                <Icon size={24} className={selected === label ? "text-blue-600" : "text-gray-600"} />
              </div>
              <span className="text-xs font-medium text-center text-gray-700 leading-tight">{label}</span>
            </button>
          ))}
        </div>
        
        <button
          aria-label="Scroll right"
          onClick={scrollRight}
          className="flex-shrink-0 p-2 rounded-full bg-white hover:bg-gray-50 border border-gray-200 shadow-sm transition-colors z-10"
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M9 6l6 6-6 6"/>
          </svg>
        </button>
      </div>
      
      {selected && subcategories[selected] && (
        <div className="mt-6 px-16">
          <div className="flex gap-2 flex-wrap justify-center">
            {subcategories[selected].map((sub) => (
              <span
                key={sub}
                className="px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full text-sm font-medium cursor-pointer transition-colors border border-gray-200"
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