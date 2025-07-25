import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import LoyaltyCards from "./pages/Loyatycards";
import Explore from "./pages/Explore";
import Product from "./pages/Product";
import Shop from "./pages/Shop";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import ForgotPassword from "./pages/auth/forgot-password";
import Cart from "./pages/Cart";
import VendorShop from "./pages/VendorShop";
import { CartProvider } from "./CartContext";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <CartProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/loyalty-cards" element={<LoyaltyCards />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/shop/:id" element={<Shop />} />
          <Route path="/vendorshop" element={<VendorShop />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </HashRouter>
    </CartProvider>
  </StrictMode>,
);
