import React, { useState } from "react";
import { Navigation } from "../components/Navigation";
import SearchBar from "../components/SearchBar";
import ProductFilterSidebar from "../components/explore/ProductFilterSidebar";
import ProductGrid from "../components/explore/ProductGrid";
import { SlidersHorizontal, Search } from "lucide-react";

// Import product data from ProductCards component
const products = [
  {
    id: 1,
    images: [
      "https://cdn.guardian.ng/wp-content/uploads/2023/12/Photo-Credit-Jollof-Festival-.jpg"
    ],
    title: "Jollof Rice",
    location: "Fatima's Kitchen",
    price: 12,
    rating: 4.9,
    reviews: 1023,
    isFavorite: true,
    description: "A flavorful rice dish cooked in a rich tomato sauce.",
    details: "Made with rice, tomatoes, onions, peppers, and spices. Often served with chicken, beef, or plantains.",
  },
  {
    id: 2,
    images: [
      "https://eatsdelightful.com/wp-content/uploads/2023/07/decorated-and-sliced-chocolate-chip-red-velvet-cake-on-cake-stand-2-scaled.jpg"
    ],
    title: "Chocolate Red Velvet Cake",
    location: "Bakery Delight",
    price: 18,
    rating: 4.7,
    reviews: 587,
    isFavorite: false,
    description: "A rich, moist red velvet cake with a hint of chocolate.",
    details: "Layers of chocolate-infused red velvet cake topped with cream cheese frosting. Perfect for special occasions.",
  },
  {
    id: 3,
    images: [
      "https://media.voguebusiness.com/photos/60140c47d3d19b7432dd2ea9/2:3/w_2560%2Cc_limit/sneakers-sustainability-voguebus-janine-abrenilla-jan-21-story.jpg"
    ],
    title: "Classic Sneakers",
    location: "House of Sneakers",
    price: 75,
    rating: 4.6,
    reviews: 412,
    isFavorite: true,
    description: "Stylish and versatile sneakers for everyday wear.",
    details: "Leather upper, cushioned insole, non-slip rubber sole. Suitable for casual or semi-formal outfits.",
  },
  {
    id: 4,
    images: [
      "https://sisijemimah.com/wp-content/uploads/2016/04/image-2.jpeg"
    ],
    title: "Chin Chin",
    location: "Fani's Bites",
    price: 5,
    rating: 4.8,
    reviews: 764,
    isFavorite: true,
    description: "Crunchy, sweet fried dough snack popular across Nigeria.",
    details: "Made from flour, sugar, milk, butter, and nutmeg. Deep-fried to a golden brown. Perfect for snacking or parties.",
  },
  {
    id: 5,
    images: [
      "https://m.media-amazon.com/images/I/71XZXuS-lbL._UF1000,1000_QL80_.jpg"
    ],
    title: "Glow Essentials Skincare Set",
    location: "Beauty & Co.",
    price: 45,
    rating: 3.2,
    reviews: 320,
    isFavorite: false,
    description: "A complete skincare set for glowing, healthy skin.",
    details: "Includes cleanser, toner, serum, moisturizer, and sunscreen. Suitable for all skin types. Infused with vitamin C, hyaluronic acid, and botanical extracts.",
  },
  {
    id: 6,
    images: [
      "https://i.redd.it/iw6g7cmeulgb1.jpg"
    ],
    title: "Air Max Running Shoes",
    location: "House of Sneakers",
    price: 129.99,
    rating: 4.5,
    reviews: 856,
    isFavorite: false,
    description: "Premium running shoes with air cushioning.",
    details: "Breathable mesh upper, responsive cushioning, durable rubber outsole.",
  },
  {
    id: 7,
    images: [
      "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/09c5ea6df1bd4be6baaaac5e003e7047_9366/Forum_Low_Shoes_White_FY7756_01_standard.jpg"
    ],
    title: "Forum Low Shoes",
    location: "House of Sneakers",
    price: 89.99,
    rating: 4.3,
    reviews: 412,
    isFavorite: true,
    description: "Classic low-top sneakers with modern comfort.",
    details: "Leather upper, rubber outsole, padded collar for comfort.",
  },
  {
    id: 8,
    images: [
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_1350,h_1350/global/307338/02/sv01/fnd/IND/fmt/png/PUMA-x-LAMELO-BALL-MB.03-TOXIC-Men's-Basketball-Shoes"
    ],
    title: "MB.03 Basketball Shoes",
    location: "House of Sneakers",
    price: 119.99,
    rating: 4.7,
    reviews: 328,
    isFavorite: false,
    description: "High-performance basketball shoes with excellent grip.",
    details: "Engineered for court performance with responsive cushioning and stability.",
  },
];

const Explore = () => {
  const [productList, setProductList] = useState(products);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleFavoriteToggle = (productId: number) => {
    setProductList(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleFilterChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // Implement filtering logic here
  };

  return (
    <>
      <Navigation />
      
      
      
      {/* Main Content */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar - Hidden on mobile, toggleable */}
            <div className="hidden md:block md:w-1/4 lg:w-1/5 flex-shrink-0">
              <ProductFilterSidebar onFilterChange={handleFilterChange} />
            </div>
            
            {/* Mobile filter toggle button */}
            <div className="md:hidden mb-4">
              <button 
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                onClick={() => console.log('Toggle mobile filters')}
              >
                <SlidersHorizontal size={16} />
                Filters
              </button>
            </div>
            
            {/* Product Grid */}
            <div className="flex-1">
              <ProductGrid 
                products={productList} 
                onFavoriteToggle={handleFavoriteToggle} 
              />
            </div>
          </div>
        </div>
      </section>
       
    </>
  );
};

export default Explore;
