import { Request, Response } from 'express';
import Supplier from '../models/Supplier';

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.find().sort({ name: 1 });
    res.status(200).json(suppliers);
  } catch (error: any) {
    res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res.status(201).json(newSupplier);
  } catch (error: any) {
    res.status(400).json({ message: 'Error creating supplier', error: error.message });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const supplier = await Supplier.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(supplier);
  } catch (error: any) {
    res.status(400).json({ message: 'Error updating supplier', error: error.message });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    await Supplier.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Supplier deleted' });
  } catch (error: any) {
    res.status(400).json({ message: 'Error deleting supplier', error: error.message });
  }
};
