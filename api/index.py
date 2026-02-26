import sys
from pathlib import Path
from fastapi import FastAPI

ROOT_DIR = Path(__file__).resolve().parent.parent
BACKEND_DIR = ROOT_DIR / "Backend"

if str(BACKEND_DIR) not in sys.path:
    sys.path.insert(0, str(BACKEND_DIR))

from main import app as backend_app  # noqa: E402

app = FastAPI()
app.mount("/api", backend_app)
app.mount("/", backend_app)
