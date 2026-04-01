import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Order from '../models/Order';

export const placeOrder = async (req: AuthRequest, res: Response) => {
  const { totalAmount, deliveryAddress, items } = req.body;
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const newOrder = await Order.create({
      user: userId,
      totalAmount,
      deliveryAddress,
      items, // Expecting array of { food, quantity, size, price }
      status: 'PLACED'
    });
    
    res.status(201).json(newOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ message: 'User not authenticated' });
  }

  try {
    const orders = await Order.find({ user: userId })
      .populate('items.food')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getOrderStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id).select('status');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json({ status: order.status });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
