import React from "react";

const avatars = [
  "https://i0.wp.com/necheontheroad.com/wp-content/uploads/2022/11/IMG_5886.jpg?resize=800%2C1001&ssl=1",
  "https://www.alueducation.com/wp-content/uploads/2022/07/KHL-Hub-64.jpg",
  "https://www.alueducation.com/wp-content/uploads/2025/04/Copy-of-IR2024-Print.jpg"
];

const guarantees = [
  {
    icon: "😊",
    title: "Happiness Pledge",
    desc: "If you're not satisfied, we'll work to make it right."
  },
  {
    icon: "🔍",
    title: "Vetted Taskers",
    desc: "Taskers are always background checked before joining the platform."
  },
  {
    icon: "🛡️",
    title: "Dedicated Support",
    desc: "Friendly service when you need us - every day of the week."
  }
];

const SatisfactionSection: React.FC = () => (
  <section className="max-w-2xl mx-auto bg-blue-600 text-white rounded-3xl my-8 p-8 md:p-12 flex flex-col gap-6">
    {/* Heading with avatars */}
    <h2 className="text-3xl md:text-4xl font-extrabold leading-tight mb-2">
      Your satisfaction, guaranteed,<br />
      as a <span className="inline-flex items-center">
        {avatars.map((src, i) => (
          <img
            key={i}
            src={src}
            alt="customer avatar"
            className={`w-10 h-10 rounded-full border-2 border-white -ml-2 first:ml-0 bg-white object-cover`}
            style={{ zIndex: 10 - i }}
          />
        ))}
        <span className="ml-2">customer!</span>
      </span>
    </h2>
    {/* Subheading */}
    <p className="text-white/90 mb-4 text-base md:text-lg">
      Discover the thrill of innovation with us.<br />Unleash your potential today!
    </p>
    {/* Guarantees */}
    <ul className="flex flex-col gap-4 mb-4">
      {guarantees.map((g, i) => (
        <li key={i} className="flex items-start gap-4">
          {/* <div className="flex-shrink-0 w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl text-blue-600">
            {g.icon}
          </div> */}
          <div>
            <div className="font-bold text-lg">{g.title}</div>
            <div className="text-white/90 text-sm"> {g.desc}</div>
          </div>
        </li>
      ))}
    </ul>
    {/* Button */}
    {/* <button className="mt-2 w-fit bg-white text-blue-700 font-semibold rounded-full px-8 py-3 text-base shadow hover:bg-gray-100 transition self-start">
      Join Now
    </button> */}
  </section>
);

export default SatisfactionSection; 