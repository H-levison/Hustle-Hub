import React, { useState } from "react";
import { Heart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop"
    ],
    title: "Nike Air Max 270",
    location: "Nike",
    price: 150,
    rating: 4.8,
    reviews: 234,
    isFavorite: false,
    description: "Comfortable running shoes with air cushioning.",
    details: "Mesh upper, rubber sole, available in multiple colors."
  },
  {
    id: 2,
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop"
    ],
    title: "Wireless Headphones",
    location: "Sony",
    price: 299,
    rating: 4.9,
    reviews: 156,
    isFavorite: true,
    description: "Premium noise-cancelling wireless headphones.",
    details: "30-hour battery, Bluetooth 5.0, fast charging."
  },
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?w=400&h=300&fit=crop"
    ],
    title: "Vintage Watch",
    location: "Rolex",
    price: 2500,
    rating: 4.7,
    reviews: 89,
    isFavorite: false,
    description: "Classic luxury timepiece with automatic movement.",
    details: "Stainless steel case, leather strap, water resistant."
  },
  {
    id: 4,
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop"
    ],
    title: "Leather Handbag",
    location: "Gucci",
    price: 850,
    rating: 4.6,
    reviews: 312,
    isFavorite: false,
    description: "Elegant leather handbag with gold hardware.",
    details: "Genuine leather, multiple compartments, adjustable strap."
  },
  {
    id: 5,
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1572635196243-4dd75fbdbd7f?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1509048191080-d2ce53ce44e1?w=400&h=300&fit=crop"
    ],
    title: "Skincare Set",
    location: "Clinique",
    price: 120,
    rating: 4.5,
    reviews: 67,
    isFavorite: true,
    description: "Complete skincare routine with cleanser and moisturizer.",
    details: "Dermatologist tested, suitable for all skin types."
  },
  {
    id: 6,
    images: [
      "https://images.unsplash.com/photo-1611078987707-cfa0995f8ea8?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&h=300&fit=crop"
    ],
    title: "Bluetooth Speaker",
    location: "JBL",
    price: 80,
    rating: 4.8,
    reviews: 198,
    isFavorite: false,
    description: "Portable speaker with deep bass and long battery life.",
    details: "Waterproof, 12-hour battery, wireless connectivity."
  }
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
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFavoriteToggle(product.id);
  };

  return (
    <div className="bg-transparent rounded-2xl w-64 h-80 flex-shrink-0">
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 w-full h-48">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl"
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
            {product.images.map((_: string, index: number) => (
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
      <div className="pt-3 px-1 pb-1">
        <h3 className="font-semibold text-gray-900 text-base leading-tight mb-0.5">{product.title}</h3>
        <div className="text-gray-700 text-sm mb-0.5">
          ${product.price} · 
          <span className="inline-flex items-center">
            <Star size={14} className="fill-black text-black mr-0.5" /> {product.rating}
          </span>
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

  return (
    <section className="w-full flex justify-center py-8">
      <div className="w-full     px-4">
        <div className="flex gap-8 px-10 md:flex-wrap overflow-x-auto scrollbar-hide">
          {productList.map((product) => (
            <div key={product.id} className="cursor-pointer"> 
              <ProductCard 
                product={product} 
                onFavoriteToggle={handleFavoriteToggle}
              /> 
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCards;