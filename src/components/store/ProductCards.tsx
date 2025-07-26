import React, { useState, useEffect } from "react";
import { Heart, Star } from "lucide-react";
import { Link } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category_id: string;
  business_id: string;
  vendor_id: string;
  stock: number;
  colors: string[];
  sizes: string[];
  category?: string; // Added category name
}

interface ProductCardProps {
  product: Product;
  onFavoriteToggle: (productId: string) => void;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onFavoriteToggle, onAddToCart }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
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
            src={product.image || "https://via.placeholder.com/400x400?text=Product+Image"}
            alt={product.name}
            className="w-full h-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Product+Image';
            }}
          />
        </div>
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors"
        >
          <Heart 
            size={18} 
            className={isFavorite ? "fill-red-500 text-red-500" : "text-gray-600 hover:text-red-500"} 
          />
        </button>
      </div>
      <div className="pt-3 px-1">
        <div className="flex justify-between items-start">
          <h3 className="font-semibold text-gray-900 text-base leading-tight mb-0.5 line-clamp-2">{product.name}</h3>
          <div className="flex items-center text-sm">
            <Star size={14} className="fill-black text-black mr-0.5" />
            <span>4.5</span>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-1 line-clamp-1">{product.category || 'Uncategorized'}</p>
        <div className="flex justify-between items-center">
          <p className="font-semibold text-gray-900">RWF{product.price.toLocaleString()}</p>
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
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/products');
        if (response.ok) {
          const data = await response.json();
          
          // Get category names for products
          const productsWithCategories = await Promise.all(
            data.slice(0, 8).map(async (product: Product) => {
              try {
                const categoryResponse = await fetch(`http://localhost:5000/categories/${product.category_id}`);
                if (categoryResponse.ok) {
                  const category = await categoryResponse.json();
                  return {
                    ...product,
                    category: category.name
                  };
                }
                return {
                  ...product,
                  category: 'Uncategorized'
                };
              } catch (err) {
                return {
                  ...product,
                  category: 'Uncategorized'
                };
              }
            })
          );
          
          setProducts(productsWithCategories);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleFavoriteToggle = (productId: string) => {
    console.log(`Toggled favorite for product ${productId}`);
    // You can implement favorite logic here
  };

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      console.log(`Added ${product.name} to cart!`);
      // You can add your cart logic here
    }
  };

  if (loading) {
    return (
      <section className="px-2 sm:px-4 md:mx-24 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Products</h2>
        <div className="flex gap-8 md:flex-wrap overflow-x-auto no-scrollbar">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="w-64 flex-shrink-0">
              <div className="aspect-square bg-gray-200 rounded-xl animate-pulse" />
              <div className="pt-3 px-1">
                <div className="h-4 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded mb-2 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="px-2 sm:px-4 md:mx-24 py-6 sm:py-8">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Products</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">No products available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-2 sm:px-4 md:mx-24 py-6 sm:py-8">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Featured Products</h2>
      
      <div className="flex gap-8 md:flex-wrap overflow-x-auto no-scrollbar">
        {products.map((product) => (
          <Link key={product.id} to={`/product/${product.id}`} className="cursor-pointer"> 
            <ProductCard 
              product={product} 
              onFavoriteToggle={handleFavoriteToggle}
              onAddToCart={handleAddToCart}
            /> 
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProductCards;