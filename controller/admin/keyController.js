import { AccessKey } from "../../model/access_key.js";
import { User } from "../../model/user.js";
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

    const updatedKeys = await Promise.all(
      keys.map(async (key) => {
        const user = await User.findById(key.user);
        return {
          ...key.toObject(),
          user: { id: key.user, email: user.email },
        };
      })
    );
    res.json(updatedKeys);
  } catch (err) {
    res.status(500).json({ error: "internal server error", msg: err.message });
  }
};

export { keyController };
