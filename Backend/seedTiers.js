const mongoose = require('mongoose');
const Tier = require('./models/Tier');
require('dotenv').config();

// Predefined tiers
const predefinedTiers = [
  { name: 'Bronze', displayName: 'Bronze', color: 'bg-[#cd7f32]', description: 'Entry level tier' },
  { name: 'Silver', displayName: 'Silver', color: 'bg-[#C0C0C0]', description: 'Intermediate tier' },
  { name: 'Gold', displayName: 'Gold', color: 'bg-[#FFD700]', description: 'Advanced tier' },
  { name: 'Platinum', displayName: 'Platinum', color: 'bg-[#e5e4e2]', description: 'Top tier' },
];

async function seedTiers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hustlehub');
    console.log('Connected to MongoDB');

    // Clear existing tiers
    await Tier.deleteMany({});
    console.log('Cleared existing tiers');

    // Insert predefined tiers
    const result = await Tier.insertMany(predefinedTiers);
    console.log(`Successfully seeded ${result.length} tiers:`);
    result.forEach(tier => {
      console.log(`- ${tier.displayName || tier.name} (ID: ${tier._id})`);
    });

    console.log('Tier seeding completed successfully!');
  } catch (error) {
    console.error('Error seeding tiers:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

// Run the seeder
seedTiers(); 