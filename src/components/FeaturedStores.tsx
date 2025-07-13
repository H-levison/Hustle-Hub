import React from "react";

const featuredStores = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
    title: "Alu Luxury cars",
    subtitle: "Starting at 12am-8",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1605032655655-cb0cdd3e0f50?auto=format&fit=crop&w=400&q=80",
    title: "Fast Lane Autos",
    subtitle: "Starting at 1pm-6",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=400&q=80",
    title: "Elite Motors",
    subtitle: "Starting at 9am-5",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=400&q=80",
    title: "Speed Demons",
    subtitle: "Starting at 11am-7",
  },
];

const FeaturedStores = () => (
  <section className="mx-24 px-4 py-8">
    <h2 className="text-2xl font-bold mb-6">Featured Stores</h2>
    <div className="grid grid-cols-5 gap-4 ">
      {featuredStores.map((store) => (
        <div
          key={store.id}
          className="relative h-80 rounded-xl overflow-hidden shadow-lg group cursor-pointer"
        >
          <img
            src={store.image}
            alt={store.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-white/90 text-xs px-2 py-1 rounded-full font-medium">cars</span>
            <span className="bg-white/90 text-xs px-2 py-1 rounded-full font-medium">Category</span>
          </div>
          
          <button className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="absolute bottom-14 left-3 text-white">
            <h3 className="font-semibold text-lg leading-tight">{store.title}</h3>
            <p className="text-sm opacity-90">{store.subtitle}</p>
          </div>
          
          <button className="absolute bottom-3 left-3 right-3 bg-white text-black rounded-full py-2 text-sm font-semibold hover:bg-gray-100 transition-colors">
            Browse shop
          </button>
        </div>
      ))}
    </div>
  </section>
);

export default FeaturedStores;