import z from "zod";
import { User } from "../../model/user.js";
import { AccessKey } from "../../model/access_key.js";
/**
 * TODO:
 * get email from query param
 * validate email
 * verify if a user exists with that email
 * get the id of user from the email
 * get the key of the user using reference id
 * check and return status of the key
 */
const validateEmail = (email) => {
  const emailSchema = z.string().email();
  const result = emailSchema.safeParse(email);
  return result.success;
};

const keyStatusController = async (req, res) => {
  try {
    //get email from query param
    const { email } = req.query;

    //validate email
    const isValidEmail = validateEmail(email);

    if (isValidEmail == false)
      return res.status(400).json({ message: "Invalid email" });

    //check if user exists with that email
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    //get the key of the user from the key schema using reference id
    const key = await AccessKey.find({ user: user._id });
    const activeKey = key.find((k) => k.status === "active");
    if (!activeKey)
      return res.status(404).json({ message: "no active key found" });

    //return the active key to the user
    res.status(200).json({ message: "active key found", activeKey });
  } catch (error) {
    res.status(500).json({ error: "internal server error" });
  }
};

export { keyStatusController };
