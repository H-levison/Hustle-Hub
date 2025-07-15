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

export const Navigation = (): JSX.Element => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Explore", to: "/explore" },
    { label: "Leaderboard", to: "/leaderboard" },
    { label: "Loyalty Cards", to: "/loyalty-cards" },
    { label: "Vendor Shop", to: "/vendorshop" },
  ];

  return (
    <header className="w-full h-[68px] relative flex items-center justify-between px-4 md:px-11 border-b shadow-sm sticky top-0 z-50">
      {/* Brand logo */}
      <div className="font-extrabold flex gap-2 text-[#1c09ed] text-lg font-['Inter',Helvetica]">
        <img src="./logo (2).png" alt="" className="h-[25px]" />
        <p className="text-[#0075F3]">Hustlehub</p>
      </div>

      {/* Desktop Navigation menu */}
      <NavigationMenu className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
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

      {/* Desktop Right side controls */}
      <div className="hidden md:flex items-center gap-6">
        {/* Cart icon */}
        <NavLink to="/cart" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <ShoppingCart size={22} />
        </NavLink>
        {/* Auth buttons */}
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
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6 gap-8">
          {/* Close button */}
          <button
            className="self-end mb-2 p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            <X size={28} />
          </button>
          {/* Nav links */}
          <div className="flex flex-col gap-6 mt-4">
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
          {/* Cart icon */}
          <NavLink to="/cart" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <ShoppingCart size={22} />
          </NavLink>
          {/* Auth button */}
          <NavLink to="/auth/login" onClick={() => setMobileOpen(false)}>
            <Button
              variant="outline"
              className="w-full h-[37px] rounded-[40px] border border-solid border-gray-400 bg-white font-['Inter',Helvetica] font-medium text-base relative hover:bg-gray-50 transition-colors mt-2"
            >
              <span className="absolute left-[18px]">Login</span>
              <div className="absolute w-[26px] h-[26px] top-1 left-[62px] bg-white rounded-[50px] border border-solid border-gray-400" />
            </Button>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};