"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderStatus = exports.getMyOrders = exports.placeOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const placeOrder = async (req, res) => {
    const { totalAmount, deliveryAddress, items } = req.body;
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    try {
        const newOrder = await Order_1.default.create({
            user: userId,
            totalAmount,
            deliveryAddress,
            items, // Expecting array of { food, quantity, size, price }
            status: 'PLACED'
        });
        res.status(201).json(newOrder);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.placeOrder = placeOrder;
const getMyOrders = async (req, res) => {
    const userId = req.user?.id;
    if (!userId) {
        return res.status(401).json({ message: 'User not authenticated' });
    }
    try {
        const orders = await Order_1.default.find({ user: userId })
            .populate('items.food')
            .sort({ createdAt: -1 });
        res.json(orders);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getMyOrders = getMyOrders;
const getOrderStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order_1.default.findById(id).select('status');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ status: order.status });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getOrderStatus = getOrderStatus;
