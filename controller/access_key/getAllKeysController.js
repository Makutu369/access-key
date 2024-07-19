import { User } from "../../model/user.js";
import { AccessKey } from "../../model/access_key.js";
import schemaId from "../../utils/validate_id.js";
/**
 * TODO :
 * 1. get user id
 * 2. from user id get all keys
 * 3. find all keys with user
 * -------------------------------
 * - make sure to catch error
 * - validate user bson id
 * -
 */

const getAllKeysController = async (req, res) => {
  const { id } = req.params;
  const result = schemaId.safeParse({ id });

  if (!result.success)
    return res.status(400).json({ message: "invalid user details" });

  const keys = await AccessKey.find({ user: id });
  res.status(200).json(keys);
};

export { getAllKeysController };
