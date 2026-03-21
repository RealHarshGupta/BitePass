const db = require("../config/db");
const axios = require("axios");

// Generate QR codes for all token IDs of a specific event
const autoGenerateQrCodes = async (req, res) => {
  try {
    const { event_id } = req.body;
    if (!event_id) {
      return res.status(400).json({ message: "event_id is required" });
    }

    // 1️⃣ Fetch token IDs for this event
    const [rows] = await db.execute("SELECT token_id FROM participants WHERE event_id = ?", [event_id]);
    const token_ids = rows.map((r) => r.token_id);

    if (!token_ids.length) {
      return res.status(404).json({ message: "No token IDs found" });
    }

    // 2️⃣ FastAPI QR generator URL
    const QR_BATCH_URL = "http://localhost:8000/generate_qr_batch";

    // 3️⃣ Prepare payload
    const payload = {
      token_ids,
      error_correction: "M",
    };

    // 4️⃣ Send request to FastAPI server
    const response = await axios.post(QR_BATCH_URL, payload);
    const qrResults = response.data.results;

    // 5️⃣ Store each QR code in DB
    for (const qr of qrResults) {
      await db.execute(
        "UPDATE participants SET qr_code = ? WHERE token_id = ?",
        [qr.qr_base64, qr.token_id]
      );
    }

    res.status(200).json({
      message: "✅ QR batch generated & stored successfully!",
      count: qrResults.length,
    });
  } catch (error) {
    console.error("❌ Error in autoGenerateQrCodes:", error);
    res.status(500).json({
      message: "Internal server error while generating/storing QR codes",
      error: error.message,
    });
  }
};

module.exports = { autoGenerateQrCodes };
