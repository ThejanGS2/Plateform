import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress {
  label: string; // e.g., 'Home', 'Office'
  street: string;
  city: string;
  postCode: string;
  apartment: string;
  isDefault: boolean;
}

export interface IPaymentMethod {
  cardHolder: string;
  cardNumber: string; // Masked or partial
  expiryDate: string;
  cardType: string;
  cvc: string;
  isDefault: boolean;
}

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
  bio?: string;
  avatarUrl?: string;
  role: 'customer' | 'admin' | 'chef' | 'driver';
  isVerified: boolean;
  verificationCode?: string;
  addresses: IAddress[];
  paymentMethods: IPaymentMethod[];
  createdAt: Date;
}

const AddressSchema = new Schema({
  label: { type: String },
  street: { type: String },
  city: { type: String },
  postCode: { type: String },
  apartment: { type: String },
  isDefault: { type: Boolean, default: false }
});

const PaymentMethodSchema = new Schema({
  cardHolder: { type: String },
  cardNumber: { type: String },
  expiryDate: { type: String },
  cardType: { type: String },
  cvc: { type: String },
  isDefault: { type: Boolean, default: false }
});

const UserSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  bio: { type: String },
  avatarUrl: { type: String },
  role: { type: String, enum: ['customer', 'admin', 'chef', 'driver'], default: 'customer' },
  isVerified: { type: Boolean, default: false },
  verificationCode: { type: String },
  addresses: [AddressSchema],
  paymentMethods: [PaymentMethodSchema],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<IUser>('User', UserSchema);
