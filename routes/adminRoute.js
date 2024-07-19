import express from "express";
import { loginController } from "../controller/admin/loginController.js";
import { keyController } from "../controller/admin/keyController.js";
import { revokeKeyController } from "../controller/admin/revokeKeyController.js";
import { keyStatusController } from "../controller/admin/keyStatusController.js";
const router = express.Router();

router.post("/login", loginController);
router.get("/keys", keyController);
router.get("/key/:id/revoke", revokeKeyController);
router.get("/key/status", keyStatusController);
export default router;
