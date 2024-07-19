import { AccessKey } from "../../model/access_key.js";
/**
 * TODO:
 * 1. get key and user schema
 * 2. get all keys on the platform
 * 3. make changes by revoking or updating keys
 */

const keyController = async (req, res) => {
  try {
    //get all keys from schema
    const keys = await AccessKey.find();
    res.json(keys);
  } catch (err) {
    res.status(500).json({ error: "internal server error" });
  }
};

export { keyController };
