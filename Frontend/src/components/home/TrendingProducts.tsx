import React from "react";

const trendingProducts = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    title: "Call of Duty",
    category: "Games",
    subcategory: "Shooter",
    rating: 4.8,
    reviews: 254,
    price: 59.99,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
    title: "chez mama tresor",
    category: "Food",
    subcategory: "Hamburger",
    rating: 4.8,
    reviews: 91,
    price: 11.99,
  },
];

const TrendingProducts: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 py-8">
    <h2 className="text-xl font-bold mb-4">Trending Products</h2>
    <div className="flex gap-4 overflow-x-auto pb-2">
      {trendingProducts.map((product) => (
        <div key={product.id} className="min-w-[180px] bg-white rounded-xl shadow p-2 flex flex-col">
          <img src={product.image} alt={product.title} className="w-full h-28 object-cover rounded-t-xl mb-2" />
          <div className="font-semibold text-sm mb-1">{product.title}</div>
          <div className="text-xs text-gray-500 mb-1">{product.category}, {product.subcategory}</div>
          <div className="flex items-center gap-1 text-xs text-yellow-500 mb-1">
            <span>★</span> {product.rating} ({product.reviews})
          </div>
          <div className="text-base font-bold text-blue-600">${product.price}</div>
        </div>
      ))}
    </div>
  </section>
);

export default TrendingProducts; 