import React from "react";

const featuredStores = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    title: "Alu Luxury",
    subtitle: "Starting at 12am-8",
  },
  {
    id: 2,
    image: "./assets/images/featured-stores/featured-store-1.jpg",
    title: "Alu Luxury",
    subtitle: "Starting at 12am-8",
  },
];

const FeaturedStores: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 py-8">
    <h2 className="text-xl font-bold mb-4">Featured Stores</h2>
    <div className="flex gap-4 overflow-x-auto pb-2 h-[400px]">
      {featuredStores.map((store) => (
        <div key={store.id} className="max-w-[250px]  h-[350px] bg-black/80 rounded-xl relative overflow-hidden shadow-lg">
          <img src={store.image} alt={store.title} className="w-full h-full object-contain bg-black opacity-80" />
          <div className="absolute top-2 left-2 flex flex-col gap-1"> 
            <span className="bg-white/70 text-xs px-2 py-1 rounded-full">Category</span>
          </div>
          <div className="absolute top-2 right-2">
            <button className="bg-white/70 rounded-full p-1">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
          <div className="absolute bottom-10 left-2 text-white">
            <div className="font-semibold text-sm leading-tight">{store.title}</div>
            <div className="text-xs">{store.subtitle}</div>
          </div>
          <button className="absolute bottom-2 left-2 right-2 bg-white text-black rounded-full py-1 text-xs font-semibold shadow">Browse shop</button>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedStores; 