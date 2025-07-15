import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Plus, X, Trash2, Package, Tag, Award, Image } from 'lucide-react';

const VendorShop = () => {
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'loyalty'>('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [products, setProducts] = useState([
    { id: 1, name: 'Premium Coffee', price: 15000, category: 'Beverages', stock: 50, description: 'Rich, aromatic blend from Ethiopian highlands', image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop', colors: ['Brown', 'Dark Roast'], sizes: ['250g', '500g', '1kg'] },
    { id: 2, name: 'Artisan Bread', price: 3000, category: 'Bakery', stock: 25, description: 'Freshly baked sourdough with crispy crust', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=300&fit=crop', colors: ['Golden', 'Whole Wheat'], sizes: ['Small', 'Medium', 'Large'] }
  ]);
  const [categories, setCategories] = useState([
    { id: 1, name: 'Beverages', count: 1 },
    { id: 2, name: 'Bakery', count: 1 }
  ]);
  const [loyaltyCards, setLoyaltyCards] = useState([
    { id: 1, tier: 'Bronze', discount: 5, minSpend: 10000, color: 'bg-amber-600' },
    { id: 2, tier: 'Silver', discount: 10, minSpend: 50000, color: 'bg-gray-500' },
    { id: 3, tier: 'Gold', discount: 15, minSpend: 100000, color: 'bg-yellow-500' }
  ]);

  // Add Product form state
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    category: '',
    image: '',
    colors: [] as string[],
    sizes: [] as string[],
    colorInput: '',
    sizeInput: ''
  });

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.category || !newProduct.image) return;
    setProducts(prev => [
      ...prev,
      {
        id: Date.now(),
        name: newProduct.name,
        description: newProduct.description,
        category: newProduct.category,
        image: newProduct.image,
        colors: newProduct.colors,
        sizes: newProduct.sizes,
        price: 0,
        stock: 0
      }
    ]);
    setShowAddProduct(false);
    setNewProduct({ name: '', description: '', category: '', image: '', colors: [], sizes: [], colorInput: '', sizeInput: '' });
  };

  const addColor = () => {
    if (newProduct.colorInput.trim()) {
      setNewProduct(prev => ({
        ...prev,
        colors: [...prev.colors, prev.colorInput.trim()],
        colorInput: ''
      }));
    }
  };
  const removeColor = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index)
    }));
  };
  const addSize = () => {
    if (newProduct.sizeInput.trim()) {
      setNewProduct(prev => ({
        ...prev,
        sizes: [...prev.sizes, prev.sizeInput.trim()],
        sizeInput: ''
      }));
    }
  };
  const removeSize = (index: number) => {
    setNewProduct(prev => ({
      ...prev,
      sizes: prev.sizes.filter((_, i) => i !== index)
    }));
  };

  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'loyalty', label: 'Loyalty Cards', icon: Award }
  ];

  const [showAddTier, setShowAddTier] = useState(false);
  const [newTier, setNewTier] = useState({ tier: '', discount: '', minSpend: '' });

  const handleAddTier = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTier.tier || !newTier.discount || !newTier.minSpend) return;
    const colors = ['bg-purple-600', 'bg-indigo-600', 'bg-green-600', 'bg-red-600', 'bg-yellow-500', 'bg-amber-600', 'bg-gray-500'];
    setLoyaltyCards(prev => [
      ...prev,
      {
        id: Date.now(),
        tier: newTier.tier,
        discount: parseInt(newTier.discount),
        minSpend: parseInt(newTier.minSpend),
        color: colors[Math.floor(Math.random() * colors.length)]
      }
    ]);
    setShowAddTier(false);
    setNewTier({ tier: '', discount: '', minSpend: '' });
  };

  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    setCategories(prev => [
      ...prev,
      { id: Date.now(), name: newCategory.trim(), count: 0 }
    ]);
    setShowAddCategory(false);
    setNewCategory('');
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
          {/* Tabs */}
          <div className="flex border-b border-slate-200 mb-6 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-3 font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-b-2 border-blue-600 text-blue-600'
                      : 'text-slate-500 hover:text-blue-700'
                  }`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Products Tab */}
          {activeTab === 'products' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Products</h2>
                <button onClick={() => setShowAddProduct(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus size={18} /> Add Product
                </button>
              </div>
              {/* Product list placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map(product => (
                  <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden">
                    <div className="aspect-video bg-blue-100 relative">
                      {product.image ? (
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <Image size={48} />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-slate-800">{product.name}</h3>
                        <button className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-slate-600 text-sm mb-2">{product.description}</p>
                      <div className="flex flex-wrap gap-1 mb-2">
                        <span className="text-xs bg-blue-100 text-slate-600 px-2 py-1 rounded">{product.category}</span>
                        <span className="text-xs bg-blue-100 text-slate-600 px-2 py-1 rounded">{product.stock} in stock</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-2">
                        {product.colors.map((color, i) => (
                          <span key={i} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{color}</span>
                        ))}
                        {product.sizes.map((size, i) => (
                          <span key={i} className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{size}</span>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-slate-800">{product.price.toLocaleString()} FCFA</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Product Modal */}
              {showAddProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
                    <button onClick={() => setShowAddProduct(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
                      <X size={24} />
                    </button>
                    <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Product Title"
                        className="w-full border p-2 rounded"
                        value={newProduct.name}
                        onChange={e => setNewProduct({ ...newProduct, name: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        className="w-full border p-2 rounded"
                        value={newProduct.image}
                        onChange={e => setNewProduct({ ...newProduct, image: e.target.value })}
                        required
                      />
                      <textarea
                        placeholder="Description"
                        className="w-full border p-2 rounded"
                        value={newProduct.description}
                        onChange={e => setNewProduct({ ...newProduct, description: e.target.value })}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Category"
                        className="w-full border p-2 rounded"
                        value={newProduct.category}
                        onChange={e => setNewProduct({ ...newProduct, category: e.target.value })}
                        required
                      />
                      {/* Color Variations */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Color Variations</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Add color"
                            className="flex-1 border p-2 rounded"
                            value={newProduct.colorInput}
                            onChange={e => setNewProduct({ ...newProduct, colorInput: e.target.value })}
                          />
                          <button type="button" onClick={addColor} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newProduct.colors.map((color, i) => (
                            <span key={i} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                              {color}
                              <button type="button" onClick={() => removeColor(i)} className="text-red-500 hover:text-red-700"><X size={14} /></button>
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Size Variations */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Size Variations</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Add size"
                            className="flex-1 border p-2 rounded"
                            value={newProduct.sizeInput}
                            onChange={e => setNewProduct({ ...newProduct, sizeInput: e.target.value })}
                          />
                          <button type="button" onClick={addSize} className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700">Add</button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newProduct.sizes.map((size, i) => (
                            <span key={i} className="bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                              {size}
                              <button type="button" onClick={() => removeSize(i)} className="text-red-500 hover:text-red-700"><X size={14} /></button>
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddProduct(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Product</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <button onClick={() => setShowAddCategory(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus size={18} /> Add Category
                </button>
              </div>
              {/* Category list placeholder */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map(category => (
                  <div key={category.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                    <div>
                      <h3 className="font-medium text-slate-800">{category.name}</h3>
                      <p className="text-slate-600 text-sm">{category.count} products</p>
                    </div>
                    <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
              {/* Add Category Modal */}
              {showAddCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                    <button onClick={() => setShowAddCategory(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
                      <X size={24} />
                    </button>
                    <h3 className="text-xl font-semibold mb-4">Add Category</h3>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Category Name"
                        className="w-full border p-2 rounded"
                        value={newCategory}
                        onChange={e => setNewCategory(e.target.value)}
                        required
                      />
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddCategory(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Category</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Loyalty Cards Tab */}
          {activeTab === 'loyalty' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Loyalty Card Tiers</h2>
                <button onClick={() => setShowAddTier(true)} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                  <Plus size={18} /> Add Tier
                </button>
              </div>
              {/* Loyalty card list placeholder */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {loyaltyCards.map(card => (
                  <div key={card.id} className="bg-white p-6 rounded-lg shadow-sm border">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`${card.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {card.tier}
                      </div>
                      <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-slate-600">Discount</p>
                        <p className="font-semibold text-slate-800">{card.discount}%</p>
                      </div>
                      <div>
                        <p className="text-slate-600">Minimum Spend</p>
                        <p className="font-semibold text-slate-800">{card.minSpend.toLocaleString()} FCFA</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* Add Tier Modal */}
              {showAddTier && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                    <button onClick={() => setShowAddTier(false)} className="absolute top-3 right-3 text-gray-400 hover:text-gray-700">
                      <X size={24} />
                    </button>
                    <h3 className="text-xl font-semibold mb-4">Add Loyalty Tier</h3>
                    <form onSubmit={handleAddTier} className="space-y-4">
                      <input
                        type="text"
                        placeholder="Tier Name (e.g. Gold, Silver)"
                        className="w-full border p-2 rounded"
                        value={newTier.tier}
                        onChange={e => setNewTier({ ...newTier, tier: e.target.value })}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Discount (%)"
                        className="w-full border p-2 rounded"
                        value={newTier.discount}
                        onChange={e => setNewTier({ ...newTier, discount: e.target.value })}
                        required
                      />
                      <input
                        type="number"
                        placeholder="Minimum Spend (FCFA)"
                        className="w-full border p-2 rounded"
                        value={newTier.minSpend}
                        onChange={e => setNewTier({ ...newTier, minSpend: e.target.value })}
                        required
                      />
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setShowAddTier(false)} className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300">Cancel</button>
                        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Tier</button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VendorShop; 