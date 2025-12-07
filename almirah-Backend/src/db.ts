import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import { DATABASE_URL } from "./config.js";

mongoose.connect(DATABASE_URL);

//user schema
const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

export const UserModel = model("users", userSchema);

//content schema
const contentSchema = new Schema({
  title: String,
  link: String,
  tags: [{ type: mongoose.Types.ObjectId, ref: "Tag" }],
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});
export const contentModel = model("content", contentSchema);

//link schema
const linkSchema = new Schema({
  linkId: { type: String, unique: true },
  userId: { type: mongoose.Types.ObjectId, ref: "users", required: true },
});

export const linkModel = model("links", linkSchema);
