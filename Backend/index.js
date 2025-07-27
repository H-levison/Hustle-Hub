const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); // 
const User = require("./models/User");
require("dotenv").config();
const registerRoute = require("./routes/register");
const loginRoute = require("./routes/login");
const categoriesRoute = require("./routes/categories")
const userBecomeVendorRoute = require("./routes/user")
const BusinessesRoute = require("./routes/businesses")
const productsRoute = require("./routes/products");
const loyaltyRoute = require("./routes/loyalty");
const userLoyaltyRoute = require("./routes/userLoyalty");
const reviewsRoute = require("./routes/reviews");
const ordersRoute = require("./routes/orders");
const tiersRoute = require('./routes/tiers');

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for production
app.use(
  cors({
    origin: process.env.NODE_ENV === 'production' 
      ? [process.env.FRONTEND_URL || 'https://hustlehub-oe51.onrender.com', 'http://localhost:5173'] // Use environment variable
      : "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json()); // JSON middleware

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("API is running");
});

// Register route
app.use("/register", registerRoute);
app.use("/login", loginRoute);
app.use("/categories", categoriesRoute);
app.use("/user", userBecomeVendorRoute);
app.use("/businesses", BusinessesRoute);
app.use("/products", productsRoute);
app.use("/loyalty-cards", loyaltyRoute);
app.use("/user-loyalty", userLoyaltyRoute);
app.use("/reviews", reviewsRoute);
app.use("/orders", ordersRoute);
app.use('/tiers', tiersRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (process.env.NODE_ENV === 'development') {
    console.log(`📍 Local URL: http://localhost:${PORT}`);
  }
});

app.get("/test", (req, res) => {
  res.send("API is working");
});
