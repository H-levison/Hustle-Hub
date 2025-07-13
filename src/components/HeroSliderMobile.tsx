import React from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  tags?: string[];
  button?: string;
  bgImage?: string;
  bgColor?: string;
  textColor?: string;
}

const cardData: CardProps[] = [
  {
    title: "Giant luxury complex with all the necessary amenities",
    tags: ["affordable living", "Near Campus"],
    button: "Apply now",
    bgImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
  },
  {
    title: "Shipping + freight",
    tags: ["Fast Delivery"],
    bgImage: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&h=300&fit=crop",
  },
  {
    title: "Ready to turn your skills into income?",
    button: "Join us",
    bgColor: "bg-blue-500",
  },
  {
    title: "Handy man service",
    tags: ["Near Campus"],
    bgImage: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&h=300&fit=crop",
  },
  {
    title: "hire top taskers",
    subtitle: "hire the best taskers for your needs.",
    bgColor: "bg-slate-100",
    textColor: "text-gray-800",
  },
  {
    title: "Let us compete for the number 1 spot",
    subtitle: "Lorem ipsum and more words, run our of words so this is a task for some one else",
    tags: ["gaming club"],
    button: "Join communities",
    bgImage: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=600&fit=crop",
  },
];

const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  tags = [],
  button,
  bgImage,
  bgColor = 'bg-gray-900',
  textColor = 'text-white',
}) => (
  <div
    className={`relative rounded-lg overflow-hidden flex flex-col justify-between p-6 ${bgColor} ${textColor} h-[400px]`}
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

const HeroSliderMobile: React.FC = () => {
  return (
    <section className="w-full flex justify-center py-8 md:hidden">
      <div className="flex gap-4 overflow-x-auto px-4 snap-x snap-mandatory w-full">
        {cardData.map((card, idx) => (
          <div
            key={idx}
            className="min-w-[85vw] max-w-[85vw] snap-center flex-shrink-0"
          >
            <Card {...card} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSliderMobile; 