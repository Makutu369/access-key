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
  try {
    //get user id from request
    const user = req.user;
    const id = user.id;
    const result = schemaId.safeParse({ id });

    //validate user id to bson
    if (!result.success)
      return res.status(400).json({ message: "invalid user details" });

    //get all keys associated with user id
    const keys = await AccessKey.find({ user: id });
    res.status(200).json(keys);
  } catch (error) {
    //return any error to user
    res.status(500).json({ error: "internal server error" });
  }
};

export { getAllKeysController };
