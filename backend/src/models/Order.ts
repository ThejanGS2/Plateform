import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user: mongoose.Types.ObjectId;
  items: Array<{
    food: mongoose.Types.ObjectId;
    quantity: number;
    size: string;
    price: number;
  }>;
  totalAmount: number;
  status: string;
  deliveryAddress: string;
  createdAt: Date;
}

const OrderSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    food: { type: Schema.Types.ObjectId, ref: 'Food' },
    quantity: { type: Number, required: true },
    size: { type: String },
    price: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['PLACED', 'PREPARING', 'DELIVERING', 'DELIVERED'], default: 'PLACED' },
  deliveryAddress: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
