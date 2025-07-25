import React, { useState } from "react";
import { Heart, Star } from "lucide-react";

const products = [
  {
    id: 1,
    images: [
      "https://cdn.guardian.ng/wp-content/uploads/2023/12/Photo-Credit-Jollof-Festival-.jpg"
    ],
    title: "Jollof Rice",
    location: "West Africa",
    price: 12,
    rating: 4.9,
    reviews: 1023,
    isFavorite: true,
    description: "A flavorful rice dish cooked in a rich tomato sauce.",
    details: "Made with rice, tomatoes, onions, peppers, and spices. Often served with chicken, beef, or plantains.",
  },
  {
    id: 2,
    images: [
      "https://eatsdelightful.com/wp-content/uploads/2023/07/decorated-and-sliced-chocolate-chip-red-velvet-cake-on-cake-stand-2-scaled.jpg"
    ],
    title: "Chocolate Red Velvet Cake",
    location: "Bakery Delight",
    price: 18,
    rating: 4.7,
    reviews: 587,
    isFavorite: false,
    description: "A rich, moist chocolate cake with cream cheese frosting.",
    details: "Made with cocoa powder, buttermilk, and a hint of vanilla. Topped with smooth cream cheese frosting.",
  },
  {
    id: 3,
    images: [
      "https://www.allrecipes.com/thmb/WqWggh6NwG-r8PoeA3OfW908FUY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/21014-Good-old-Fashioned-Pancakes-mfs_001-1fa26bcdedc345f182537d95b6cf92d8.jpg"
    ],
    title: "Fluffy Pancakes",
    location: "Morning Delights",
    price: 8,
    rating: 4.8,
    reviews: 432,
    isFavorite: true,
    description: "Light and fluffy pancakes served with maple syrup.",
    details: "Made with flour, eggs, milk, and a touch of vanilla. Served with butter and pure maple syrup.",
  },
  {
    id: 4,
    images: [
      "https://www.recipetineats.com/wp-content/uploads/2023/05/Garlic-Bread_2-SQ.jpg"
    ],
    title: "Garlic Bread",
    location: "Italian Corner",
    price: 5,
    rating: 4.6,
    reviews: 289,
    isFavorite: false,
    description: "Crispy bread infused with garlic butter and herbs.",
    details: "French bread sliced and spread with a mixture of butter, garlic, and parsley, then toasted until golden.",
  },
  {
    id: 5,
    images: [
      "https://www.foodandwine.com/thmb/DI29Houjc-wRg-pxmPbk3gQdPEc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg"
    ],
    title: "Classic Cheeseburger",
    location: "Burger Joint",
    price: 10,
    rating: 4.5,
    reviews: 752,
    isFavorite: true,
    description: "Juicy beef patty topped with melted cheese and fresh vegetables.",
    details: "100% beef patty with cheddar cheese, lettuce, tomato, onion, and special sauce on a toasted brioche bun.",
  },
  {
    id: 6,
    images: [
      "https://www.allrecipes.com/thmb/SoBuPU73KcbYHl3Kp3j8Xx4A3fc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/8805-CreamyAuGratinPotatoes-mfs-2X3--f1f5c31f38394c82ad970107a1c58f2a.jpg"
    ],
    title: "Creamy Potato Gratin",
    location: "French Bistro",
    price: 14,
    rating: 4.9,
    reviews: 321,
    isFavorite: false,
    description: "Thinly sliced potatoes baked in a creamy sauce with cheese.",
    details: "Layers of thinly sliced potatoes with heavy cream, garlic, and Gruyère cheese, baked until golden and bubbly.",
  },
  {
    id: 7,
    images: [
      "https://www.recipetineats.com/wp-content/uploads/2020/03/Brownies_0-SQ.jpg"
    ],
    title: "Fudgy Brownies",
    location: "Sweet Treats",
    price: 7,
    rating: 4.8,
    reviews: 498,
    isFavorite: true,
    description: "Rich, fudgy chocolate brownies with a crackly top.",
    details: "Made with dark chocolate, butter, and a hint of espresso for depth of flavor. Perfectly chewy and fudgy.",
  },
  {
    id: 8,
    images: [
      "https://www.seriouseats.com/thmb/Li88WRe9-3OXDiUGJU0OIcOdBCw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2015__05__Anova-Steak-Guide-Sous-Vide-Photos15-beauty-159b7038c56a4e7685b57f478ca3e4c8.jpg"
    ],
    title: "Sous Vide Steak",
    location: "Prime Cuts",
    price: 25,
    rating: 4.9,
    reviews: 187,
    isFavorite: false,
    description: "Perfectly cooked steak using the sous vide method.",
    details: "Premium beef cooked to precise temperature in a water bath, then seared for a perfect crust. Served with herb butter.",
  },
];

const ProductCards = () => {
  const [favorites, setFavorites] = useState<number[]>(
    products.filter((p) => p.isFavorite).map((p) => p.id)
  );

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Products
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Discover our most loved items from various vendors
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="relative w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-white/80 hover:bg-white"
                >
                  <Heart
                    size={20}
                    className={`${
                      favorites.includes(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700 font-medium">
                    <a href="#">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.location}</p>
                  <div className="mt-1 flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={`${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        } ${i === Math.floor(product.rating) && 
                          product.rating % 1 > 0 ? "text-yellow-400 fill-yellow-400 opacity-50" : ""}`}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-500">
                      ({product.reviews})
                    </span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCards;