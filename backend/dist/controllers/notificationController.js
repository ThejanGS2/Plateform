"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.getMyNotifications = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification_1.default.find({ user: req.user?.id }).sort({ createdAt: -1 });
        res.json(notifications);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.getMyNotifications = getMyNotifications;
const markAsRead = async (req, res) => {
    const { id } = req.params;
    try {
        const notification = await Notification_1.default.findOneAndUpdate({ _id: id, user: req.user?.id }, { isRead: true }, { new: true });
        res.json(notification);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
exports.markAsRead = markAsRead;
