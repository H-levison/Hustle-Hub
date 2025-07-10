import React, { useState } from 'react';
import { Star, Heart, Share2, MessageCircle, ShoppingBag, User } from 'lucide-react';
import { Navigation } from '../components/Navigation';

const Product = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedColor, setSelectedColor] = useState('Black');
  const [selectedSize, setSelectedSize] = useState('M');

  const product = {
    title: "This Ben Hogan Men's Solid Ottoman Golf Polo Shirt",
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
    ]
  };

  const tabs = ['Description', 'Styling Ideas', 'Review', 'Best Seller'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Navigation />
 

      <div className="container mx-auto px-6 py-4 mt-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Thumbnails */}
          <div className='flex w-full bg-red-500 h-12'>
          <div className="col-span-1 flex flex-col gap-2 bg-red-500">
            {product.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt=""
                className={`w-16 h-16 rounded-lg object-cover rounded cursor-pointer border-2 ${
                  selectedImage === idx ? 'border-blue-500' : 'border-gray-200'
                }`}
                onClick={() => setSelectedImage(idx)}
              />
            ))}
          </div>

          {/* Main Image */}
          <div className="col-span-5 ">
            <div className="relative">
              <img
                src={product.images[selectedImage]}
                alt={product.title}
                className="w-full aspect-square object-cover rounded-lg bg-white"
              />
              <button className="absolute bottom-4 right-4 bg-white rounded-full p-2 shadow-md">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="col-span-4 ">
            <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">{product.sold} Sold</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm font-semibold">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-600">{product.reviews} Reviews</span>
            </div>

            <div className="flex items-end gap-2 mb-6">
              <span className="text-3xl font-bold text-blue-600">Rwf{product.price.toLocaleString()}</span>
              <span className="text-sm text-gray-400 line-through">Rwf{product.originalPrice.toLocaleString()}</span>
              <span className="text-sm text-red-600 font-semibold">25% off</span>
            </div>

            {/* Colors */}
            <div className="mb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 bg-black rounded-full border-2 border-gray-300"></div>
                <div className="w-6 h-6 bg-gray-300 rounded-full border-2 border-gray-300"></div>
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">Select Size</span>
                <span className="text-sm text-blue-600">Size Guide</span>
              </div>
              <div className="grid grid-cols-6 gap-2">
                {['S', 'M', 'L', 'XL', '2XL', '3XL'].map((size) => (
                  <button
                    key={size}
                    className={`py-2 px-3 rounded border text-sm font-medium ${
                      selectedSize === size
                        ? 'bg-black text-white border-black'
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full bg-black text-white py-3 rounded-md font-semibold mb-4">
              Buy this Item
            </button>

            <button className="w-full border border-gray-300 py-3 rounded-md font-semibold mb-4">
              Add to cart
            </button>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 text-gray-600">
                <MessageCircle className="w-5 h-5" />
                Chat
              </button>
              <button className="flex items-center gap-2 text-gray-600">
                <Heart className="w-5 h-5" />
                Wishlist
              </button>
              <button className="flex items-center gap-2 text-gray-600">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>
          </div>

          {/* Seller Info */}
          {/* <div className="col-span-2">
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Barudak Disaster Mall</div>
                  <div className="text-xs text-green-600">Online</div>
                </div>
              </div>
              
              <div className="text-xs text-gray-600 mb-4 space-y-1">
                <div className="flex justify-between">
                  <span>Rating Store:</span>
                  <span className="font-semibold">96%</span>
                </div>
                <div className="flex justify-between">
                  <span>Location:</span>
                  <span className="font-semibold">Tulungagung</span>
                </div>
                <div className="flex justify-between">
                  <span>Chat Reply:</span>
                  <span className="font-semibold">98%</span>
                </div>
              </div>

              <button className="w-full bg-blue-600 text-white py-2 rounded-md mb-2">
                Follow
              </button>
              <button className="w-full border border-gray-300 py-2 rounded-md">
                Visit Store
              </button>
            </div>
          </div> */}
        </div>

        {/* Tabs Section */}
        <div className="mt-8">
          <div className="flex border-b">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`px-6 py-3 font-medium border-b-2 ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="bg-white rounded-b-lg p-6">
            {activeTab === 'Description' && (
              <div>
                <h2 className="font-bold text-lg mb-4">Product Details</h2>
                <p className="text-gray-700 mb-4">
                  This Ben Hogan Men's Solid Ottoman Golf Polo Shirt makes for versatile casual wear or golf apparel. Built-in moisture wicking and sun protection keep you feeling dry while blocking out harmful UV rays.
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div><strong>Package Dimensions:</strong> 27.3 x 24.8 x 4.9 cm; 180 g</div>
                  <div><strong>Specification:</strong> Moisture Wicking, Stretchy, SPF/UV Protection, Easy Care</div>
                  <div><strong>Date First Available:</strong> August 08, 2023</div>
                  <div><strong>Department:</strong> Mens</div>
                </div>
              </div>
            )}

            {activeTab === 'Styling Ideas' && (
              <div>
                <h2 className="font-bold text-lg mb-4">Styling Ideas</h2>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <div className="aspect-square bg-white rounded-lg mb-2"></div>
                      <div className="font-semibold">Styling Idea {i}</div>
                      <div className="text-sm text-gray-600">Rp{(220000 * i).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Review' && (
              <div>
                <h2 className="font-bold text-lg mb-4">Customer Reviews</h2>
                <div className="flex items-start gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-yellow-500">4.8</div>
                    <div className="text-sm text-gray-600">95% of buyers are satisfied</div>
                    <div className="text-sm text-gray-600">55 rating • 123 Reviews</div>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <div key={star} className="flex items-center gap-2 mb-1">
                        <span className="text-sm w-8">{star}</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full">
                          <div
                            className="h-2 bg-yellow-400 rounded-full"
                            style={{ width: `${star * 20}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{star * 20}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border-b pb-4">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <div className="font-semibold mb-1">Review Title {i}</div>
                      <div className="text-sm text-gray-600 mb-2">
                        Color: Black • Size: {i === 1 ? 'XL' : 'L'} • {12 + i} July 2023
                      </div>
                      <p className="text-gray-700 mb-2">
                        This is a sample review for the product. The shirt is comfortable and fits well.
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span>👍 {20 + i}</span>
                        <span>💬 0</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'Best Seller' && (
              <div>
                <h2 className="font-bold text-lg mb-4">Best Seller</h2>
                <div className="grid grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="bg-gray-50 rounded-lg p-4">
                      <div className="aspect-square bg-white rounded-lg mb-2"></div>
                      <div className="font-semibold">Best Seller {i}</div>
                      <div className="text-sm text-gray-600">Rp{(253000 * i).toLocaleString()}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;