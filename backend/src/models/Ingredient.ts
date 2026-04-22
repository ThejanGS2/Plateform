import mongoose, { Schema, Document } from 'mongoose';

export interface IIngredient extends Document {
  name: string;
  unit: string;
  currentStock: number;
  minThreshold: number;
  createdAt: Date;
}

const IngredientSchema: Schema = new Schema({
  name: { type: String, required: true },
  unit: { type: String, required: true },
  currentStock: { type: Number, default: 0 },
  minThreshold: { type: Number, default: 10 },
  createdAt: { type: Date, default: Date.now }
});

export const Ingredient = mongoose.model<IIngredient>('Ingredient', IngredientSchema);
export default Ingredient;
