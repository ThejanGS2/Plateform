import mongoose, { Schema, Document } from 'mongoose';

export interface INotification extends Document {
  user: mongoose.Types.ObjectId;
  title: string;
  message: string;
  type: 'ORDER_STATUS' | 'PROMOTION' | 'ACCOUNT';
  isRead: boolean;
  createdAt: Date;
}

const NotificationSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['ORDER_STATUS', 'PROMOTION', 'ACCOUNT'], 
    default: 'ORDER_STATUS' 
  },
  isRead: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model<INotification>('Notification', NotificationSchema);
