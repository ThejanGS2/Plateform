import { Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import Cart from '../models/Cart';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    let cart = await Cart.findOne({ user: req.user?.id }).populate('items.food');
    if (!cart) {
      cart = await Cart.create({ user: req.user?.id, items: [] });
    }
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  const { foodId, quantity, size, price } = req.body;
  try {
    let cart = await Cart.findOne({ user: req.user?.id });
    if (!cart) {
      cart = new Cart({ user: req.user?.id, items: [] });
    }

    const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId && item.size === size);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ food: foodId as any, quantity, size, price });
    }

    cart.updatedAt = new Date();
    await cart.save();
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  const { foodId, quantity, size } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.user?.id });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex(item => item.food.toString() === foodId && item.size === size);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      cart.updatedAt = new Date();
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
