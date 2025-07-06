import React from "react";

const HeroGrid = () => (
  <section className="w-full flex justify-center  py-8">
    <div className="grid grid-cols-4 grid-rows-3 gap-4 w-full max-w-5xl h-[420px]">
      <div className="bg-gray-200 col-span-2 row-span-2 rounded-lg flex items-center justify-center text-lg font-bold">A world of talent right at your fingertips.<br/>Get help now.</div>
      <div className="bg-gray-200 col-start-1 row-start-3 rounded-lg flex items-center justify-center">Shipping + Freight</div>
      <div className="bg-blue-200 col-start-2 row-start-3 rounded-lg flex items-center justify-center font-bold">Ready to turn your skills into income?</div>
      <div className="bg-gray-200 col-start-3 row-start-1 rounded-lg flex items-center justify-center">Handyman Services</div>
      <div className="bg-gray-200 row-span-2 col-start-3 rounded-lg row-start-2 flex items-center justify-center">Hiring top taskers</div>
      <div className="bg-gray-200 row-span-3 col-start-4 rounded-lg row-start-1 flex items-center justify-center">Office work</div>
    </div>
  </section>
);

export default HeroGrid; 