import React, { useState } from "react";
import { GlobeIcon, Menu, X, ShoppingCart } from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { NavLink } from "react-router-dom";
import { ProfileDropdown } from "./ProfileDropdown";
import SearchBar from "../components/SearchBar";


export const Navigation = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Mock login state
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/explore" },
    // { label: "Store", to: "/explore?tab=stores" },
    // { label: "Leaderboard", to: "/leaderboard" },
    { label: "Loyalty Cards", to: "/loyalty-cards" },
    // { label: "Vendor Shop", to: "/vendorshop" },
  ];


  return (
    <header className="w-full bg-white h-[76px] relative flex items-center justify-between px-4 md:px-11 border-b  sticky top-0 z-50">
      {/* Brand logo */}
      <NavLink to="/" className=" font-extrabold flex gap-2 text-[#1c09ed] text-lg font-['Inter',Helvetica] hover:opacity-80 transition-opacity">
        {/* <img src="./logo (2).png" alt="" className="h-[25px]" /> */}
        <p className="text-[#0075F3]">Hustlehub</p>
      </NavLink>

      {/* Desktop Navigation menu */}
      <NavigationMenu className=" w-1/4  mx-auto hidden md:block">
        <NavigationMenuList className="flex gap-8">
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `font-['Inter',Helvetica] font-medium text-md cursor-pointer hover:text-[#1c09ed] transition-colors ${
                    isActive ? "text-[#1c09ed]" : "text-black"
                  }`
                }
              >
                {item.label}
              </NavLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Search Bar - Hidden on mobile, visible on desktop */}
      <div className="w-1/4 mx-10  hidden md:block">
         <SearchBar />
       </div>

      


      {/* Desktop Right side controls */}
      <div className="hidden md:flex items-center gap-6">
        {/* Cart icon */}
        <NavLink to="/cart" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <ShoppingCart size={22} />
        </NavLink>
        {/* Auth controls */}
        {isLoggedIn ? (
          <ProfileDropdown />
        ) : (
          <div className="flex items-center gap-3">
            <NavLink to="/auth/login">
              <Button
                variant="outline"
                className="w-[101px] h-[37px] rounded-[40px] border border-solid border-gray-400 bg-white font-['Inter',Helvetica] font-medium text-sm relative hover:bg-gray-50 transition-colors"
              >
                <span className="absolute left-[18px]">Login</span>
                <div className="absolute w-[26px] h-[26px] top-1 left-[62px] bg-white rounded-[50px] border border-solid border-gray-400" />
              </Button>
            </NavLink>
          </div>
        )}
      </div>


      {/* Hamburger menu for mobile */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 transition-colors z-50"
        onClick={() => setMobileOpen((open) => !open)}
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
      </button>


      {/* Mobile menu overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />
      )}
      {/* Mobile menu drawer */}
      <nav
        className={`fixed top-0 right-0 h-full w-full bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 gap-6">
          {/* Close button */}
          <button
            className="self-end mb-2 p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          
          {/* Mobile Search Bar */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for items..."
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg bg-gray-50 text-sm font-['Inter',Helvetica] focus:outline-none focus:ring-2 focus:ring-[#0075F3] focus:border-transparent"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
            </div>
          </div>
          {/* Nav links */}
          <div className="flex flex-col gap-4 mt-2">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `font-['Inter',Helvetica] font-medium text-base cursor-pointer hover:text-[#1c09ed] transition-colors ${
                    isActive ? "text-[#1c09ed]" : "text-black"
                  }`
                }
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          {/* Divider */}
          <div className="border-t my-4" />
          
          {/* Cart and Auth controls on same line */}
          <div className="flex items-center justify-between gap-4">
            {/* Cart icon */}
            <NavLink to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
              <ShoppingCart size={22} />
              <span className="font-['Inter',Helvetica] font-medium text-base">Cart</span>
            </NavLink>
            
            {/* Auth controls for mobile */}
            {isLoggedIn ? (
              <div className="flex-shrink-0">
                <ProfileDropdown />
              </div>
            ) : (
              <NavLink to="/auth/login" onClick={() => setMobileOpen(false)} className="flex-shrink-0">
                <Button
                  variant="outline"
                  className="h-[37px] px-6 rounded-[40px] border border-solid border-gray-400 bg-white font-['Inter',Helvetica] font-medium text-sm hover:bg-gray-50 transition-colors"
                >
                  Login
                </Button>
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};