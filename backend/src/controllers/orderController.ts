import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Order from '../models/Order';
import Notification from '../models/Notification';
import Food from '../models/Food';

export const getChefStats = async (req: AuthRequest, res: Response) => {
  try {
    const runningOrders = await Order.countDocuments({ status: 'preparing' });
    const orderRequests = await Order.countDocuments({ status: 'accepted' });

    // Popular items aggregation
    const popularItems = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.food',
          orderCount: { $sum: '$items.quantity' }
        }
      },
      { $sort: { orderCount: -1 } },
      { $limit: 4 },
      {
        $lookup: {
          from: 'foods',
          localField: '_id',
          foreignField: '_id',
          as: 'foodDetails'
        }
      },
      { $unwind: '$foodDetails' },
      {
        $project: {
          name: '$foodDetails.name',
          uri: '$foodDetails.imageUrl',
          orders: '$orderCount'
        }
      }
    ]);

    // Calculate average rating from available foods
    const foods = await Food.find({});
    const totalRating = foods.reduce((sum, f) => sum + (f.rating || 0), 0);
    const averageRating = foods.length > 0 ? (totalRating / foods.length).toFixed(1) : '4.5';

    res.json({
      runningOrders,
      orderRequests,
      popularItems,
      averageRating,
      totalReviews: Math.max(20, foods.length * 3) // Dynamic placeholder
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

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
      status: 'pending'
    });
    
    res.status(201).json(newOrder);

    // Create Notification
    try {
      await Notification.create({
        user: userId,
        title: 'Payment Confirmed',
        message: `Successfully processed Rs.${totalAmount} for your recent order.`,
        type: 'ORDER_STATUS'
      });
    } catch (nErr) {
      console.error('Failed to create notification:', nErr);
    }
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
    const order = await Order.findById(id)
      .populate('items.food')
      .populate('user', 'fullName');
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllOrders = async (req: AuthRequest, res: Response) => {
  const { status } = req.query;
  try {
    const filter = status ? { status } : {};
    const orders = await Order.find(filter)
      .populate('items.food')
      .populate('user', 'fullName email')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  const { id } = req.params;
  const { status, pickupLocation, dropoffLocation } = req.body;
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status, pickupLocation, dropoffLocation },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(updatedOrder);

    // Create Notification based on status
    try {
      let title = '';
      let message = '';
      
      switch (status) {
        case 'accepted':
          title = 'Order Confirmed';
          message = 'The restaurant has accepted your order and will start preparing soon.';
          break;
        case 'preparing':
          title = 'Chef is cooking';
          message = 'Your food is being prepared with care!';
          break;
        case 'out_for_delivery':
          title = 'Out for Delivery';
          message = 'Your order is on the way! Arriving soon.';
          break;
        case 'delivered':
          title = 'Order Delivered';
          message = 'Your order has been delivered. Enjoy your meal!';
          break;
      }

      if (title) {
        await Notification.create({
          user: updatedOrder.user,
          title,
          message,
          type: 'ORDER_STATUS'
        });
      }
    } catch (nErr) {
      console.error('Failed to create status notification:', nErr);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
