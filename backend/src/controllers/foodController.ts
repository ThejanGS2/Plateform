import { Request, Response } from 'express';
import Category from '../models/Category';
import Food from '../models/Food';

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFoods = async (req: Request, res: Response) => {
  const { categoryId } = req.query;
  try {
    let filter = {};
    if (categoryId) {
      filter = { category: categoryId };
    }

    const foods = await Food.find(filter).populate('category');
    res.json(foods);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const food = await Food.findById(id).populate('category');
    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(food);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const createFood = async (req: Request, res: Response) => {
  const { name, category, price, description, imageUrl, isAvailable } = req.body;
  try {
    const newFood = await Food.create({ name, category, price, description, imageUrl, isAvailable });
    res.status(201).json(newFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateFood = async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedFood = await Food.findByIdAndUpdate(id, updates, { new: true });
    if (!updatedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteFood = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedFood = await Food.findByIdAndDelete(id);
    if (!deletedFood) {
      return res.status(404).json({ message: 'Food not found' });
    }
    res.json({ message: 'Food deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
