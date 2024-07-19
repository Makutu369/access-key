import { sendMail } from "../../../utils/sendMail.js";
import { User } from "../../../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

/**
 * TODO:
 * 1. get user email
 * 2. verify if user is in database
 * 3. send email verification on a separate route on verified
 * 4. Get a post request on that same route
 * 5. save new user data in database
 * 6. send response to user
 */

const resetPasswordController = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Invalid details" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const resetToken = jwt.sign({ email }, process.env.RESET_PASSWORD_KEY);

  const resetLink = `${process.env.HOST_URL}/api/user/reset-password/${resetToken}`;
  //send mail
  const subject = "Reset Password";
  const title = `Dear ${email} tap on use the link below to reset password`;
  await sendMail(email, resetLink, subject, title);

  return res.status(200).json({ message: "Password reset link sent" });
};

export { resetPasswordController };
