import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from '../config/db';
import Category from '../models/Category';
import Food from '../models/Food';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Category.deleteMany({});
    await Food.deleteMany({});

    console.log('Seeding categories...');
    const categories = await Category.insertMany([
      { name: 'Hot Dog', icon: 'hotdog.png', color: '#FFA500' },
      { name: 'Burger',  icon: 'burger.png',  color: '#FFD700' },
      { name: 'Pizza',   icon: 'pizza.png',   color: '#FF6347' },
      { name: 'Mexican', icon: 'mexican.png', color: '#FF8C00' },
      { name: 'Asian',   icon: 'asian.png',   color: '#FF4500' },
      { name: 'Dessert', icon: 'dessert.png', color: '#FF1493' },
      { name: 'Drink',   icon: 'drink.png',   color: '#1E90FF' },
      { name: 'Salad',   icon: 'salad.png',   color: '#32CD32' },
    ]);

    console.log('Seeding food items...');
    await Food.insertMany([
      {
        category: categories[0]._id,
        name: 'Classic Cheeseburger',
        description: 'Juicy beef patty with cheddar cheese and fresh lettuce.',
        price: 12.99,
        rating: 4.5,
        imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd',
        isAvailable: true
      },
      {
        category: categories[1]._id,
        name: 'Gourmet Hot Dog',
        description: 'Premium beef sausage with grilled onions and mustard.',
        price: 8.50,
        rating: 4.8,
        imageUrl: 'https://images.unsplash.com/photo-1541232399669-e34766e1f13d',
        isAvailable: true
      },
      {
        category: categories[2]._id,
        name: 'Margherita Pizza',
        description: 'Fresh basil, tomatoes, and mozzarella cheese.',
        price: 15.00,
        rating: 4.7,
        imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591',
        isAvailable: true
      }
    ]);

    console.log('Successfully seeded database!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedData();
