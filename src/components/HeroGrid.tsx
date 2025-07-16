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
    className={`relative rounded-lg overflow-hidden flex flex-col justify-between p-6 ${bgColor} ${textColor} ${className}`}
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
      {subtitle && <p className="text-sm opacity-90 mb-3">{subtitle}</p>}
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
    <section className="w-full flex justify-center py-8 hidden lg:flex">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 grid-rows-3 gap-4 w-full md:mx-8 lg:mx-24 h-[500px]">
        <Card 
          title="Fashion & Apparel"
          tags={["men", "kids", "women"]}
          button="See more"
          bgImage="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300&fit=crop"
          className="col-span-2 row-span-2"
        />
        <Card 
          title="Beauty & Personal Care"
          tags={["Fast Delivery"]}
          button="See more"
          bgImage="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop"
          className="col-start-1 row-start-3"
        />
        <Card 
          title="Electronics & Gadgets"
          button="See more"
          bgImage="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop"
          className="col-start-2 row-start-3"
        />
        <Card 
          title="Food & Beverages"
          tags={["Near Campus"]}
          bgImage="https://domf5oio6qrcr.cloudfront.net/medialibrary/8371/bigstock-Hamburger-And-French-Fries-263887.jpg"
          className="col-start-3 row-start-1"
        />
        <Card 
          title="Stationeries"
          subtitle="We offer services that help people learn and grow."
          // tags={["handyman" , "cleaning"]}
          button="check out "
          bgImage="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400&h=300&fit=crop"
          className="row-span-2 col-start-3 row-start-2"
        />
        
        <Card 
          title="Services"
          subtitle="Lorem ipsum and more words, run our of words so this is a task for some one else"
          tags={["handyman" , "cleaning"]}
          button="Join communities"
          bgImage="https://images.unsplash.com/photo-1521737852567-6949f3f9f2b5?w=400&h=300&fit=crop"
          className="row-span-3 col-start-4 row-start-1"
        />
      </div>
    </section>
  );
};

export default HeroGrid;