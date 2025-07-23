import React from "react";

const CategoryChips = () => (
  <section className="w-full flex justify-center  py-2 border-b">
    <div className="flex gap-2 overflow-x-auto max-w-5xl w-full">
      {['Floor & Ceiling', 'Fence Installation', 'Wall Repair', 'Construction & Maintenance', 'Landscaping & General Carpentry', 'Construction Work'].map((chip) => (
        <span key={chip} className="px-4 py-1 bg-gray-100 rounded-full text-xs cursor-pointer">{chip}</span>
      ))}
    </div>
  </section>
);

export default CategoryChips; 