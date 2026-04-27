import { Request, Response } from 'express';
import Review from '../models/Review';

// GET /api/reviews — fetch all reviews (admin) or user reviews
export const getReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'fullName avatarUrl')
      .populate('food', 'name imageUrl')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/reviews/my — fetch reviews by logged-in user
export const getMyReviews = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id;
    const reviews = await Review.find({ user: userId })
      .populate('food', 'name imageUrl')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/reviews — create a review
export const createReview = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;
  const { food, order, rating, comment } = req.body;
  try {
    const review = await Review.create({ user: userId, food, order, rating, comment });
    const populated = await Review.findById(review._id)
      .populate('user', 'fullName avatarUrl')
      .populate('food', 'name imageUrl');
    res.status(201).json(populated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/reviews/:id — delete a review
export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Review.findByIdAndDelete(id);
    res.json({ message: 'Review deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
