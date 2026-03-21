// routes/verifyRoute.js
import express from "express";
import { verifyQRCode } from "../controllers/verification_qr_code";

const router = express.Router();
router.post("/verify-qr", verifyQRCode);

export default router;
