import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../../../model/user.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * TODO:
 * 1. get token from params if not work take as query
 * 2. verify token with jwt
 * 3. if verified get new password from body
 * 4. save password as hash in db
 */

const resetPasswordConfirm = async (req, res) => {
  const { token } = req.query;
  // check if a user has a token
  if (!token) return res.status(400).json({ message: "Invalid token" });
  try {
    const payload = jwt.verify(token, process.env.RESET_PASSWORD_KEY);
    const newPassword = req.body.password;
    const { email } = payload;
    const user = await User.findOneAndUpdate(
      { email },
      { password: await bcrypt.hash(newPassword, 10) },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Password reset successfully", data: email });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Invalid token" });
  }
};

export { resetPasswordConfirm };
