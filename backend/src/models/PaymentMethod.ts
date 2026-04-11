import mongoose, { Schema, Document } from 'mongoose';

export interface IPaymentMethod extends Document {
  userId: mongoose.Types.ObjectId;
  cardHolder: string;
  cardNumber: string;
  expiryDate: string;
  cardType: string;
  cvc: string;
  isDefault: boolean;
  createdAt: Date;
}

const PaymentMethodSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  cardHolder: { type: String, required: true },
  cardNumber: { type: String, required: true },
  expiryDate: { type: String, required: true },
  cardType: { type: String, required: true },
  cvc: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IPaymentMethod>('PaymentMethod', PaymentMethodSchema);
