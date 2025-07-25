const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(express.json()); // middleware

// Connect MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.catch((err) => console.error("❌ MongoDB connection error:", err));

app.get("/users", async (req, res) => {
  try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});