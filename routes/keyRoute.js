import express from "express";
import { genKeyController } from "../controller/access_key/genKeyController.js";
import { getAllKeysController } from "../controller/access_key/getAllKeysController.js";
const router = express.Router();

router.get("/get-key/:id", genKeyController);
router.get("/keys/:id", getAllKeysController);

export default router;
