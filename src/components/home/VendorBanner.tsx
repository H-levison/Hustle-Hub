import React from "react";
import { useNavigate } from 'react-router-dom';

const VendorBanner: React.FC = () => {
  const navigate = useNavigate();

  const handleBecomeVendor = async () => {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!userStr || !token) {
      navigate('/auth/login');
      return;
    }
    const user = JSON.parse(userStr);
    if (user.is_provider) {
      navigate('/vendorshop');
      return;
    }
    try {
      const response = await fetch('http://localhost:5000/user/become-vendor', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (response.ok) {
        user.is_provider = true;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('role', 'provider');
        navigate('/vendorshop');
      } else {
        alert(data.error || data.message || 'Failed to become a vendor');
      }
    } catch (err) {
      alert('Server error. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-8xl mx-auto px-2 sm:px-4 md:px-[80px] mt-4 sm:mt-[20px]">
      <section className="w-full py-6 sm:py-12 px-2 sm:px-6 md:px-[80px] bg-[#10194A] rounded-3xl flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left Side */}
        <div className="flex-1 max-w-xl text-center md:text-left">
          <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 sm:mb-4 leading-tight">
            Showcase<br className="hidden sm:block" />your products and services today!
          </h2>
          <p className="text-white/80 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg">
             Whether you sell food, fashion, gadgets, or offer essential services, HustleHub gives you the space to reach students on campus with ease. Set up your shop, grow your brand, and get discovered by the right customers.
          </p>
          <button className="bg-white text-[#10194A] font-semibold rounded-full px-6 sm:px-8 py-2.5 sm:py-3 text-sm sm:text-base shadow hover:bg-gray-100 transition" onClick={handleBecomeVendor}>
            Become a vendor
          </button>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex items-center justify-center w-full max-w-xl">
          <div className="grid grid-cols-2 grid-rows-2 gap-3 sm:gap-4 w-full h-40 sm:h-[320px]">
            <img 
      src="https://pbs.twimg.com/media/FmC619lagAAT9GN.jpg" 
      alt="Vendor point"
      className="rounded-xl col-span-1 row-span-2 h-full w-full object-cover"
    />

            <img src="https://pbs.twimg.com/media/GwC7JrqWwAAg0Hu?format=jpg&name=4096x4096" 
      alt="Vendor point"
      className="rounded-xl col-span-1 row-span-2 h-full w-full object-cover"/>
            
          </div>
        </div>
      </section>
    </div>
  );
};

export default VendorBanner; 