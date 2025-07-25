import React, { useState } from "react";
import { Heart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    images: [
      "https://cdn.guardian.ng/wp-content/uploads/2023/12/Photo-Credit-Jollof-Festival-.jpg"
    ],
    title: "Jollof Rice",
    location: "West Africa",
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
    location: "Urban Kicks",
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
    location: "Lagos Bites",
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
    location: "Radiant Beauty Co.",
    price: 45,
    rating: 3.2,
    reviews: 320,
    isFavorite: false,
    description: "A complete skincare set for glowing, healthy skin.",
    details: "Includes cleanser, toner, serum, moisturizer, and sunscreen. Suitable for all skin types. Infused with vitamin C, hyaluronic acid, and botanical extracts.",
  },
];

type Product = {
  id: number;
  images: string[];
  title: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  isFavorite: boolean;
  description: string;
  details: string;
};

interface ProductCardProps {
  product: Product;
  onFavoriteToggle: (productId: number) => void;
  onAddToCart: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onFavoriteToggle, onAddToCart }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFavoriteToggle(product.id);
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAddToCart(product.id);
  };

  return (
    <div className="bg-transparent rounded-xl overflow-hidden group cursor-pointer transition-all w-64 flex-shrink-0">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart 
            size={18} 
            className={product.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"} 
          />
        </button>
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-1">
            {product.images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
      <div className="pt-3 px-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 text-base leading-tight mb-0.5">{product.title}</h3>
          <div className="flex items-center text-sm">
            <Star size={14} className="fill-black text-black mr-0.5" />
            <span>{product.rating}</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-1">{product.location}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-900">${product.price.toFixed(2)}</p>
          <button 
            onClick={handleAddToCart}
            className="text-xs bg-indigo-50 text-indigo-600 px-3 py-2 rounded-full hover:bg-indigo-100 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductCards = () => {
  const [productList, setProductList] = useState<Product[]>(products);

  const handleFavoriteToggle = (productId: number) => {
    setProductList(prev => 
      prev.map(product => 
        product.id === productId 
          ? { ...product, isFavorite: !product.isFavorite }
          : product
      )
    );
  };

  const handleAddToCart = (productId: number) => {
    const product = productList.find(p => p.id === productId);
    if (product) {
      console.log(`Added ${product.title} to cart!`);
      // You can add your cart logic here
    }
  };

  return (
    <section className="px-2 sm:px-4 md:mx-24 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Products</h2>
      
      <div className="flex gap-8 md:flex-wrap overflow-x-auto no-scrollbar">
        {productList.map((product) => (
          <div key={product.id} className="cursor-pointer"> 
            <ProductCard 
              product={product} 
              onFavoriteToggle={handleFavoriteToggle}
              onAddToCart={handleAddToCart}
            /> 
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;