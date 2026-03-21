const express = require("express");
const { sendEmailsToAllParticipants } = require("../controllers/emailController");
const { autoGenerateQrCodes } = require("../controllers/qrController");

const router = express.Router();

// POST /emails/send-all — send to ALL participants of an event
router.post("/send-all", async (req, res) => {
  try {
    await sendEmailsToAllParticipants(req, res);
  } catch (error) {
    console.error("❌ Error in /emails/send-all route:", error);
    res.status(500).json({ message: "Internal server error while sending emails" });
  }
});

router.post("/auto_generated_qr_code", async (req, res) => {
  try {
    await autoGenerateQrCodes(req, res);
  } catch (error) {
    console.error("❌ Error in /emails/auto-generated-qr-code route:", error);
    res.status(500).json({ message: "Internal server error while generating QR codes" });
  }
});

// POST /emails/send-single — send to ONE specific participant
router.post("/send-single", async (req, res) => {
  try {
    await require("../controllers/emailController").sendSingleEmail(req, res);
  } catch (error) {
    console.error("❌ Error in /emails/send-single route:", error);
    res.status(500).json({ message: "Internal server error while sending email" });
  }
});

module.exports = router;

