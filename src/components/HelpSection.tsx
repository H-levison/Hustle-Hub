import React from "react";

const HelpSection: React.FC = () => (
  <section className="max-w-7xl mx-auto px-4 py-8 bg-gray-100 rounded-2xl my-8 flex flex-col md:flex-row gap-8 items-center">
    <div className="flex-1">
      <h2 className="text-xl font-bold mb-4">Contact Us</h2>
      <form className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          placeholder="Your Message"
          rows={4}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className="w-32 h-20 bg-gray-300 rounded-xl mb-2" />
      <div className="bg-white px-4 py-2 rounded-full text-blue-700 font-bold">happy customers 99%</div>
    </div>
  </section>
);

export default HelpSection; 