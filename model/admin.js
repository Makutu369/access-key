import { Schema, model } from "mongoose";

const admin = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
});

const Admin = model("Admin", admin);

export { Admin };
