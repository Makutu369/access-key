import { User } from "../../model/user.js";
import { AccessKey } from "../../model/access_key.js";
import crypto from "crypto";
import schema from "../../utils/validate_id.js";
/**
 * TODO:
 * 1. check if user exists in database with id
 * 2. if user exists check if user has an active key
 * 3. if user doesn't  have an active generate an active key with 7 day expiry
 * 4. if
 *
 */

const generateUniqueKey = () => {
  const randomBytes = crypto.randomBytes(16);
  const hexString = randomBytes.toString("hex");
  return hexString;
};
const generateKey = () => {
  const randomBytes = crypto.randomBytes(16);
  const hexString = randomBytes.toString("hex");
  return hexString;
};

const generateActiveKey = async (userId) => {
  //set expiry date to 7 days
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  const key = new AccessKey({
    key: generateKey(),
    status: "active",
    expiryDate,
    user: userId,
  });

  await key.save();

  return key;
};

const genKeyController = async (req, res) => {
  const { id } = req.params;

  //validate bson id to prevent unnecessary errors
  const result = schema.safeParse({ id });
  if (!result.success)
    return res.status(400).json({ message: "invalid details" });

  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const activeKey = await AccessKey.findOne({ user: id, status: "active" });
  if (activeKey) {
    return res.status(400).json({
      message: "Cannot generate new key",
      reason: "Already active key",
    });
  }

  const newKey = await generateActiveKey(id);
  user.keys.push(newKey._id);
  await user.save();

  res.status(200).json({ key: newKey.key });
};

export { genKeyController };
