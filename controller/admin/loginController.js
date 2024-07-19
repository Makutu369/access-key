import { validate } from "../../utils/validate.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Admin } from "../../model/admin.js";
dotenv.config();
/**
 *
 * TODO:
 * 1. get user details
 * 2. validate details with zod schema
 * 3. check if user exists
 * 4. verify email and password
 * 5. return jwt token based on the data
 * ---------------------------------
 * - validate email and password
 * - handle erros
 */

const loginController = async (req, res) => {
  const { email, password } = req.body;

  const validationError = validate(email, password);
  if (validationError)
    return res.status(400).json({ error: validationError.message });

  const admin = await Admin.findOne({ email });
  if (admin.role !== "admin")
    return res.status(403).json({ error: "must be an admin" });
  if (password !== admin.password)
    return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign(
    { id: admin._id, role: admin.role },
    process.env.ADMIN_SECRET,
    { expiresIn: "30d" }
  );

  res
    .status(200)
    .setHeader("x-auth-token", token)
    .json({ message: "Admin Authenticated" });
};

export { loginController };
