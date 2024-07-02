import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["SchoolIT", "Admin"], required: true },
  verified: { type: Boolean, default: false },
});

const User = model("User", userSchema);

export { User };
