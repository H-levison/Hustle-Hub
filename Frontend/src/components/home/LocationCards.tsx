import React from "react";

const locations = [
  { city: 'Dakar, Senegal', price: 30, img: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=facearea&w=400&h=200' },
  { city: 'Guédiawaye, Senegal', price: 35, img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=200' },
  { city: 'Pikine, Senegal', price: 30, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=facearea&w=400&h=200' },
  { city: 'Rufisque, Senegal', price: 48, img: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=facearea&w=400&h=200' },
  { city: 'San Francisco, USA', price: 70, img: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=facearea&w=400&h=200' },
];

const LocationCards = () => (
  <section className="w-full flex justify-center   py-8">
    <div className="flex gap-6 overflow-x-auto max-w-5xl w-full">
      {locations.map(({ city, price, img }) => (
        <div key={city} className="min-w-[220px] bg-white rounded-lg shadow p-2 flex flex-col items-center">
          <img src={img} alt={city} className="w-full h-32 object-cover rounded-md mb-2" />
          <div className="font-medium text-sm mt-1">{city}</div>
          <div className="text-[#1c09ed] font-bold text-base">${price}.00 <span className="text-xs font-normal">hour</span></div>
        </div>
      ))}
    </div>
  </section>
);

export default LocationCards; 