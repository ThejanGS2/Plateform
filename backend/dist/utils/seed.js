"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("../config/db"));
const Category_1 = __importDefault(require("../models/Category"));
const Food_1 = __importDefault(require("../models/Food"));
dotenv_1.default.config();
const seedData = async () => {
    try {
        await (0, db_1.default)();
        // Clear existing data
        await Category_1.default.deleteMany({});
        await Food_1.default.deleteMany({});
        console.log('Seeding categories...');
        const categories = await Category_1.default.insertMany([
            { name: 'Burger', icon: 'burger.png', color: '#FFD700' },
            { name: 'Hotdog', icon: 'hotdog.png', color: '#FFA500' },
            { name: 'Pizza', icon: 'pizza.png', color: '#FF6347' },
            { name: 'Coffee', icon: 'coffee.png', color: '#8B4513' },
        ]);
        console.log('Seeding food items...');
        await Food_1.default.insertMany([
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
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};
seedData();
