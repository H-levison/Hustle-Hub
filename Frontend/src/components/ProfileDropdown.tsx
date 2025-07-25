import React, { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Settings, LogOut, Store, User } from "lucide-react";


export const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();


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
    // Clear user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/auth/login");
  };

   const [user, setUser] = useState<{ first_name: string; last_name: string; is_provider?: boolean } | null>(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 cursor-pointer focus:outline-none"
      >
        <div className="w-12 h-12 rounded-full  flex items-center justify-center">
          <User size={24} className="text-gray-600" />
        </div>
        {/* <span className="font-medium text-lg hidden md:block">
          {user ? `${user.first_name} ${user.last_name}` : "Guest"}
        </span> */}
      </button>


      {isOpen && (
        <div className="absolute  right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border">
          {user && user.is_provider && (
            <NavLink
              to="/vendorshop"
              className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
            >
              <Store size={16} />
              <span>Vendor Shop</span>
            </NavLink>
          )}
           {/* <NavLink
            to="/settings"
            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
             <Settings size={16} />
            <span>Settings</span>
          </NavLink> */}
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