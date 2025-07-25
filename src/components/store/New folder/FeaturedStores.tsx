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

const FeaturedStores = () => {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Featured Stores
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover our top-rated vendors and their unique offerings
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredStores.map((store) => (
            <div
              key={store.id}
              className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-80 w-full overflow-hidden">
                <img
                  src={store.image}
                  alt={store.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">
                  <Link to="/vendor/1" className="hover:underline">
                    {store.title}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{store.subtitle}</p>
                <div className="mt-4">
                  <Link
                    to="/vendor/1"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Visit Store
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedStores;