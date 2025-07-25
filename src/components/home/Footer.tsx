import React from "react";

const Footer: React.FC = () => (
  <footer className="bg-black text-white py-10 mt-12">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row gap-8 justify-between items-start">
      <div>
        <h3 className="font-bold text-lg mb-2">Hustlehub</h3>
        <ul className="space-y-1 text-sm">
          <li>Shop</li>
          <li>Vendors</li>
          <li>Help</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">HELP</h4>
        <ul className="space-y-1 text-sm">
          <li>Contact us</li>
          <li>Support</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">BUILT BY STUDENTS FOR STUDENTS </h4>
        <ul className="space-y-1 text-sm">
          <li>We support ALU entrepreneurs on every step</li>
          <li>Campus-wide reach</li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-2">Newsletter</h4>
        <form className="flex gap-2">
          <input type="email" placeholder="your@email.com" className="px-3 py-2 rounded-full text-black" />
          <button className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">Subscribe</button>
        </form>
      </div>
    </div>
    <div className="text-center text-gray-400 text-xs mt-8">&copy; {new Date().getFullYear()} Hustlehub</div>
  </footer>
);

export default Footer; 