import express from "express";
import { genKeyController } from "../controller/access_key/genKeyController.js";
import { getAllKeysController } from "../controller/access_key/getAllKeysController.js";
import { authKeyController } from "../controller/access_key/authKeyController.js";
const router = express.Router();

router.get("/user/get-key", authKeyController, genKeyController);
router.get("/user/keys", authKeyController, getAllKeysController);

export default router;
