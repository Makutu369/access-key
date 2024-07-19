import { User } from "../../../model/user.js";
import { sendMail } from "../../../utils/sendMail.js";
import { validate } from "../../../utils/validate.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
/**
 * TODO:
 * 1. get user detail
 * 2. verify if details is not null  and validate
 * 3. check if user exist in database
 * 4. save user (verified : false , hashed passwordk)
 * 5. send email verifiction
 * 6. send response to client
 */

const saveUser = async (email, password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    password: hashedPassword,
  });

  try {
    await user.save();
    return user;
  } catch (error) {}
};

const genVerificationLink = (email) => {
  const token = jwt.sign({ email }, process.env.EMAIL_PRIVATE_KEY);
  const verificationLink = `${process.env.HOST_URL}/user/verify-email?token=${token}`;
  return verificationLink;
};

//main function
const register = async (req, res) => {
  //get user data
  const { email, password } = req.body;

  //verify data from req.body
  if (!email || !password)
    return res.status(401).json({ message: "invalid details" });
  const user = await User.findOne({ email });
  if (user) return res.status(401).json({ msg: "user already exist" });

  //check for validity of data
  const result = validate(email, password);
  if (result) return res.status(401).json({ error: result.issues });

  //save user
  const savedUser = saveUser(email, password);

  //get verification link
  const verificationLink = genVerificationLink(email);

  //send mail
  const title = `Dear ${email} verify  your email with the link below`;
  const subject = "Email Verification";
  sendMail(email, verificationLink, subject, title);

  //return a valid response to the user
  return res
    .status(200)
    .json({ msg: `user saved successfully verify email and password`, email });
};

export { register };
