import React, { useState } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export const NotificationStrip = (): JSX.Element => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return <></>;

  return (
    <div className="w-full h-10  relative flex items-center justify-center">
      <div className="font-sans text-xs text-black">
        <span className="font-medium">For customer service, </span>
        <span className="font-bold"> <u>Please ask support assistance</u></span>
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 h-6 w-6 p-0 hover:bg-gray-300"
        onClick={() => setIsVisible(false)}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};