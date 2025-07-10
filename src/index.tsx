import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import LoyaltyCards from "./pages/Loyatycards";
import Explore from "./pages/Explore";
import Product from "./pages/Product";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/loyalty-cards" element={<LoyaltyCards />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/product/:id" element={<Product />} />
      </Routes>
    </HashRouter>
  </StrictMode>,
);
