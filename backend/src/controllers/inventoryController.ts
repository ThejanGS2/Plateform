import { Request, Response } from 'express';
import Ingredient from '../models/Ingredient';

export const getIngredients = async (req: Request, res: Response) => {
  try {
    const ingredients = await Ingredient.find().sort({ name: 1 });
    res.status(200).json(ingredients);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching ingredients', error: error.message });
  }
};

export const createIngredient = async (req: Request, res: Response) => {
  try {
    const newIngredient = new Ingredient(req.body);
    await newIngredient.save();
    res.status(201).json(newIngredient);
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating ingredient', error: error.message });
  }
};

export const updateStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const ingredient = await Ingredient.findByIdAndUpdate(
      id,
      { $inc: { currentStock: quantity } },
      { new: true }
    );
    res.status(200).json(ingredient);
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating stock', error: error.message });
  }
};

export const updateIngredient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ingredient = await Ingredient.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(ingredient);
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating ingredient', error: error.message });
  }
};

export const deleteIngredient = async (req: Request, res: Response) => {
  try {
    await Ingredient.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Ingredient deleted' });
  } catch (error: any) {
    res.status(400).json({ message: 'Error deleting ingredient', error: error.message });
  }
};
