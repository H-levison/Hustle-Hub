import React from "react";

const VendorBanner: React.FC = () => (
  <div className="w-full max-w-8xl mx-auto px-[80px] mt-[-20px]">
  <section className="w-full py-12 px-[80px] bg-[#10194A] rounded-3xl flex flex-col md:flex-row items-center justify-between px-8 py-12 gap-8">
    {/* Left Side */}
    <div className="flex-1 max-w-xl">
      <h2 className="text-white text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
        Join as a VENDOR: showcase<br />your products and services Today
      </h2>
      <p className="text-white/80 mb-8 text-base md:text-lg">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean id elementum mauris. Vivamus rutrum turpis id nibh ullamcorper varius. Suspendisse dolor justo, sagittis a justo id, hendrerit rutrum velit.
      </p>
      <button className="bg-white text-[#10194A] font-semibold rounded-full px-8 py-3 text-base shadow hover:bg-gray-100 transition">
        Become a vendor
      </button>
    </div>
    {/* Right Side */}
    <div className="flex-1 flex items-center justify-center w-full max-w-xl">
      <div className="grid grid-cols-2 grid-rows-2 gap-4 w-full h-[320px]">
        <div className="bg-gray-300 rounded-xl col-span-1 row-span-2 h-full" />
        <div className="bg-gray-300 rounded-xl col-span-1 row-span-1" />
        <div className="bg-gray-300 rounded-xl col-span-1 row-span-1" />
      </div>
    </div>
  </section>

  </div>
);

export default VendorBanner; 