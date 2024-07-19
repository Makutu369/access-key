import express from "express";
import { register } from "../controller/user_IT/Auth/registerController.js";
import { login } from "../controller/user_IT/Auth/loginControlller.js";
import { resetPasswordController } from "../controller/user_IT/Auth/resetPasswordController.js";
import { verifyEmail } from "../controller/verifyEmail.js";
import { verifyReset } from "../controller/user_IT/Auth/verifyReset.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPasswordController);
router.post("/reset-password/:token", verifyReset);
router.get("/verify-email", verifyEmail);
export default router;
