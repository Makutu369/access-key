import jwt from "jsonwebtoken";
import { User } from "../../model/user.js";

const authKeyController = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    const decoded = jwt.verify(token, process.env.USER_SECRET_KEY);
    if (!decoded) return res.status(403).json({ error: "Access key required" });
    //check if user id exists in db
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    req.user = user;
    next();
    //
  } catch (error) {
    return res.status(401).json({ error: "unauthorized" });
  }
};

export { authKeyController };
