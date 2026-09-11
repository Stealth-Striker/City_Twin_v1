@echo off
echo ====================================================
echo Setting up CityTwin Backend Virtual Environment (venv)
echo ====================================================
cd /d "%~dp0\backend"
if not exist venv (
    echo Creating python virtual environment...
    python -m venv venv
)
echo Installing dependencies in venv...
.\venv\Scripts\python.exe -m pip install -r requirements.txt
echo.
echo Virtual environment setup complete!
pause
