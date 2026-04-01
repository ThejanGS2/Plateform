import mongoose, { Schema, Document } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  icon: string;
  color: string;
}

const CategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  icon: { type: String },
  color: { type: String }
});

export default mongoose.model<ICategory>('Category', CategorySchema);
