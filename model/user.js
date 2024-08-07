import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  verified: { type: Boolean, default: false },
  keys: [{ type: Schema.Types.ObjectId, ref: "AccessKey" }],
});

const User = model("User", userSchema);

export { User };
