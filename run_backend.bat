@echo off
echo Starting CityTwin FastAPI Backend using venv...
cd /d "%~dp0\backend"
if not exist venv (
    echo Virtual environment not found. Creating and installing requirements...
    python -m venv venv
    .\venv\Scripts\python.exe -m pip install -r requirements.txt
)
.\venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8008 --reload
