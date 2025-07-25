import React from "react";

const InfoSection: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-8 items-center bg-black text-white rounded-2xl my-8">
    <div className="flex-1">
      <h2 className="text-2xl font-bold mb-4">Where clients do this and that and everything and more words</h2>
      <ul className="mb-4 list-disc pl-5">
        <li>Point one about the platform</li>
        <li>Point two about the platform</li>
        <li>Point three about the platform</li>
      </ul>
      <p className="text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nenean id elementum mauris. Varius, rutrum velit.</p>
    </div>
    <div className="flex-1 flex items-center justify-center">
      <div className="w-48 h-32 bg-gray-700 rounded-xl" />
    </div>
  </section>
);

export default InfoSection; 