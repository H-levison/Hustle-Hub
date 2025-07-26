import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, Share2, MessageCircle, ShoppingBag, User, Truck, Shield, RotateCcw, CheckCircle } from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { useCart } from '../CartContext';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

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
  category?: string;
  business?: string;
}

const getVendorIdByProductId = (productId: string) => {
  // This function can be updated to get vendor ID from the product data
  return 1; // Default vendor ID
};

const Product = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('Description');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, cart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await fetch(`${API_BASE}/products/${id}`);
        if (response.ok) {
          const productData = await response.json();
          
          // Get category name
          try {
            const categoryResponse = await fetch(`${API_BASE}/categories/${productData.category_id}`);
            if (categoryResponse.ok) {
              const category = await categoryResponse.json();
              productData.category = category.name;
            }
          } catch (err) {
            productData.category = 'Uncategorized';
          }

          // Get business name
          try {
            const businessResponse = await fetch(`${API_BASE}/businesses/${productData.business_id}`);
            if (businessResponse.ok) {
              const business = await businessResponse.json();
              productData.business = business.name;
            }
          } catch (err) {
            productData.business = 'Unknown Store';
          }

          setProduct(productData);
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const tabs = ['Description', 'Styling Ideas', 'Reviews', 'Best Seller'];

  const handleAddToCart = () => {
    if (!product) return;
    
    const vendorId = getVendorIdByProductId(product.id);
    if (cart.length > 0 && cart[0].vendorId !== vendorId) {
      if (!window.confirm('Your cart contains items from another vendor. Adding this product will clear your cart. Continue?')) {
        return;
      }
    }
    addToCart({
      id: product.id,
      title: product.name,
      price: product.price,
      image: product.image,
      color: selectedColor,
      size: selectedSize,
      quantity,
      vendorId,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-red-600">{error || 'Product not found'}</p>
          <button 
            onClick={() => window.history.back()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Create images array from single image
  const images = [product.image || "https://via.placeholder.com/400x400?text=Product+Image"];

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
                {images.map((img, idx) => (
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
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Product+Image';
                      }}
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}
              <div className="flex-1">
                <div className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                  <img
                    src={images[selectedImage]}
                    alt={product.name}
                    className="w-full aspect-square object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x400?text=Product+Image';
                    }}
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
          <div className="order-1 xl:order-2 flex-1 max-w-xl">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="mb-4">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>4.8</span>
                    <span className="ml-1">(188 reviews)</span>
                  </div>
                  <span>•</span>
                  <span>{product.business}</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-gray-900">RWF {product.price.toLocaleString()}</span>
                  <span className="text-lg text-gray-500 line-through">RWF {(product.price * 1.25).toLocaleString()}</span>
                  <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">25% OFF</span>
                </div>
              </div>

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">Size</h3>
                  <div className="flex gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                          selectedSize === size
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-200 text-gray-700 hover:border-gray-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500">({product.stock} available)</span>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors mb-4"
              >
                Add to Cart - RWF {(product.price * quantity).toLocaleString()}
              </button>

              {/* Features */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-gray-400" />
                  <span>Free shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gray-400" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-gray-400" />
                  <span>Easy returns</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gray-400" />
                  <span>Quality guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-12">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>
            <div className="p-6">
              {activeTab === 'Description' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>
              )}
              {activeTab === 'Styling Ideas' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Styling Ideas</h3>
                  <p className="text-gray-600">Styling suggestions and ideas for this product will be displayed here.</p>
                </div>
              )}
              {activeTab === 'Reviews' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Customer Reviews</h3>
                  <p className="text-gray-600">Customer reviews and ratings will be displayed here.</p>
                </div>
              )}
              {activeTab === 'Best Seller' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Best Seller</h3>
                  <p className="text-gray-600">Best selling products and recommendations will be displayed here.</p>
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