import React, { useState } from "react";
import { Heart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop"
    ],
    title: "Modern Apartment in Downtown",
    location: "New York, NY",
    price: 120,
    rating: 4.8,
    reviews: 234,
    isFavorite: false
  },
  {
    id: 2,
    images: [
      "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4a0?w=400&h=300&fit=crop"
    ],
    title: "Cozy Beach House",
    location: "Miami, FL",
    price: 85,
    rating: 4.9,
    reviews: 156,
    isFavorite: true
  },
  {
    id: 3,
    images: [
      "https://images.unsplash.com/photo-1549517045-bc93de075e53?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop"
    ],
    title: "Mountain Cabin Retreat",
    location: "Aspen, CO",
    price: 200,
    rating: 4.7,
    reviews: 89,
    isFavorite: false
  },
  {
    id: 4,
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    ],
    title: "Luxury Villa with Pool",
    location: "Los Angeles, CA",
    price: 350,
    rating: 4.6,
    reviews: 312,
    isFavorite: false
  },
  {
    id: 5,
    images: [
      "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=400&h=300&fit=crop"
    ],
    title: "Historic Townhouse",
    location: "Boston, MA",
    price: 95,
    rating: 4.5,
    reviews: 67,
    isFavorite: true
  },
  {
    id: 6,
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=400&h=300&fit=crop"
    ],
    title: "Lakefront Lodge",
    location: "Seattle, WA",
    price: 140,
    rating: 4.8,
    reviews: 198,
    isFavorite: false
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
};

interface ProductCardProps {
  product: Product;
  onFavoriteToggle: (productId: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onFavoriteToggle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onFavoriteToggle(product.id);
  };

  return (
    <div className="bg-transparent rounded-2xl w-42 md:w-60">
      {/* Image Section */}
      <div className="relative">
        <div className="aspect-square overflow-hidden rounded-xl bg-gray-100">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        {/* Favorite Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart 
            size={18} 
            className={product.isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"} 
          />
        </button>
        {/* Image Indicators */}
        {product.images.length > 1 && (
          <div className="absolute bottom-3 left-1/2  transform -translate-x-1/2 flex gap-1">
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
      {/* Content Section */}
      <div className="pt-3 px-1 pb-1">
        <h3 className="font-semibold text-gray-900 text-base leading-tight truncate mb-0.5">{product.title}</h3>
        <div className="text-gray-700 text-sm mb-0.5">${product.price} for 2 nights · <span className="inline-flex items-center"><Star size={14} className="fill-black text-black mr-0.5" /> {product.rating}</span></div>
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
    <div className="w-full mx-24">
      <div className=" px-4"> 
        
        <div className="grid grid-cols-5 gap-2 ">
          {productList.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onFavoriteToggle={handleFavoriteToggle}
            />
          ))}
        </div>
      </div>
    </div>

    </section>
  );
};

export default ProductCards;