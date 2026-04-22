import mongoose, { Schema, Document } from 'mongoose';

export interface IWasteLog extends Document {
  ingredient: mongoose.Types.ObjectId;
  quantity: number;
  reason: string;
  loggedBy: mongoose.Types.ObjectId;
  date: Date;
}

const WasteLogSchema: Schema = new Schema({
  ingredient: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  quantity: { type: Number, required: true },
  reason: { type: String, required: true },
  loggedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now }
});

export default mongoose.model<IWasteLog>('WasteLog', WasteLogSchema);
