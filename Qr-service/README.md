QR Service Integration Steps

Navigate to the QR service folder
Go into the qr-service/ folder in the project:

"cd qr-service"

----------------------------------------------------------------------------------
Create and activate a Python virtual environment

PowerShell:

"python -m venv venv
.\venv\Scripts\Activate.ps1"

OR

CMD:

"python -m venv venv
venv\Scripts\activate.bat"


Install dependencies

"pip install --upgrade pip
pip install -r requirements.txt"
--------------------------------------------------------------------------------

Run the FastAPI server

"uvicorn main:app --host 0.0.0.0 --port 8000"


The service will run at http://localhost:8000

Endpoint for QR generation: POST /generate_qr
----------------------------------------------------------------------------------
Testing the QR service

Use Postman, PowerShell, or a simple Node.js script to send a POST request:

Example JSON body:

{
  "token_id": "ABC123"
}


Example Node.js call using Axios:

const axios = require("axios");

const response = await axios.post("http://localhost:8000/generate_qr", {
  token_id: "ABC123"
});

console.log(response.data.qr_base64); // base64 QR string



-------------------------------------------------------------------
Integration Notes

The service runs independently; no changes are needed in the frontend or backend.

Make sure port 8000 is open and accessible from the Node.js backend.

This setup works locally for testing before deploying the QR service to the cloud.


-------------------------------------------------------------------------------

To check POST method on server use this command on powershell :
Invoke-RestMethod -Uri http://127.0.0.1:8000/generate_qr `
  -Method POST `
  -Body (@{token_id="TEST123"} | ConvertTo-Json) `
  -ContentType "application/json"
