import { Request, Response } from 'express';
import WasteLog from '../models/WasteLog';
import Ingredient from '../models/Ingredient';

export const logWaste = async (req: Request, res: Response) => {
  try {
    const { ingredient, quantity, reason, loggedBy } = req.body;
    
    // Create log entry
    const newLog = new WasteLog({ ingredient, quantity, reason, loggedBy });
    await newLog.save();

    // Decrement stock
    await Ingredient.findByIdAndUpdate(ingredient, {
      $inc: { currentStock: -quantity }
    });

    res.status(201).json(newLog);
  } catch (error: any) {
    res.status(400).json({ message: 'Error logging waste', error: error.message });
  }
};

export const getWasteLogs = async (req: Request, res: Response) => {
  try {
    const logs = await WasteLog.find()
      .populate('ingredient')
      .populate('loggedBy', 'name email')
      .sort({ date: -1 });
    res.status(200).json(logs);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching waste logs', error: error.message });
  }
};
export const updateWasteLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { quantity, reason } = req.body;

    const oldLog = await WasteLog.findById(id);
    if (!oldLog) return res.status(404).json({ message: 'Log not found' });

    const diff = oldLog.quantity - quantity;

    const updatedLog = await WasteLog.findByIdAndUpdate(
      id,
      { quantity, reason },
      { new: true }
    );

    // Adjust stock based on the difference
    await Ingredient.findByIdAndUpdate(oldLog.ingredient, {
      $inc: { currentStock: diff }
    });

    res.status(200).json(updatedLog);
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating waste log', error: error.message });
  }
};

export const deleteWasteLog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const log = await WasteLog.findById(id);
    if (!log) return res.status(404).json({ message: 'Log not found' });

    // Restore stock
    await Ingredient.findByIdAndUpdate(log.ingredient, {
      $inc: { currentStock: log.quantity }
    });

    await WasteLog.findByIdAndDelete(id);
    res.status(200).json({ message: 'Waste log deleted and stock restored' });
  } catch (error: any) {
    res.status(400).json({ message: 'Error deleting waste log', error: error.message });
  }
};
