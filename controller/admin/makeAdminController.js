import bcrypt from "bcrypt";
import { validate } from "../../utils/validate.js";
import { Admin } from "../../model/admin.js";
/**
 * controller to make admin since specification was silent on it
 * TODO:
 * 1. get admin details from body {email, password}
 * 2. validate the details
 * 3. make a new admin
 * 4. save the admin to db
 * 5. return correct to the user
 */
const generateHashedPassword = async (password) => {
  if (!password) return null;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

const makeAdminController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validationError = validate(email, password);
    if (validationError)
      return res.status(400).json({ error: validationError });

    const hashedPassword = await generateHashedPassword(password);
    if (!hashedPassword)
      return res.status(500).json({ error: "Error generating password" });

    const admin = new Admin({ email, password: hashedPassword });

    await admin.save();

    res
      .status(201)
      .json({ message: "Admin created successfully", data: admin.email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { makeAdminController };
