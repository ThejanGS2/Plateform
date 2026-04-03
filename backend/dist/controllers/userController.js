"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addPaymentMethod = exports.getPaymentMethods = exports.removeAddress = exports.addAddress = exports.getAddresses = void 0;
const User_1 = __importDefault(require("../models/User"));
// Addresses
const getAddresses = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user?.id).select('addresses');
        res.json(user?.addresses || []);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getAddresses = getAddresses;
const addAddress = async (req, res) => {
    const { label, street, city, isDefault } = req.body;
    try {
        const user = await User_1.default.findById(req.user?.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        if (isDefault) {
            user.addresses.forEach(addr => addr.isDefault = false);
        }
        user.addresses.push({ label, street, city, isDefault });
        await user.save();
        res.status(201).json(user.addresses);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.addAddress = addAddress;
const removeAddress = async (req, res) => {
    const { addressId } = req.params;
    try {
        const user = await User_1.default.findById(req.user?.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
        await user.save();
        res.json(user.addresses);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.removeAddress = removeAddress;
// Payment Methods
const getPaymentMethods = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.user?.id).select('paymentMethods');
        res.json(user?.paymentMethods || []);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getPaymentMethods = getPaymentMethods;
const addPaymentMethod = async (req, res) => {
    const { cardHolder, cardNumber, expiryDate, cardType, isDefault } = req.body;
    try {
        const user = await User_1.default.findById(req.user?.id);
        if (!user)
            return res.status(404).json({ message: 'User not found' });
        if (isDefault) {
            user.paymentMethods.forEach(pm => pm.isDefault = false);
        }
        user.paymentMethods.push({ cardHolder, cardNumber, expiryDate, cardType, isDefault });
        await user.save();
        res.status(201).json(user.paymentMethods);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.addPaymentMethod = addPaymentMethod;
