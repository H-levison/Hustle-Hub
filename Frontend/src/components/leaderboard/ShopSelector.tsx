import React from "react";

const shops = [
  { id: "all", name: "All Shops" },
  { id: "shop1", name: "Coffee House" },
  { id: "shop2", name: "Book Store" },
  { id: "shop3", name: "Grocery Mart" },
];

const ShopSelector = () => {
  const [selectedShop, setSelectedShop] = React.useState("all");

  return (
    <div className="relative z-10 mb-6">
      <select
        className="px-4 py-2 rounded border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        value={selectedShop}
        onChange={e => setSelectedShop(e.target.value)}
      >
        {shops.map(shop => (
          <option key={shop.id} value={shop.id}>{shop.name}</option>
        ))}
      </select>
    </div>
  );
};

export default ShopSelector; 