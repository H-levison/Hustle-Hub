import React from "react";
import { SearchIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";

export const HeroSection = (): JSX.Element => {
  

  return (
    <div className="mx-8">
<div className="grid grid-cols-4 grid-rows-3 gap-1 h-[420px] mt-8">
    <div className="bg-gray-500 col-span-2 row-span-2  rounded-lg ">1</div>
    <div className="bg-gray-500 col-start-1 row-start-3 rounded-lg">2</div>
    <div className="bg-gray-500 col-start-2 row-start-3 rounded-lg">3</div>
    <div className="bg-gray-500 col-start-3 row-start-1 rounded-lg">4</div>
    <div className="bg-gray-500 row-span-2 col-start-3 rounded-lg row-start-2">5</div>
    <div className="bg-gray-500 row-span-3 col-start-4 rounded-lg row-start-1">6</div>
</div>
    </div>
    
  );
};

