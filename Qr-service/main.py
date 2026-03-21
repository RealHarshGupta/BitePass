from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import io
import base64
import qrcode
from PIL import Image
import asyncio
from datetime import datetime
from typing import Optional, List

app = FastAPI(title="QR Generator Service", version="1.0")

# Accept multiple token IDs
class QRBatchRequest(BaseModel):
    token_ids: List[str]  # ✅ a list of token IDs
    box_size: Optional[int] = 10
    border: Optional[int] = 4
    error_correction: Optional[str] = "M"

def _map_error_correction(code: str):
    code = (code or "M").upper()
    if code == "L":
        return qrcode.constants.ERROR_CORRECT_L
    if code == "Q":
        return qrcode.constants.ERROR_CORRECT_Q
    if code == "H":
        return qrcode.constants.ERROR_CORRECT_H
    return qrcode.constants.ERROR_CORRECT_M

def _generate_png_bytes(token_id: str, box_size: int, border: int, error_corr):
    qr = qrcode.QRCode(
        version=None,
        error_correction=error_corr,
        box_size=box_size,
        border=border,
    )
    qr.add_data(token_id)
    qr.make(fit=True)
    img: Image.Image = qr.make_image(fill_color="black", back_color="white").convert("RGB")

    buf = io.BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    return buf.read()

@app.get("/health")
async def health():
    return {"status": "ok", "timestamp": datetime.utcnow().isoformat() + "Z"}

@app.post("/generate_qr_batch")
async def generate_qr_batch(request: QRBatchRequest):
    if not request.token_ids or len(request.token_ids) == 0:
        raise HTTPException(status_code=400, detail="token_ids list cannot be empty")

    error_corr = _map_error_correction(request.error_correction)

    loop = asyncio.get_running_loop()
    results = []

    # Generate QR for each token ID concurrently
    async def generate_for_token(token):
        png_bytes = await loop.run_in_executor(
            None,
            _generate_png_bytes,
            token,
            request.box_size,
            request.border,
            error_corr
        )
        b64 = base64.b64encode(png_bytes).decode("ascii")
        return {"token_id": token, "qr_base64": f"data:image/png;base64,{b64}"}

    # Schedule all tasks at once for speed
    tasks = [generate_for_token(t) for t in request.token_ids]
    results = await asyncio.gather(*tasks)

    return {
        "count": len(results),
        "results": results,
        "generated_at": datetime.utcnow().isoformat() + "Z"
    }
