Write-Host "Starting CityTwin FastAPI Backend using venv on port 8008..." -ForegroundColor Cyan
Set-Location -Path "$PSScriptRoot\backend"
if (-not (Test-Path "venv")) {
    Write-Host "Virtual environment not found. Creating and installing requirements..." -ForegroundColor Yellow
    python -m venv venv
    .\venv\Scripts\python.exe -m pip install -r requirements.txt
}
.\venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8008 --reload
