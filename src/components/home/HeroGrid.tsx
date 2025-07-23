import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  tags?: string[];
  button?: string;
  bgImage?: string;
  bgColor?: string;
  textColor?: string;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  tags = [],
  button,
  bgImage,
  bgColor = 'bg-gray-900',
  textColor = 'text-white',
  className = '',
}) => (
  <div
    className={`relative  rounded-lg overflow-hidden flex flex-col justify-between p-6 ${bgColor} ${textColor} ${className}`}
    style={bgImage ? {
      backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    } : {}}
  >
    {/* Tags at the top */}
    {tags.length > 0 && (
      <div className="flex flex-wrap gap-2 mb-3 absolute left-0 top-0 p-4 z-10">
        {tags.map((tag, i) => (
          <span key={i} className="px-3 py-1 bg-black bg-opacity-40 rounded-full text-xs font-medium">
            {tag}
          </span>
        ))}
      </div>
    )}
    {/* Spacer to push content to bottom */}
    <div className="flex-1" />
    {/* Content at the bottom */}
    <div className="relative z-10 text-left">
      <h3 className="text-lg font-bold mb-2 leading-tight">{title}</h3>
      {subtitle && <p className=" opacity-90 mb-3">{subtitle}</p>}
      {button && (
        <button className="bg-white text-black px-4 py-2 rounded-lg font-medium w-fit hover:bg-gray-100 transition-colors">
          {button}
        </button>
      )}
    </div>
  </div>
);

const HeroGrid = () => {
  return (
  <section className="w-full h-full flex justify-center py-8 hidden lg:flex">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-4 w-full md:mx-8 lg:mx-24 h-[600px]">
        <Card 
          title="Fashion & Apparel"
          tags={["men", "kids", "women"]}
          button="See more"
          bgImage="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300&fit=crop"
          className="col-span-2 row-span-2"
        />
        <Card 
          title="Beauty & Personal Care"
         
          button="See more"
          bgImage="https://i0.wp.com/weareglamerus.com/wp-content/uploads/2020/08/IMG_1153.jpeg?fit=1024%2C768&ssl=1"
          className="col-start-1 row-start-3"
        />
        <Card 
          title="Electronics & Gadgets"
          button="See more"
          bgImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxfyvTJF1fEPRGzhkLcGS6dV0oqC7Ycaz3GQ&s"
          className="col-start-2 row-start-3"
        />
        <Card 
          title="Food & Beverages"
          tags={["Order and Fast Delivery"]}
          bgImage="https://kikifoodies.com/wp-content/uploads/2025/03/ET5B8958-4.jpeg"
          className="col-start-3 row-start-1"
        />


        <Card 
          title="Services"
          subtitle=" Apartment search and cleaning services made simple. "
          tags={["house-hunting" , "cleaning"]}
          button="Join communities"
          bgImage="https://media.licdn.com/dms/image/v2/D4E0BAQG026Z0gOalLQ/company-logo_200_200/company-logo_200_200/0/1719171441582?e=2147483647&v=beta&t=-jZIWCXM4GP3LfL6-hWFdUSeSh7C3nZfI_6FKxQZPY4"
          className="row-span-3 col-start-4 row-start-1"
        />
        <Card 
          title="Stationeries"
          subtitle="We offer services that help people learn and grow."
        tags={["education"]}
          button="check out "
          bgImage="https://wp.penguin.co.uk/wp-content/uploads/2024/12/Penguin-Best-Books-of-2025-article-sizing-1-1024x683.jpg"
          className="row-span-2 col-start-3 row-start-2"
        />
        
        
      </div>
    </section>
  );
};

export default HeroGrid;