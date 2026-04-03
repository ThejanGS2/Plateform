import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Notification from '../models/Notification';

export const getMyNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await Notification.find({ user: req.user?.id }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const markAsRead = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const notification = await Notification.findOneAndUpdate(
      { _id: id, user: req.user?.id },
      { isRead: true },
      { new: true }
    );
    res.json(notification);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
