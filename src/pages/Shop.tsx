import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Star,
  Heart,
  Mail,
} from 'lucide-react';
import { Navigation } from '../components/Navigation';

// Import the featured stores data
const featuredStores = [
  {
    id: 1,
    image: "https://www.flippedoutfood.com/wp-content/uploads/2022/02/Movie-Theater-Popcorn-featured-540x720.jpg",
    title: "Popcorn Guy",
    subtitle: "Open from 9:00 AM to 4:00 PM",
    description: "The best popcorn in town with various flavors.",
    logo: "https://www.flippedoutfood.com/wp-content/uploads/2022/02/Movie-Theater-Popcorn-featured-540x720.jpg",
    banner: "https://www.flippedoutfood.com/wp-content/uploads/2022/02/Movie-Theater-Popcorn-featured-540x720.jpg",
    followers: 120,
  },
  {
    id: 2,
    image: "https://cookingwithclaudy.com/wp-content/uploads/2023/02/bca2acd9329ec7bb2050f52a3293d0e5.jpg",
    title: "Fatima's Kitchen",
    subtitle: "Open from 11:00 AM to 8:00 PM",
    description: "Delicious homemade meals with authentic flavors.",
    logo: "https://cookingwithclaudy.com/wp-content/uploads/2023/02/bca2acd9329ec7bb2050f52a3293d0e5.jpg",
    banner: "https://cookingwithclaudy.com/wp-content/uploads/2023/02/bca2acd9329ec7bb2050f52a3293d0e5.jpg",
    followers: 250,
  },
  {
    id: 3,
    image: "https://i.ytimg.com/vi/QMDaxjc11xc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAv2aHkQ338hRLssjViQ_n3HB_A3g",
    title: "Fani's Bites",
    subtitle: "Open from 8:00 AM to 11:00 PM",
    description: "Quick and tasty bites for any time of the day.",
    logo: "https://i.ytimg.com/vi/QMDaxjc11xc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAv2aHkQ338hRLssjViQ_n3HB_A3g",
    banner: "https://i.ytimg.com/vi/QMDaxjc11xc/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAv2aHkQ338hRLssjViQ_n3HB_A3g",
    followers: 180,
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=400&q=80",
    title: "Speed Demons",
    subtitle: "Starting at 11am-7",
    description: "The fastest delivery service for all your needs.",
    logo: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=400&q=80",
    banner: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&w=400&q=80",
    followers: 95,
  },
];

// Default store data for Rwanda Kicks (when no matching ID is found)
const defaultStore = {
  id: 5,
  title: "Rwanda Kicks",
  description: "We have the best sneakers in Kigali.",
  logo: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80",
  banner: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=400&q=80",
  followers: 80,
  subtitle: "Open from 10:00 AM to 7:00 PM",
};

const Shop = () => {
  const { id } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);
  const [storeData, setStoreData] = useState(null);

  useEffect(() => {
    // Find the store by ID from the featured stores
    const storeId = parseInt(id, 10);
    const foundStore = featuredStores.find(store => store.id === storeId);
    
    if (foundStore) {
      setStoreData({
        id: foundStore.id.toString(),
        name: foundStore.title,
        description: foundStore.description,
        logo: foundStore.logo,
        banner: foundStore.banner,
        followers: foundStore.followers,
        products: 90, // Default product count
        subtitle: foundStore.subtitle
      });
    } else {
      // Use default store if no matching ID is found
      setStoreData({
        id: defaultStore.id.toString(),
        name: defaultStore.title,
        description: defaultStore.description,
        logo: defaultStore.logo,
        banner: defaultStore.banner,
        followers: defaultStore.followers,
        products: 90, // Default product count
        subtitle: defaultStore.subtitle
      });
    }
  }, [id]);

  // Extract unique categories from products when storeData changes
  useEffect(() => {
    if (storeData) {
      const productsForStore = storeProducts[storeData.id] || storeProducts['5'];
      const uniqueCategories = ['All', ...new Set(productsForStore.map(product => product.category))];
      setCategories(uniqueCategories);
    }
  }, [storeData]);

  // If store data is still loading, show a loading state
  if (!storeData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-lg">Loading store...</p>
      </div>
    );
  }

  // Define product sets for each store type
  const storeProducts = {
    // Popcorn Guy (ID: 1)
    '1': [
      {
        id: 1,
        name: "Classic Butter Popcorn",
        price: 2500,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1578849278619-e73505e9610f?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 2,
        name: "Caramel Popcorn",
        price: 3000,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1604308777626-73a23a916b7d?auto=format&fit=crop&w=400&q=80",
        isFavorite: true,
      },
      {
        id: 3,
        name: "Cheese Popcorn",
        price: 3200,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1621939514649-280e2ee25f60?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 4,
        name: "Mixed Flavor Pack",
        price: 5000,
        category: "Snacks",
        image: "https://images.unsplash.com/photo-1583086762675-5a88bcc72548?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
    ],
    // Fatima's Kitchen (ID: 2)
    '2': [
      {
        id: 1,
        name: "Homemade Jollof Rice",
        price: 8500,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1575687715189-41d7c1ebf02c?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 2,
        name: "Grilled Chicken Platter",
        price: 12000,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?auto=format&fit=crop&w=400&q=80",
        isFavorite: true,
      },
      {
        id: 3,
        name: "Vegetable Stew",
        price: 7000,
        category: "Main Course",
        image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 4,
        name: "Fresh Fruit Salad",
        price: 5000,
        category: "Dessert",
        image: "https://images.unsplash.com/photo-1564093497595-593b96d80180?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
    ],
    // Fani's Bites (ID: 3)
    '3': [
      {
        id: 1,
        name: "Mini Samosas (6 pcs)",
        price: 4500,
        category: "Appetizers",
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 2,
        name: "Chicken Wings (8 pcs)",
        price: 7000,
        category: "Appetizers",
        image: "https://images.unsplash.com/photo-1608039755401-742074f0548d?auto=format&fit=crop&w=400&q=80",
        isFavorite: true,
      },
      {
        id: 3,
        name: "Beef Sliders (3 pcs)",
        price: 8500,
        category: "Appetizers",
        image: "https://images.unsplash.com/photo-1550317138-10000687a72b?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 4,
        name: "Loaded Fries",
        price: 6000,
        category: "Sides",
        image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
    ],
    // Speed Demons (ID: 4)
    '4': [
      {
        id: 1,
        name: "Nike Air Force 1 White",
        price: 45000,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 2,
        name: "Nocta Glide 'Black Chrome'",
        price: 48000,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=400&q=80",
        isFavorite: true,
      },
      {
        id: 3,
        name: "Under Armour HOVR Infinite",
        price: 32000,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 4,
        name: "Air Force 1 First Use",
        price: 34000,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
    ],
    // Default store (Rwanda Kicks - ID: 5)
    '5': [
      {
        id: 1,
        name: "Nike Air Force 1 White",
        price: 45000,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 2,
        name: "Nocta Glide 'Black Chrome'",
        price: 48000,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?auto=format&fit=crop&w=400&q=80",
        isFavorite: true,
      },
      {
        id: 3,
        name: "Under Armour HOVR Infinite",
        price: 32000,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
      {
        id: 4,
        name: "Air Force 1 First Use",
        price: 34000,
        category: "Footwear",
        image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=400&q=80",
        isFavorite: false,
      },
    ],
  };

  // Get products based on store ID
  const products = storeProducts[storeData.id] || storeProducts['5'];

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      <div className="container mx-auto px-4 py-8 max-w-7xl flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <aside className="lg:w-1/4 w-full bg-white border border-gray-100 rounded-xl p-6 text-center sticky top-8 h-fit">
          <img
            src={storeData.logo}
            alt="Store Logo"
            className="w-20 h-20 mx-auto rounded-full mb-4 object-cover"
          />
          <h2 className="text-xl font-semibold text-gray-900">{storeData.name}</h2>
          <p className="text-sm text-gray-600 mt-1">{storeData.description}</p>
          <div className="mt-4 text-sm text-gray-700">
            <span className="font-semibold">{storeData.followers}</span> Followers
          </div>
          <p className="text-xs text-gray-500 mt-2">{storeData.subtitle}</p>

          <nav className="mt-6 border-t pt-4">
            <button className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-blue-500 text-white font-medium">
              <Mail className="w-4 h-4" /> Shop
            </button>
          </nav>

          <div className="mt-6 text-left">
            <h3 className="font-semibold text-gray-800 mb-2">Categories</h3>
            <div className="flex flex-col gap-2 mt-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-left px-2 py-1 rounded text-sm ${selectedCategory === category 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="lg:w-3/4 w-full ">

          {/* Filters and Sorting */}
          <div className="flex flex-wrap justify-between items-center mb-4">
            <div className="text-gray-600 text-sm">{filteredProducts.length} items</div>
            <div className="flex gap-2">
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Show: 50</option>
                <option>Show: 25</option>
              </select>
              <select className="border rounded-md px-3 py-2 text-sm">
                <option>Sort by: Featured</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-semibold px-2 py-1 rounded">
                    RWF {product.price.toLocaleString()}
                  </div>
                  <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-md">
                    <Heart
                      className={`w-4 h-4 ${product.isFavorite
                        ? 'fill-red-500 text-red-500'
                        : 'text-gray-600'}`}
                    />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs text-gray-500 mb-1">{product.category}</p>
                  <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{product.name}</h3>
                </div>
              </div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center text-gray-500 py-8">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
