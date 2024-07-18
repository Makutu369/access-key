import { sendMail } from "../../../utils/sendMail.js";

/**
 * TODO:
 * 1. get user email
 * 2. verify if user is in database
 * 3. send email verification on a separate route on verified
 * 4. Get a post request on that same route
 * 5. save new user data in database
 * 6. send response to user
 */

const resetController = (req, res) => {
  const email = req.body;
  if (!email) return res.status(400).json({ message: "invalid details" });
};

export default resetController;
