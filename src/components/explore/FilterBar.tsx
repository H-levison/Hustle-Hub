import React from 'react';
import { Filter } from 'lucide-react';

interface FilterBarProps {
  filters: string[];
  activeFilter: string | null;
  setActiveFilter: (filter: string | null) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, activeFilter, setActiveFilter }) => {
  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2">
      <span className="flex items-center gap-1 text-gray-700 font-medium">
        <Filter size={16} />
        Filters:
      </span>
      {filters.map((filter) => (
        <button
          key={filter}
          className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${activeFilter === filter ? 'bg-indigo-600 text-white' : 'bg-white border border-gray-300 text-gray-700 hover:border-indigo-300'}`}
          onClick={() => setActiveFilter(filter === activeFilter ? null : filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;