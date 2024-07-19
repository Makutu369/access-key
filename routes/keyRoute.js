import express from "express";
import { genKeyController } from "../controller/access_key/genKeyController.js";

const router = express.Router();

router.get("/get-key/:id", genKeyController);
router.get("keys/:id", getAllKeysController);

export default router;
