"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodById = exports.getFoods = exports.getCategories = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const Food_1 = __importDefault(require("../models/Food"));
const getCategories = async (req, res) => {
    try {
        const categories = await Category_1.default.find();
        res.json(categories);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCategories = getCategories;
const getFoods = async (req, res) => {
    const { categoryId } = req.query;
    try {
        let filter = {};
        if (categoryId) {
            filter = { category: categoryId };
        }
        const foods = await Food_1.default.find(filter).populate('category');
        res.json(foods);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getFoods = getFoods;
const getFoodById = async (req, res) => {
    const { id } = req.params;
    try {
        const food = await Food_1.default.findById(id).populate('category');
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(food);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getFoodById = getFoodById;
