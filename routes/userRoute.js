import express from "express";
import { register } from "../controller/user_IT/Auth/registerController.js";
import { login } from "../controller/user_IT/Auth/loginControlller.js";
import { verifyEmail } from "../controller/verifyEmail.js";
import { resetPasswordConfirm } from "../controller/user_IT/Auth/resetPasswordConfirm.js";
import { resetPasswordRequest } from "../controller/user_IT/Auth/resetPasswordRequest.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password/request", resetPasswordRequest);
router.post("/reset-password/confirm", resetPasswordConfirm);
router.get("/verify-email", verifyEmail);
export default router;
