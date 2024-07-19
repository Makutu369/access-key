import jwt from "jsonwebtoken";
import { validate } from "../../../utils/validate.js";
import { User } from "../../../model/user.js";
import bcrypt from "bcrypt";
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
  const validationError = validate(email, password);

  if (validationError) {
    return res.status(400).json({ message: "Invalid user details" });
  }

  const existingUser = await User.findOne({ email });

  if (
    !existingUser ||
    !(await bcrypt.compare(password, existingUser.password))
  ) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const tokenPayload = {
    userId: existingUser._id,
    email: existingUser.email,
  };

  const token = jwt.sign(tokenPayload, process.env.USER_SECRET_KEY);
  res
    .status(200)
    .setHeader("x-auth-token", token)
    .json({ message: "Authenticated" });
};

export { login };
