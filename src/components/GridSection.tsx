import React from "react";

export const GridSection = (): JSX.Element => {
  return (
    <section className="w-full py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-12 gap-6 h-auto">
          {/* Large main card - spans 8 columns and 2 rows */}
          <div className="col-span-8 row-span-2 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl p-8 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Content</h2>
              <p className="text-gray-600 text-lg">Discover our most popular offerings</p>
            </div>
          </div>

          {/* Top right card */}
          <div className="col-span-4 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl p-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Quick Access</h3>
              <p className="text-gray-600">Fast solutions</p>
            </div>
          </div>

          {/* Middle right card */}
          <div className="col-span-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl p-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Services</h3>
              <p className="text-gray-600">Professional help</p>
            </div>
          </div>

          {/* Bottom left cards */}
          <div className="col-span-4 bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-2xl p-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Products</h3>
              <p className="text-gray-600">Quality items</p>
            </div>
          </div>

          <div className="col-span-4 bg-gradient-to-br from-red-100 to-red-200 rounded-2xl p-6 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Support</h3>
              <p className="text-gray-600">We're here to help</p>
            </div>
          </div>

          {/* Tall right card */}
          <div className="col-span-4 row-span-2 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-2xl p-8 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Special Offers</h3>
              <p className="text-gray-600 mb-4">Don't miss out on our latest deals and promotions</p>
              <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                View Offers
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};