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
}

const ProductFilterSidebar: React.FC<ProductFilterSidebarProps> = ({ onFilterChange }) => {
  const [categoryFilters, setCategoryFilters] = React.useState({
    food: false,
    clothing: false,
    electronics: false,
    services: false,
    handmade: false,
    books: false,
    beauty: false,
    home: false,
  });

  const [brandFilters, setBrandFilters] = React.useState({
    adidas: false,
    nike: false,
    puma: false,
    reebok: false,
    newBalance: false,
  });

  const [sizeFilters, setSizeFilters] = React.useState({
    s: false,
    m: false,
    l: false,
    xl: false,
  });

  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 100]);

  const handleCategoryChange = (id: string) => {
    const newFilters = { ...categoryFilters, [id]: !categoryFilters[id as keyof typeof categoryFilters] };
    setCategoryFilters(newFilters);
    onFilterChange({ ...brandFilters, ...newFilters, priceRange });
  };

  const handleBrandChange = (id: string) => {
    const newFilters = { ...brandFilters, [id]: !brandFilters[id as keyof typeof brandFilters] };
    setBrandFilters(newFilters);
    onFilterChange({ ...categoryFilters, ...newFilters, priceRange });
  };

  const handleSizeChange = (id: string) => {
    const newFilters = { ...sizeFilters, [id]: !sizeFilters[id as keyof typeof sizeFilters] };
    setSizeFilters(newFilters);
    onFilterChange({ ...categoryFilters, ...brandFilters, ...newFilters, priceRange });
  };

  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
    onFilterChange({ ...categoryFilters, ...brandFilters, ...sizeFilters, priceRange: value });
  };

  return (
    <div className="w-full max-w-xs bg-white p-4 rounded-lg border">
      <h2 className="text-lg font-semibold mb-4">Product Categories</h2>
      
      <FilterSection title="Categories">
        <CheckboxFilter id="food" label="Food" count={12} checked={categoryFilters.food} onChange={handleCategoryChange} />
        <CheckboxFilter id="clothing" label="Clothing" count={8} checked={categoryFilters.clothing} onChange={handleCategoryChange} />
        <CheckboxFilter id="electronics" label="Electronics" count={15} checked={categoryFilters.electronics} onChange={handleCategoryChange} />
        <CheckboxFilter id="services" label="Services" count={6} checked={categoryFilters.services} onChange={handleCategoryChange} />
        <CheckboxFilter id="handmade" label="Handmade" count={4} checked={categoryFilters.handmade} onChange={handleCategoryChange} />
        <CheckboxFilter id="books" label="Books" count={9} checked={categoryFilters.books} onChange={handleCategoryChange} />
        <CheckboxFilter id="beauty" label="Beauty" count={7} checked={categoryFilters.beauty} onChange={handleCategoryChange} />
        <CheckboxFilter id="home" label="Home" count={5} checked={categoryFilters.home} onChange={handleCategoryChange} />
      </FilterSection>

      <FilterSection title="Brands">
        <CheckboxFilter id="adidas" label="Adidas" count={5} checked={brandFilters.adidas} onChange={handleBrandChange} />
        <CheckboxFilter id="nike" label="Nike" count={7} checked={brandFilters.nike} onChange={handleBrandChange} />
        <CheckboxFilter id="puma" label="Puma" count={3} checked={brandFilters.puma} onChange={handleBrandChange} />
        <CheckboxFilter id="reebok" label="Reebok" count={2} checked={brandFilters.reebok} onChange={handleBrandChange} />
        <CheckboxFilter id="newBalance" label="New Balance" count={4} checked={brandFilters.newBalance} onChange={handleBrandChange} />
      </FilterSection>

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
          max={100}
          value={priceRange}
          onChange={handlePriceChange}
        />
      </FilterSection>

      <button className="w-full mt-4 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
        Apply Filters
      </button>
    </div>
  );
};

export default ProductFilterSidebar;