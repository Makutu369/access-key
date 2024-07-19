import mongoose from "mongoose";

const { Schema, model } = mongoose;

const accessKeySchema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    enum: ["active", "expired", "revoked"],
    default: "active",
  },
  procurementDate: {
    type: Date,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const AccessKey = model("AccessKey", accessKeySchema);

export { AccessKey };
