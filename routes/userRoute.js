import express from "express";
import { register } from "../controller/user_IT/Auth/registerController.js";
import { login } from "../controller/user_IT/Auth/loginControlller.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);

export default router;
