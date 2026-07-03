import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
mongoose.connect(process.env.DATABASE_URL!);

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

// new — tag schema
const tagSchema = new Schema({
  title: { type: String, required: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
});

const contentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
});

const linkSchema = new Schema({
  linkId: { type: String, unique: true },
  userId: { type: mongoose.Types.ObjectId, ref: 'users', required: true },
});

export const UserModel = model('users', userSchema);
export const TagModel = model('Tag', tagSchema);   // name must match ref: 'Tag'
export const contentModel = model('content', contentSchema);
export const linkModel = model('links', linkSchema);