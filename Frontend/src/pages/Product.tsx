import React, { useState } from 'react';
import { Star, Heart, Share2, MessageCircle, ShoppingBag, User, Truck, Shield, RotateCcw, CheckCircle } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { useCart } from '../CartContext';
import { featuredStores } from './Shop';

const getVendorIdByProductId = (productId: string) => {
  const id = parseInt(productId, 10);
  if (id >= 1 && id <= 4) return 1;
  if (id >= 5 && id <= 8) return 2;
  if (id >= 9 && id <= 12) return 3;
  if (id >= 13 && id <= 16) return 4;
  return 5;
};

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart();

  const product = {
    id: '1', // In a real app, this would come from route params or API
    title: "Ben Hogan Men's Solid Ottoman Golf Polo Shirt",
    price: 187500,
    originalPrice: 250000,
    rating: 4.8,
    reviews: 188,
    sold: "10K+",
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=400&h=400&fit=crop"
    ],
    colors: ['Black', 'White', 'Navy', 'Gray'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']
  };

  const tabs = ['Description', 'Styling Ideas', 'Reviews', 'Best Seller'];

  const discountPercentage = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = () => {
    const vendorId = getVendorIdByProductId(product.id);
    if (cart.length > 0 && cart[0].vendorId !== vendorId) {
      if (!window.confirm('Your cart contains items from another vendor. Adding this product will clear your cart. Continue?')) {
        return;
      }
    }
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[selectedImage],
      color: selectedColor,
      size: selectedSize,
      quantity,
      vendorId,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl">
         
        

        <div className=" ">
          <div className='flex gap-2  justify-around'>
            {/* Product Images Section */}
          <div className="order-2 xl:order-1">
            <div className="flex gap-4">
              {/* Thumbnails */}
              <div className="flex flex-col gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      selectedImage === idx 
                        ? 'border-blue-600 ring-2 ring-blue-100' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Product view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <div className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <img
                    src={product.images[selectedImage]}
                    alt={product.title}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors">
                      <Heart className="w-5 h-5 text-gray-600" />
                    </button>
                    <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors">
                      <Share2 className="w-5 h-5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Info Section */}
          <div className="order-1 xl:order-2">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              {/* Product Title */}
              <h1 className="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating and Reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-gray-700">{product.rating}</span>
                </div>
                <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                <span className="text-sm text-gray-500">• {product.sold} sold</span>
              </div>

              {/* Price Section */}
              <div className="mb-6">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-gray-900">
                    Rwf{product.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    Rwf{product.originalPrice.toLocaleString()}
                  </span>
                  <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                    {discountPercentage}% OFF
                  </span>
                </div>
                <p className="text-sm text-gray-600">Free shipping on orders over Rwf 50,000</p>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">Color: {selectedColor}</span>
                  <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">View all colors</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all ${
                        selectedColor === color
                          ? 'border-blue-600 ring-2 ring-blue-100'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                      style={{
                        backgroundColor: color.toLowerCase(),
                        ...(color === 'White' && { backgroundColor: '#ffffff', border: '1px solid #d1d5db' })
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-gray-900">Select Size</span>
                  <span className="text-sm text-blue-600 hover:text-blue-700 cursor-pointer">Size Guide</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded-lg border text-sm font-medium transition-all ${
                        selectedSize === size
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <span className="font-semibold text-gray-900 mb-3 block">Quantity</span>
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 mb-6">
                <button className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2" onClick={handleAddToCart}>
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="w-full bg-gray-900 text-white py-4 rounded-lg font-semibold hover:bg-gray-800 transition-colors">
                  Buy Now
                </button>
              </div>

              {/* Additional Actions */}
              <div className="flex gap-4 text-sm">
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  Chat with seller
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors">
                  <Heart className="w-4 h-4" />
                  Add to wishlist
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Free shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-gray-700">Secure payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-orange-600" />
                  <span className="text-gray-700">Easy returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-gray-700">Authentic product</span>
                </div>
              </div>
            </div>
          </div>

          </div>
          
        </div>

        {/* Tabs Section */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex border-b border-gray-200">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  className={`px-8 py-4 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="p-8">
              {activeTab === 'Description' && (
                <div className="space-y-6">
                  <h2 className="text-xl font-bold text-gray-900">Product Details</h2>
                  <p className="text-gray-700 leading-relaxed">
                    This Ben Hogan Men's Solid Ottoman Golf Polo Shirt makes for versatile casual wear or golf apparel. 
                    Built-in moisture wicking and sun protection keep you feeling dry while blocking out harmful UV rays.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Package Dimensions:</span>
                        <span className="font-medium">27.3 x 24.8 x 4.9 cm; 180 g</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Specification:</span>
                        <span className="font-medium">Moisture Wicking, Stretchy, SPF/UV Protection</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date First Available:</span>
                        <span className="font-medium">August 08, 2023</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Department:</span>
                        <span className="font-medium">Men's</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Styling Ideas' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Styling Ideas</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-3 group-hover:shadow-md transition-shadow"></div>
                        <div className="font-semibold text-gray-900">Styling Idea {i}</div>
                        <div className="text-sm text-gray-600">Rwf{(220000 * i).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Reviews' && (
                <div className="space-y-6">
                  <div className="flex items-start gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-yellow-500 mb-2">{product.rating}</div>
                      <div className="text-sm text-gray-600 mb-1">95% of buyers are satisfied</div>
                      <div className="text-sm text-gray-600">55 rating • 123 Reviews</div>
                    </div>
                    <div className="flex-1">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center gap-3 mb-2">
                          <span className="text-sm w-8 text-gray-600">{star}★</span>
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-2 bg-yellow-400 rounded-full"
                              style={{ width: `${star * 20}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-12">{star * 20}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <div className="font-semibold text-gray-900 mb-2">Excellent quality and fit!</div>
                        <div className="text-sm text-gray-600 mb-3">
                          Color: Black • Size: {i === 1 ? 'XL' : 'L'} • {12 + i} July 2023
                        </div>
                        <p className="text-gray-700 mb-3 leading-relaxed">
                          This is a sample review for the product. The shirt is comfortable and fits well. 
                          The material is high quality and the stitching is excellent. Highly recommend!
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">👍 {20 + i}</span>
                          <span className="flex items-center gap-1">💬 0</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'Best Seller' && (
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-6">Best Seller</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="group cursor-pointer">
                        <div className="aspect-square bg-gray-100 rounded-lg mb-3 group-hover:shadow-md transition-shadow"></div>
                        <div className="font-semibold text-gray-900">Best Seller {i}</div>
                        <div className="text-sm text-gray-600">Rwf{(253000 * i).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;