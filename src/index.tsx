import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import LoyaltyCards from "./pages/Loyatycards";
import Explore from "./pages/Explore";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/loyalty-cards" element={<LoyaltyCards />} />
        <Route path="/explore" element={<Explore />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
