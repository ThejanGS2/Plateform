import mongoose, { Schema, Document } from 'mongoose';

export interface IFood extends Document {
  category: mongoose.Types.ObjectId;
  name: string;
  description: string;
  price: number;
  rating: number;
  imageUrl: string;
  isAvailable: boolean;
  recipe: string[];
  ingredients: Array<{ label: string; emoji: string }>;
  createdAt: Date;
}

const FoodSchema: Schema = new Schema({
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  rating: { type: Number, default: 0 },
  imageUrl: { type: String },
  isAvailable: { type: Boolean, default: true },
  recipe: { type: [String], default: [] },
  ingredients: [{
    label: { type: String },
    emoji: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IFood>('Food', FoodSchema);
