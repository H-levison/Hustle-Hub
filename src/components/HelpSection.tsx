import React from "react";

const HelpSection: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 rounded-2xl my-8 flex flex-col md:flex-row gap-8 items-center">
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-2">Even Thierry (super hero) needs some help!</h2>
      <p className="mb-4">You focus on the project goals; we find you proper taskers. Around 100+ people get help in 24 hours in platform.</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors">Start your own project</button>
    </div>
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className="w-32 h-20 bg-gray-300 rounded-xl mb-2" />
      <div className="bg-white px-4 py-2 rounded-full text-blue-700 font-bold">happy customers 99%</div>
    </div>
  </section>
);

export default HelpSection; 