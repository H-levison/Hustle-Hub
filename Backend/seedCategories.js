const mongoose = require("mongoose");
const Category = require("./models/Category");
require("dotenv").config();

// Predefined categories
const predefinedCategories = [
  "Digital Products & Services",
  "Transport & Logistics", 
  "Beauty & Personal Care",
  "Home & Living",
  "Health & Wellness",
  "Services",
  "Books & Stationeries",
  "Electronics & Gadgets",
  "Food & Beverages",
  "Fashion & Apparel",
  "Others"
];

async function seedCategories() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/hustlehub");
    console.log("Connected to MongoDB");

    // Clear existing categories
    await Category.deleteMany({});
    console.log("Cleared existing categories");

    // Insert predefined categories
    const categoryDocuments = predefinedCategories.map(name => ({ name }));
    const result = await Category.insertMany(categoryDocuments);
    
    console.log(`Successfully seeded ${result.length} categories:`);
    result.forEach(cat => {
      console.log(`- ${cat.name} (ID: ${cat._id})`);
    });

    console.log("Category seeding completed successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

// Run the seeder
seedCategories(); 