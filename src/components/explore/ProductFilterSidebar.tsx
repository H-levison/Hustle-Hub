import React from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);

  return (
    <div className="border-b pb-4 mb-4">
      <button 
        className="flex items-center justify-between w-full py-2 font-medium text-gray-900"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <ChevronDown 
          size={16} 
          className={`transition-transform ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </button>
      {isOpen && (
        <div className="mt-2">
          {children}
        </div>
      )}
    </div>
  );
};

interface CheckboxFilterProps {
  id: string;
  label: string;
  count?: number;
  checked: boolean;
  onChange: (id: string) => void;
}

const CheckboxFilter: React.FC<CheckboxFilterProps> = ({ id, label, count, checked, onChange }) => {
  return (
    <div className="flex items-center py-1">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onChange(id)}
        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
      />
      <label htmlFor={id} className="ml-2 text-sm text-gray-700 flex-1">{label}</label>
      {count !== undefined && <span className="text-xs text-gray-500">{count}</span>}
    </div>
  );
};

interface RangeFilterProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}

const RangeFilter: React.FC<RangeFilterProps> = ({ 
  min, 
  max, 
  value, 
  onChange,
  formatValue = (val) => `$${val}`
}) => {
  return (
    <div className="mt-2">
      <div className="flex justify-between mb-2">
        <span className="text-sm text-gray-700">{formatValue(value[0])}</span>
        <span className="text-sm text-gray-700">{formatValue(value[1])}</span>
      </div>
      <div className="flex gap-2">
        <input
          type="range"
          min={min}
          max={max}
          value={value[0]}
          onChange={(e) => onChange([parseInt(e.target.value), value[1]])}
          className="w-full"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value[1]}
          onChange={(e) => onChange([value[0], parseInt(e.target.value)])}
          className="w-full"
        />
      </div>
    </div>
  );
};

interface ProductFilterSidebarProps {
  onFilterChange: (filters: any) => void;
  categories: Array<{id: string, name: string}>;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  priceRange: {min: number, max: number};
  onPriceRangeChange: (range: {min: number, max: number}) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  activeTab: 'products' | 'stores';
}

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({ 
  onFilterChange, 
  categories, 
  selectedCategory, 
  onCategoryChange,
  priceRange,
  onPriceRangeChange,
  searchQuery,
  onSearchChange,
  activeTab
}) => {
  const [sizeFilters, setSizeFilters] = React.useState({
    s: false,
    m: false,
    l: false,
    xl: false,
  });

  const handleCategoryChange = (categoryName: string) => {
    onCategoryChange(categoryName === selectedCategory ? '' : categoryName);
  };

  const handleSizeChange = (id: string) => {
    const newFilters = { ...sizeFilters, [id]: !sizeFilters[id as keyof typeof sizeFilters] };
    setSizeFilters(newFilters);
    onFilterChange({ selectedCategory, priceRange, sizeFilters: newFilters });
  };

  const handlePriceChange = (value: [number, number]) => {
    const newRange = { min: value[0], max: value[1] };
    onPriceRangeChange(newRange);
    onFilterChange({ selectedCategory, priceRange: newRange, sizeFilters });
  };

  return (
    <div className="w-full max-w-xs bg-white p-4 rounded-lg border">
      <h2 className="text-lg font-semibold mb-4">
        {activeTab === 'products' ? 'Product Filters' : 'Store Filters'}
      </h2>
      
      <FilterSection title="Search">
        <input
          type="text"
          placeholder={activeTab === 'products' ? "Search products..." : "Search stores..."}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </FilterSection>
      
      <FilterSection title="Categories">
        {categories.map((category) => (
          <CheckboxFilter 
            key={category.id}
            id={category.id} 
            label={category.name} 
            checked={selectedCategory === category.name}
            onChange={() => handleCategoryChange(category.name)} 
          />
        ))}
      </FilterSection>

      {/* Only show product-specific filters when on products tab */}
      {activeTab === 'products' && (
        <>
          <FilterSection title="Size">
            <div className="grid grid-cols-4 gap-2">
              {['S', 'M', 'L', 'XL'].map((size) => {
                const id = size.toLowerCase();
                return (
                  <button
                    key={size}
                    className={`border rounded-md py-1 text-sm ${sizeFilters[id as keyof typeof sizeFilters] ? 'bg-indigo-600 text-white border-indigo-600' : 'border-gray-300 text-gray-700'}`}
                    onClick={() => handleSizeChange(id)}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </FilterSection>

          <FilterSection title="Price Range">
            <RangeFilter
              min={0}
              max={1000000}
              value={[priceRange.min, priceRange.max]}
              onChange={handlePriceChange}
              formatValue={(val) => `RWF${val.toLocaleString()}`}
            />
          </FilterSection>
        </>
      )}

      <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilterSidebar;