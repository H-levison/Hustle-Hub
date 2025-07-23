import React from "react";

interface CategoryCardProps {
  title: string;
  image: string;
  bgColor?: string;
}

const categories: CategoryCardProps[] = [
  {
    title: "Fashion & Apparel",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300&fit=crop",
    bgColor: "bg-pink-100",
  },
  {
    title: "Beauty & Personal Care",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop",
    bgColor: "bg-rose-100",
  },
  {
    title: "Electronics & Gadgets",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop",
    bgColor: "bg-blue-100",
  },
  {
    title: "Food & Beverages",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    bgColor: "bg-yellow-100",
  },
  {
    title: "Home & Living",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop",
    bgColor: "bg-green-100",
  },
  {
    title: "Books & Stationery",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=300&fit=crop",
    bgColor: "bg-orange-100",
  },
  {
    title: "Services",
    image: "https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400&h=300&fit=crop",
    bgColor: "bg-purple-100",
  },
  {
    title: "Tech & Digital Products",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
    bgColor: "bg-indigo-100",
  },
  {
    title: "Pets & Animals",
    image: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=400&h=300&fit=crop",
    bgColor: "bg-teal-100",
  },
];

const CategoryCard: React.FC<CategoryCardProps & { onClick: () => void }> = ({ 
  title, 
  image, 
  bgColor = 'bg-gray-100', 
  onClick 
}) => (
  <div
    className={`relative rounded-xl overflow-hidden flex flex-col justify-end h-[140px] w-full ${bgColor} shadow-xl cursor-pointer transition-all duration-300 hover:shadow-2xl active:scale-[0.98] group`}
    onClick={onClick}
  >
    {/* Background Image */}
    <div 
      className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
      style={{ backgroundImage: `url(${image})` }}
    />
    {/* Enhanced gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
    {/* Subtle inner shadow for depth */}
    <div className="absolute inset-0 shadow-inner" />
    {/* Content */}
    <div className="relative z-10 px-6 py-4">
      <h3 className="text-lg font-bold text-white drop-shadow-2xl leading-tight">
        {title}
      </h3>
      {/* Subtle accent line */}
      <div className="w-8 h-0.5 bg-white/60 mt-2 rounded-full transition-all duration-300 group-hover:w-12 group-hover:bg-white/80" />
    </div>
  </div>
);

const HeroSliderMobile: React.FC = () => {
  return (
    <>
       
      <section className="w-full flex justify-center py-8 lg:hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="relative w-full">
          <div 
            className="flex gap-4 overflow-x-auto px-6 snap-x snap-mandatory hide-scrollbar"
            style={{ 
              WebkitOverflowScrolling: "touch",
              scrollBehavior: "smooth"
            }}
          >
            {categories.map((cat, idx) => (
              <div
                key={idx}
                className="min-w-[80vw] max-w-[80vw] h-[140px] snap-center flex-shrink-0 md:min-w-[60vw] md:max-w-[60vw]"
              >
                <CategoryCard 
                  {...cat} 
                  onClick={() => console.log(`Clicked ${cat.title}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSliderMobile;