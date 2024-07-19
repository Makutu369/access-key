import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../model/user.js";
dotenv.config();

const verifyEmail = async (req, res) => {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.EMAIL_PRIVATE_KEY);
    const { email } = decodedToken;

    const updatedUser = await User.findOneAndUpdate(
      { email },
      { verified: true },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error verifying token" });
  }
};

export { verifyEmail };
