@echo off
echo ===================================================
echo Starting CITYTWIN 2.0 (Backend + Frontend)
echo ===================================================

echo [1/2] Starting FastAPI Backend on port 8008...
start "CityTwin Backend" cmd /k "cd /d %~dp0backend && venv\Scripts\python.exe -m uvicorn app.main:app --host 0.0.0.0 --port 8008 --reload"

timeout /t 2 /nobreak >nul

echo [2/2] Starting React/Vite Frontend on port 5174...
start "CityTwin Frontend" cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo Application services launched!
echo - Frontend: http://localhost:5174/
echo - Backend API Docs: http://localhost:8008/docs
echo.
pause
