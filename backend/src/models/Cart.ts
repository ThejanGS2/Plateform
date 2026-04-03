import mongoose, { Schema, Document } from 'mongoose';

export interface ICartItem {
  food: mongoose.Types.ObjectId;
  quantity: number;
  size?: string;
  price: number;
}

export interface ICart extends Document {
  user: mongoose.Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
}

const CartSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  items: [{
    food: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
    quantity: { type: Number, required: true, default: 1 },
    size: { type: String },
    price: { type: Number, required: true }
  }],
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model<ICart>('Cart', CartSchema);
