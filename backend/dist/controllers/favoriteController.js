"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleFavorite = exports.getFavorites = void 0;
const Favorite_1 = __importDefault(require("../models/Favorite"));
const getFavorites = async (req, res) => {
    try {
        const favorites = await Favorite_1.default.find({ user: req.user?.id }).populate('food');
        res.json(favorites);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getFavorites = getFavorites;
const toggleFavorite = async (req, res) => {
    const { foodId } = req.body;
    try {
        const existing = await Favorite_1.default.findOne({ user: req.user?.id, food: foodId });
        if (existing) {
            await Favorite_1.default.deleteOne({ _id: existing._id });
            res.json({ isFavorite: false });
        }
        else {
            await Favorite_1.default.create({ user: req.user?.id, food: foodId });
            res.json({ isFavorite: true });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.toggleFavorite = toggleFavorite;
