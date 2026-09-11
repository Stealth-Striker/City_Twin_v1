Write-Host "====================================================" -ForegroundColor Cyan
Write-Host "Setting up CityTwin Backend Virtual Environment (venv)" -ForegroundColor Cyan
Write-Host "====================================================" -ForegroundColor Cyan

Set-Location -Path "$PSScriptRoot\backend"
if (-not (Test-Path "venv")) {
    Write-Host "Creating python virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}
Write-Host "Installing dependencies in venv..." -ForegroundColor Yellow
.\venv\Scripts\python.exe -m pip install -r requirements.txt

Write-Host "`nVirtual environment setup complete!" -ForegroundColor Green
