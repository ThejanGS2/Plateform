import mongoose, { Schema, Document } from 'mongoose';

export interface IFavorite extends Document {
  user: mongoose.Types.ObjectId;
  food: mongoose.Types.ObjectId;
  createdAt: Date;
}

const FavoriteSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  food: { type: Schema.Types.ObjectId, ref: 'Food', required: true },
  createdAt: { type: Date, default: Date.now }
});

// Compound index to ensure unique favorite per user/food
FavoriteSchema.index({ user: 1, food: 1 }, { unique: true });

export default mongoose.model<IFavorite>('Favorite', FavoriteSchema);
