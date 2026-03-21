const { BrevoClient } = require("@getbrevo/brevo");
const dotenv = require("dotenv");
dotenv.config();

const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

module.exports = client;
