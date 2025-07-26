import React, { useState, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Plus, X, Trash2, Package, Tag, Award, Image, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  colors: string[];
  sizes: string[];
}

interface Category {
  id: string;
  name: string;
  count: number;
}

interface LoyaltyCard {
  id: string;
  tier: string;
  discount: number;
  minSpend: number;
  color: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const VendorShop = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for tabs and modals
  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'loyalty'>('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddTier, setShowAddTier] = useState(false);
  const [showEditStore, setShowEditStore] = useState(false);
  const [editStore, setEditStore] = useState({
    name: '',
    description: '',
    logo: '',
  });

  // Data state
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loyaltyCards, setLoyaltyCards] = useState<LoyaltyCard[]>([]);
  const [store, setStore] = useState<any>(null);

  // Form states
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
    colors: [] as string[],
    sizes: [] as string[],
    colorInput: '',
    sizeInput: ''
  });

  const [newCategory, setNewCategory] = useState('');
  const [newTier, setNewTier] = useState({
    tier: '',
    discount: '',
    minSpend: ''
  });

  // Fetch data functions
  const fetchProducts = async () => {
    const response = await fetch(`${API_BASE}/products/vendor`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    setProducts(data);
  };

  const fetchCategories = async () => {
    const response = await fetch(`${API_BASE}/categories`);
    const data = await response.json();
    setCategories(data);
  };

  const fetchLoyaltyCards = async () => {
    try {
      console.log('Fetching loyalty cards...');
      const response = await fetch(`${API_BASE}/loyalty-cards`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Loyalty cards fetch error:', errorText);
        return;
      }
      const data = await response.json();
      console.log('Loyalty cards fetched:', data);
      setLoyaltyCards(data);
    } catch (err) {
      console.error('Error fetching loyalty cards:', err);
    }
  };

  // Fetch the current vendor's store/business
  const fetchStore = async (userId: string, token: string) => {
    try {
      const res = await fetch(`${API_BASE}/businesses`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      console.log('All businesses:', data);
      console.log('Current user ID:', userId);
      // Find the business owned by the current user
      const myStore = data.find((b: any) => b.owner_id === userId || b.owner_id === Number(userId));
      console.log('Found store:', myStore);
      setStore(myStore || null);
    } catch (err) {
      console.error('Error fetching store:', err);
      setStore(null);
    }
  };

  // Product handlers
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      // Map category name to id
      const selectedCategory = categories.find(cat => cat.name === newProduct.category);
      console.log('Store state:', store);
      console.log('Selected category:', selectedCategory);
      
      if (!selectedCategory) {
        setError('Please select a valid category.');
        return;
      }
      
      if (!store) {
        setError('Store not loaded. Please refresh the page.');
        return;
      }
      
      if (!store.id) {
        setError('Store ID not found. Please ensure you have a registered business.');
        return;
      }
      
      const payload = {
        name: newProduct.name,
        description: newProduct.description,
        price: newProduct.price,
        category_id: selectedCategory.id,
        business_id: store.id, // Use 'id' instead of '_id'
        image: newProduct.image,
        stock: newProduct.stock,
        colors: newProduct.colors,
        sizes: newProduct.sizes
      };
      console.log('Product payload:', payload);
      const response = await fetch(`${API_BASE}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Backend error:', errorText);
        throw new Error('Failed to create product');
      }
      const { product } = await response.json();
      setProducts(prev => [...prev, {
        ...product,
        category: selectedCategory.name
      }]);
      setShowAddProduct(false);
      resetProductForm();
    } catch (err) {
      setError('Failed to add product. Please try again.');
      console.error(err);
    }
  };

  const resetProductForm = () => {
    setNewProduct({
      name: '',
      description: '',
      price: 0,
      category: '',
      image: '',
      stock: 0,
      colors: [],
      sizes: [],
      colorInput: '',
      sizeInput: ''
    });
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      console.log('Deleting product:', productId);
      const response = await fetch(`${API_BASE}/products/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Delete error:', errorText);
        throw new Error('Failed to delete product');
      }

      console.log('Product deleted successfully');
      setProducts(prev => prev.filter(p => p.id !== productId));
    } catch (err) {
      setError('Failed to delete product. Please try again.');
      console.error(err);
    }
  };

  // Category handlers
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newCategory.trim() })
      });

      if (!response.ok) {
        throw new Error('Failed to create category');
      }

      const createdCategory = await response.json();
      setCategories(prev => [...prev, createdCategory]);
      setShowAddCategory(false);
      setNewCategory('');
    } catch (err) {
      setError('Failed to add category. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      const response = await fetch(`${API_BASE}/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete category');
      }

      setCategories(prev => prev.filter(c => c.id !== categoryId));
    } catch (err) {
      setError('Failed to delete category. Please try again.');
      console.error(err);
    }
  };

  // Loyalty card handlers
  const handleAddTier = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      if (!store || !store.id) {
        setError('Store not loaded. Please ensure you have a registered business.');
        return;
      }
      
      const payload = {
        tier: newTier.tier,
        discount: parseInt(newTier.discount),
        minSpend: parseInt(newTier.minSpend),
        color: 'bg-blue-500', // or allow user to pick
        business_id: store.id // Use 'id' instead of '_id'
      };
      
      console.log('Adding loyalty tier with payload:', payload);
      
      const response = await fetch(`${API_BASE}/loyalty-cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Loyalty tier creation error:', errorText);
        throw new Error('Failed to create loyalty tier');
      }

      const createdTier = await response.json();
      console.log('Loyalty tier created:', createdTier);
      setLoyaltyCards(prev => [...prev, createdTier]);
      setShowAddTier(false);
      setNewTier({ tier: '', discount: '', minSpend: '' });
    } catch (err) {
      setError('Failed to add loyalty tier. Please try again.');
      console.error(err);
    }
  };

  const handleDeleteTier = async (tierId: string) => {
    try {
      console.log('Deleting loyalty tier:', tierId);
      const response = await fetch(`${API_BASE}/loyalty-cards/${tierId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Loyalty tier deletion error:', errorText);
        throw new Error('Failed to delete loyalty tier');
      }

      console.log('Loyalty tier deleted successfully');
      setLoyaltyCards(prev => prev.filter(t => t.id !== tierId));
    } catch (err) {
      setError('Failed to delete loyalty tier. Please try again.');
      console.error(err);
    }
  };

  // Variation handlers
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

  // Tab configuration
  const tabs = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'loyalty', label: 'Loyalty Cards', icon: Award }
  ];

  useEffect(() => {
    const checkAuth = async () => {
      const user = JSON.parse(localStorage.getItem('user') || 'null');
      const token = localStorage.getItem('token');
      
      if (!user || !user.is_provider || !token) {
        navigate('/');
        return;
      }

      try {
        // Fetch initial data
        await Promise.all([
          fetchProducts(),
          fetchCategories(),
          fetchLoyaltyCards(),
          fetchStore(user.id, token)
        ]);
      } catch (err) {
        setError('Failed to load data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading vendor dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <h1 className="text-3xl font-bold mb-6">Vendor Dashboard</h1>
          
          {/* Store Info */}
          {store && (
  <div className="relative flex flex-col md:flex-row items-center gap-6 bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100">
    {/* Edit Icon */}
    <button
      className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-blue-600 transition-colors"
      onClick={() => {
        setEditStore({
          name: store.name || '',
          description: store.description || '',
          logo: store.logo || '',
        });
        setShowEditStore(true);
      }}
      aria-label="Edit store"
    >
      <Pencil size={18} />
    </button>
    {/* Store Image */}
    <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden bg-gray-100 border">
      <img
        src={store.logo || "https://via.placeholder.com/150x150?text=Store+Logo"}
        alt={store.name}
        className="w-full h-full object-cover"
      />
    </div>
    {/* Store Info */}
    <div className="flex-1 min-w-0">
      <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1">{store.name}</h2>
      <p className="text-gray-600 mb-2">{store.description}</p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700 mb-2">
        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full font-medium">
          {categories.find((cat) => cat.id === String(store.category_id))?.name || "Category"}
        </span>
        <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium">
          WhatsApp: {store.whatsapp}
        </span>
      </div>
    </div>
    {/* Edit Store Modal */}
    {showEditStore && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
          <button
            onClick={() => setShowEditStore(false)}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>
          <h3 className="text-xl font-semibold mb-4">Edit Store Info</h3>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              try {
                const response = await fetch(`${API_BASE}/businesses/${store.id}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  body: JSON.stringify({
                    name: editStore.name,
                    description: editStore.description,
                    logo: editStore.logo,
                  })
                });
                if (!response.ok) {
                  throw new Error('Failed to update store');
                }
                setShowEditStore(false);
                // Refetch store info
                await fetchStore(localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!).id : '', localStorage.getItem('token')!);
              } catch (err) {
                alert('Failed to update store.');
              }
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">Store Name</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={editStore.name}
                onChange={e => setEditStore({ ...editStore, name: e.target.value })}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full border p-2 rounded"
                value={editStore.description}
                onChange={e => setEditStore({ ...editStore, description: e.target.value })}
                rows={3}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Logo Image URL</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                value={editStore.logo}
                onChange={e => setEditStore({ ...editStore, logo: e.target.value })}
                placeholder="https://example.com/logo.png"
              />
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button
                type="button"
                onClick={() => setShowEditStore(false)}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)}

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
                <h2 className="text-xl font-semibold">Your Products ({products.length})</h2>
                <button 
                  onClick={() => setShowAddProduct(true)} 
                  disabled={!store}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    store 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Plus size={18} /> Add Product
                </button>
              </div>
              
              {/* Show message if no store */}
              {!store && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                  <p className="text-yellow-800">
                    <strong>No business found.</strong> You need to register a business before you can add products. 
                    Please contact support or create a business account.
                  </p>
                </div>
              )}
              
              {/* Product list */}
              {products.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                  <Package size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No products yet</h3>
                  <p className="text-gray-500 mt-2">
                    {store ? 'Add your first product to start selling' : 'Register a business to start adding products'}
                  </p>
                  {store && (
                    <button 
                      onClick={() => setShowAddProduct(true)} 
                      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Add Product
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {products.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                      <div className="aspect-video bg-gray-100 relative">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <Image size={48} />
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-medium text-slate-800">{product.name}</h3>
                          <button 
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            aria-label="Delete product"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="text-slate-600 text-sm mb-2 line-clamp-2">{product.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {product.category}
                          </span>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            {product.stock} in stock
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {product.colors.map((color, i) => (
                            <span key={i} className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              {color}
                            </span>
                          ))}
                          {product.sizes.map((size, i) => (
                            <span key={i} className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                              {size}
                            </span>
                          ))}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-slate-800">{product.price.toLocaleString()} RWF</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Product Modal */}
              {showAddProduct && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
                    <button 
                      onClick={() => setShowAddProduct(false)} 
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                      aria-label="Close modal"
                    >
                      <X size={24} />
                    </button>
                    <h3 className="text-xl font-semibold mb-4">Add New Product</h3>
                    <form onSubmit={handleAddProduct} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Product Name*</label>
                        <input
                          type="text"
                          placeholder="Premium Coffee"
                          className="w-full border p-2 rounded"
                          value={newProduct.name}
                          onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Description*</label>
                        <textarea
                          placeholder="Rich, aromatic blend from Ethiopian highlands"
                          className="w-full border p-2 rounded"
                          value={newProduct.description}
                          onChange={e => setNewProduct({...newProduct, description: e.target.value})}
                          required
                          rows={3}
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Price (RWF)*</label>
                          <input
                            type="number"
                            placeholder="15000"
                            className="w-full border p-2 rounded"
                            value={newProduct.price || ''}
                            onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value) || 0})}
                            required
                            min="0"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1">Stock Quantity*</label>
                          <input
                            type="number"
                            placeholder="50"
                            className="w-full border p-2 rounded"
                            value={newProduct.stock || ''}
                            onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value) || 0})}
                            required
                            min="0"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Category*</label>
                        <select
                          className="w-full border p-2 rounded"
                          value={newProduct.category}
                          onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                          required
                        >
                          <option value="">Select a category</option>
                          {categories.map(category => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Image URL*</label>
                        <input
                          type="text"
                          placeholder="https://example.com/image.jpg"
                          className="w-full border p-2 rounded"
                          value={newProduct.image}
                          onChange={e => setNewProduct({...newProduct, image: e.target.value})}
                          required
                        />
                      </div>
                      
                      {/* Color Variations */}
                      <div>
                        <label className="block text-sm font-medium mb-1">Color Variations</label>
                        <div className="flex gap-2 mb-2">
                          <input
                            type="text"
                            placeholder="Add color (e.g. Red)"
                            className="flex-1 border p-2 rounded"
                            value={newProduct.colorInput}
                            onChange={e => setNewProduct({...newProduct, colorInput: e.target.value})}
                          />
                          <button 
                            type="button" 
                            onClick={addColor}
                            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newProduct.colors.map((color, i) => (
                            <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full flex items-center gap-1">
                              {color}
                              <button 
                                type="button" 
                                onClick={() => removeColor(i)}
                                className="text-red-500 hover:text-red-700"
                                aria-label={`Remove ${color}`}
                              >
                                <X size={14} />
                              </button>
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
                            placeholder="Add size (e.g. Large)"
                            className="flex-1 border p-2 rounded"
                            value={newProduct.sizeInput}
                            onChange={e => setNewProduct({...newProduct, sizeInput: e.target.value})}
                          />
                          <button 
                            type="button" 
                            onClick={addSize}
                            className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                          >
                            Add
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {newProduct.sizes.map((size, i) => (
                            <span key={i} className="bg-green-100 text-green-800 px-2 py-1 rounded-full flex items-center gap-1">
                              {size}
                              <button 
                                type="button" 
                                onClick={() => removeSize(i)}
                                className="text-red-500 hover:text-red-700"
                                aria-label={`Remove ${size}`}
                              >
                                <X size={14} />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex justify-end gap-2 pt-4">
                        <button 
                          type="button" 
                          onClick={() => setShowAddProduct(false)}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Add Product
                        </button>
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
                <h2 className="text-xl font-semibold">Product Categories ({categories.length})</h2>
                <button 
                  onClick={() => setShowAddCategory(true)} 
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={18} /> Add Category
                </button>
              </div>
              
              {/* Category list */}
              {categories.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                  <Tag size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No categories yet</h3>
                  <p className="text-gray-500 mt-2">Add categories to organize your products</p>
                  <button 
                    onClick={() => setShowAddCategory(true)} 
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Category
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map(category => (
                    <div key={category.id} className="bg-white p-4 rounded-lg shadow-sm border flex justify-between items-center">
                      <div>
                        <h3 className="font-medium text-slate-800">{category.name}</h3>
                        <p className="text-slate-600 text-sm">{category.count} products</p>
                      </div>
                      <button 
                        onClick={() => handleDeleteCategory(category.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label={`Delete ${category.name} category`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Add Category Modal */}
              {showAddCategory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                    <button 
                      onClick={() => setShowAddCategory(false)} 
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                      aria-label="Close modal"
                    >
                      <X size={24} />
                    </button>
                    <h3 className="text-xl font-semibold mb-4">Add Category</h3>
                    <form onSubmit={handleAddCategory} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Category Name*</label>
                        <input
                          type="text"
                          placeholder="Beverages"
                          className="w-full border p-2 rounded"
                          value={newCategory}
                          onChange={e => setNewCategory(e.target.value)}
                          required
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button 
                          type="button" 
                          onClick={() => setShowAddCategory(false)}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Add Category
                        </button>
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
                <h2 className="text-xl font-semibold">Loyalty Card Tiers ({loyaltyCards.length})</h2>
                <button 
                  onClick={() => setShowAddTier(true)} 
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus size={18} /> Add Tier
                </button>
              </div>
              
              {/* Loyalty card list */}
              {loyaltyCards.length === 0 ? (
                <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
                  <Award size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700">No loyalty tiers yet</h3>
                  <p className="text-gray-500 mt-2">Add loyalty tiers to reward your customers</p>
                  <button 
                    onClick={() => setShowAddTier(true)} 
                    className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add Tier
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {loyaltyCards.map(card => (
                    <div key={card.id} className="bg-white p-6 rounded-lg shadow-sm border">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`${card.color} text-white px-3 py-1 rounded-full text-sm font-medium`}>
                          {card.tier}
                        </div>
                        <button 
                          onClick={() => handleDeleteTier(card.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          aria-label={`Delete ${card.tier} tier`}
                        >
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
                          <p className="font-semibold text-slate-800">{card.minSpend.toLocaleString()} RWF</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Add Tier Modal */}
              {showAddTier && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                  <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md relative">
                    <button 
                      onClick={() => setShowAddTier(false)} 
                      className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
                      aria-label="Close modal"
                    >
                      <X size={24} />
                    </button>
                    <h3 className="text-xl font-semibold mb-4">Add Loyalty Tier</h3>
                    <form onSubmit={handleAddTier} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Tier Name*</label>
                        <input
                          type="text"
                          placeholder="Gold"
                          className="w-full border p-2 rounded"
                          value={newTier.tier}
                          onChange={e => setNewTier({...newTier, tier: e.target.value})}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Discount (%)*</label>
                        <input
                          type="number"
                          placeholder="15"
                          className="w-full border p-2 rounded"
                          value={newTier.discount}
                          onChange={e => setNewTier({...newTier, discount: e.target.value})}
                          required
                          min="1"
                          max="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Minimum Spend (RWF)*</label>
                        <input
                          type="number"
                          placeholder="100000"
                          className="w-full border p-2 rounded"
                          value={newTier.minSpend}
                          onChange={e => setNewTier({...newTier, minSpend: e.target.value})}
                          required
                          min="0"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button 
                          type="button" 
                          onClick={() => setShowAddTier(false)}
                          className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300"
                        >
                          Cancel
                        </button>
                        <button 
                          type="submit" 
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                          Add Tier
                        </button>
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