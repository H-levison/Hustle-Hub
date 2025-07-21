import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Settings, LogOut, Store } from "lucide-react";


export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };


  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };


  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = () => {
    // Implement logout logic here
    console.log("User logged out");
    setIsOpen(false);
    // You'll want to update your global state to reflect that the user is logged out.
    // For now, we can reload the page to simulate the state change.
    window.location.reload();
  };


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 cursor-pointer focus:outline-none"
      >
        <img
          src="https://wallpapers.com/images/hd/cool-profile-picture-87h46gcobjl5e4xu.jpg" // Using a placeholder image from public folder
          alt="User Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <span className="font-medium text-lg hidden md:block">Username</span>
      </button>


      {isOpen && (
        <div className="absolute  right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
          <NavLink
            to="/vendorshop"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Store size={16} />
            <span>Vendor Shop</span>
          </NavLink>
          <NavLink
            to="/settings"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={16} />
            <span>Settings</span>
          </NavLink>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

