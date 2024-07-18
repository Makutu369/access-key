import jwt from "jsonwebtoken";
import { validate } from "../../../utils/validate.js";
import { User } from "../../../model/user.js";

/**
 * TODO:
 * 1. Get user detail
 * 2. Validate user detail
 * 3. check if user exist in database
 * 4. generate jwt token with user id as payload
 * 5. send jwt signed to the user
 */

const login = async (req, res) => {
  const { email, password } = req.body;
  const error = validate(email, password);
  if (error) return res.status(400).json({ message: "invalid user details" });

  const user = await User.find({ email });

  if (!user)
    return res.status(401).json({ message: "user already exist in databse" });

  const payload = {
    userId: user._id,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.userSecretKey);
};

export { login };
