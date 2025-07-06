import React from "react";

const CategoryIcons = () => (
  <section className="w-full flex justify-center  py-4 border-b">
    <div className="flex gap-6 overflow-x-auto max-w-5xl w-full">
      {['Handyman', 'Cleaning', 'Parties', 'Shopping', 'Carpooling', 'Assistant', 'Home Repairs', 'Assembly'].map((cat) => (
        <div key={cat} className="flex flex-col items-center min-w-[80px]">
          <div className="w-10 h-10 bg-gray-200 rounded-full mb-2" />
          <span className="text-xs font-medium">{cat}</span>
        </div>
      ))}
    </div>
  </section>
);

export default CategoryIcons; 