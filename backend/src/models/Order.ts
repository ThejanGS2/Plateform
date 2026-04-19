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
  pickupLocation?: string;
  dropoffLocation?: string;
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
  status: { type: String, enum: ['pending', 'accepted', 'preparing', 'ready_for_pickup', 'out_for_delivery', 'delivered', 'cancelled'], default: 'pending' },
  deliveryAddress: { type: String, required: true },
  pickupLocation: { type: String },
  dropoffLocation: { type: String },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IOrder>('Order', OrderSchema);
