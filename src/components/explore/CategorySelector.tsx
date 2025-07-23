import React from 'react';
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
  Book,
  Palette,
  Scissors,
} from 'lucide-react';

interface Category {
  label: string;
  icon: React.ElementType;
}

interface CategorySelectorProps {
  onSelectCategory: (category: string) => void;
  selectedCategory: string | null;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onSelectCategory, selectedCategory }) => {
  const categories: Category[] = [
    { label: 'Food', icon: Utensils },
    { label: 'Clothing', icon: Shirt },
    { label: 'Electronics', icon: Monitor },
    { label: 'Services', icon: HeartHandshake },
    { label: 'Handmade', icon: Scissors },
    { label: 'Books', icon: Book },
    { label: 'Beauty', icon: Palette },
    { label: 'Home', icon: Home },
    { label: 'Transport', icon: Car },
  ];

  return (
    <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <div 
            key={category.label}
            className={`flex flex-col items-center justify-center p-4 rounded-lg cursor-pointer transition-all ${selectedCategory === category.label ? 'bg-indigo-100 text-indigo-600 scale-105' : 'bg-white hover:bg-gray-50 text-gray-700'}`}
            onClick={() => onSelectCategory(category.label === selectedCategory ? '' : category.label)}
          >
            <div className="p-3 rounded-full bg-gray-100 mb-2">
              <Icon size={24} className={selectedCategory === category.label ? 'text-indigo-600' : 'text-gray-700'} />
            </div>
            <span className="text-sm font-medium text-center">{category.label}</span>
          </div>
        );
      })}
    </div>
  );
};

export default CategorySelector;