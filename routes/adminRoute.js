import express from "express";
import { loginController } from "../controller/admin/loginController.js";
import { keyController } from "../controller/admin/keyController.js";
import { revokeKeyController } from "../controller/admin/revokeKeyController.js";
import { keyStatusController } from "../controller/admin/keyStatusController.js";
import { adminAuthController } from "../controller/admin/adminAuthController.js";
const router = express.Router();

router.post("/login", loginController);
router.get("/keys", adminAuthController, keyController);
router.get("/key/:id/revoke", adminAuthController, revokeKeyController);
router.get("/key/status", adminAuthController, keyStatusController);
export default router;
