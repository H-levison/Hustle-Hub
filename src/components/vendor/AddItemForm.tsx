// components/vendor/AddItemForm.tsx
import { useState } from 'react';
import { Image, Upload, Info } from 'lucide-react';

const AddItemForm = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value
    }));

    // Handle image preview
    if (name === 'image') {
      setImageError(null);
      if (value) {
        // Test if the image URL is valid
        const img = new window.Image();
        img.onload = () => {
          setImagePreview(value);
          setImageError(null);
        };
        img.onerror = () => {
          setImagePreview(null);
          setImageError('Invalid image URL. Please check the link and try again.');
        };
        img.src = value;
      } else {
        setImagePreview(null);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageError) {
      alert('Please fix the image URL before submitting.');
      return;
    }
    // TODO: Submit to backend
    console.log('Product submitted:', product);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Product Name</label>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Description</label>
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Price (RWF)</label>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
          min="0"
        />
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Category</label>
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        >
          <option value="">Select a category</option>
          <option value="fashion">Fashion & Apparel</option>
          <option value="food">Food & Beverages</option>
          <option value="education">Education</option>
          <option value="home">Home & Cleaning</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2 flex items-center gap-2">
          <Image size={16} />
          Product Image URL
        </label>
        <div className="relative">
          <input
            type="url"
            name="image"
            value={product.image}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-md pr-10 ${
              imageError ? 'border-red-500' : imagePreview ? 'border-green-500' : ''
            }`}
            placeholder="https://example.com/product-image.jpg"
            required
          />
          <Upload size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {/* Image Preview */}
        {imagePreview && (
          <div className="mt-2">
            <p className="text-sm text-green-600 mb-2">✓ Image preview:</p>
            <div className="w-full h-32 bg-gray-100 rounded-md overflow-hidden">
              <img 
                src={imagePreview} 
                alt="Product preview" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        {/* Image Error */}
        {imageError && (
          <p className="text-sm text-red-600 mt-2">{imageError}</p>
        )}
        
        {/* Helpful Tips */}
        <div className="mt-2 p-3 bg-blue-50 rounded-md">
          <div className="flex items-start gap-2">
            <Info size={16} className="text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Image Tips:</p>
              <ul className="text-xs space-y-1">
                <li>• Use high-quality images (at least 400x400 pixels)</li>
                <li>• Supported formats: JPG, PNG, WebP</li>
                <li>• Make sure the image URL is publicly accessible</li>
                <li>• You can use services like Imgur, Google Drive (public), or your own server</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-gray-700 mb-2">Stock Quantity</label>
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
          min="0"
        />
      </div>
      
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!!imageError}
      >
        Add Product
      </button>
    </form>
  );
};

export default AddItemForm;