const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded; // Add user data to request
    next(); // Proceed to route
  } catch (err) {
    console.error("JWT error:", err);
    res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = authMiddleware;
