import React from "react";
import { GlobeIcon } from "lucide-react";
import { Button } from "./ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "./ui/navigation-menu";
import { NavLink } from "react-router-dom";

export const Navigation = (): JSX.Element => {
  const navItems = [
    { label: "Home", to: "/" },
    { label: "Leaderboard", to: "/leaderboard" },
    { label: "Loyalty Cards", to: "/loyalty-cards" },
    { label: "Businesses", to: "/businesses" },
  ];

  return (
    <header className="w-full h-[82px]   relative flex items-center justify-between px-11 border-b shadow-sm">
      {/* Brand logo */}
      <div className="font-extrabold text-[#1c09ed] text-lg font-['Inter',Helvetica]">
        Hustlehub
      </div>

      {/* Navigation menu */}
      <NavigationMenu className="absolute left-1/2 transform -translate-x-1/2">
        <NavigationMenuList className="flex gap-8">
          {navItems.map((item, index) => (
            <NavigationMenuItem key={index}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `font-['Inter',Helvetica] font-medium text-sm cursor-pointer hover:text-[#1c09ed] transition-colors ${
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

      {/* Right side controls */}
      <div className="flex items-center gap-6">
        {/* Language selector */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
          <span className="font-['Inter',Helvetica] font-medium text-black text-sm">
            En
          </span>
          <GlobeIcon size={20} />
        </div>

        {/* Login button */}
        <Button
          variant="outline"
          className="w-[101px] h-[37px] rounded-[40px] border border-solid border-[#1c09ed] bg-white font-['Inter',Helvetica] font-medium text-sm relative hover:bg-gray-50 transition-colors"
        >
          <span className="absolute left-[18px]">Login</span>
          <div className="absolute w-[26px] h-[26px] top-1 left-[62px] bg-white rounded-[50px] border border-solid border-black" />
        </Button>
      </div>
    </header>
  );
};