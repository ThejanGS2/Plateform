"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartItem = exports.addToCart = exports.getCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const getCart = async (req, res) => {
    try {
        let cart = await Cart_1.default.findOne({ user: req.user?.id }).populate('items.food');
        if (!cart) {
            cart = await Cart_1.default.create({ user: req.user?.id, items: [] });
        }
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getCart = getCart;
const addToCart = async (req, res) => {
    const { foodId, quantity, size, price } = req.body;
    try {
        let cart = await Cart_1.default.findOne({ user: req.user?.id });
        if (!cart) {
            cart = new Cart_1.default({ user: req.user?.id, items: [] });
        }
        const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId && item.size === size);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        }
        else {
            cart.items.push({ food: foodId, quantity, size, price });
        }
        cart.updatedAt = new Date();
        await cart.save();
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.addToCart = addToCart;
const updateCartItem = async (req, res) => {
    const { foodId, quantity, size } = req.body;
    try {
        const cart = await Cart_1.default.findOne({ user: req.user?.id });
        if (!cart)
            return res.status(404).json({ message: 'Cart not found' });
        const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId && item.size === size);
        if (itemIndex > -1) {
            if (quantity <= 0) {
                cart.items.splice(itemIndex, 1);
            }
            else {
                cart.items[itemIndex].quantity = quantity;
            }
            cart.updatedAt = new Date();
            await cart.save();
            res.json(cart);
        }
        else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.updateCartItem = updateCartItem;
