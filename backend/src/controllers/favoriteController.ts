import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Favorite from '../models/Favorite';

export const getFavorites = async (req: AuthRequest, res: Response) => {
  try {
    const favorites = await Favorite.find({ user: req.user?.id }).populate('food');
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const toggleFavorite = async (req: AuthRequest, res: Response) => {
  const { foodId } = req.body;
  try {
    const existing = await Favorite.findOne({ user: req.user?.id, food: foodId });
    if (existing) {
      await Favorite.deleteOne({ _id: existing._id });
      res.json({ isFavorite: false });
    } else {
      await Favorite.create({ user: req.user?.id, food: foodId });
      res.json({ isFavorite: true });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
