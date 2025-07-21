import React from "react";
import { Link } from "react-router-dom";

const featuredStores = [
  {
    id: 1,
    image: "https://www.flippedoutfood.com/wp-content/uploads/2022/02/Movie-Theater-Popcorn-featured-540x720.jpg",
    title: "Popcorn Guy",
    subtitle: "Open from 9:00 AM to 4:00 PM",
  },
  {
    id: 2,
    image: "https://cookingwithclaudy.com/wp-content/uploads/2023/02/bca2acd9329ec7bb2050f52a3293d0e5.jpg",
    title: "Fatima's Kitchen",
    subtitle: "Open from 11:00 AM to 8:00 PM",
  },
  {
    id: 3,
    image: "https://i.ytimg.com/vi/QMDaxjc11xc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAv2aHkQ338hRLssjViQ_n3HB_A3g",
    title: "Fani's Bites",
    subtitle: "Open from 8:00 AM to 11:00 PM",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=400&q=80",
    title: "Speed Demons",
    subtitle: "Starting at 11am-7",
  },
];

const FeaturedStores = () => (
  <section className="px-2 sm:px-4 md:mx-24 py-6 sm:py-8">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Stores</h2>
    <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-4">
      {featuredStores.map((store) => (
        <Link
          key={store.id}
          to={`/shop/${store.id}`}
          className="relative h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden shadow-lg group cursor-pointer block min-w-[250px] max-w-[320px] sm:min-w-0 sm:max-w-none snap-start"
        >
          <img
            src={store.image}
            alt={store.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-2">
            <span className="bg-white/90 text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium">Food</span>
            <span className="bg-white/90 text-[10px] sm:text-xs px-2 py-1 rounded-full font-medium">Category</span>
          </div>
          
          <button className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white/90 rounded-full p-1.5 sm:p-2 hover:bg-white transition-colors">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
          
          <div className="absolute bottom-12 sm:bottom-14 left-2 sm:left-3 text-white">
            <h3 className="font-semibold text-base sm:text-lg leading-tight">{store.title}</h3>
            <p className="text-xs sm:text-sm opacity-90">{store.subtitle}</p>
          </div>
          
          <button className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-white text-black rounded-full py-1.5 sm:py-2 text-xs sm:text-sm font-semibold hover:bg-gray-100 transition-colors">
            Browse shop
          </button>
        </Link>
      ))}
    </div>
  </section>
);

export default FeaturedStores;