import jwt from "jsonwebtoken";
const adminAuthController = async (req, res, next) => {
  try {
    const token = req.headers["x-auth-token"];
    const decoded = jwt.verify(token, process.env.ADMIN_SECRET);
    if (decoded.role !== "admin")
      return res.status(403).json({ error: "Admin only" });
    next();
  } catch (error) {
    return res.status(401).json({ error: "unauthorized" });
  }
};

export { adminAuthController };
