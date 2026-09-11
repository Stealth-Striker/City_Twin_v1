from fastapi import APIRouter
from typing import Dict, Any
from datetime import datetime
import random

router = APIRouter(prefix="/api", tags=["Analytics & Live Telemetry"])

@router.get("/live-status")
def get_live_status():
    return {
        "status": "ONLINE",
        "live_telemetry": True,
        "active_nodes_reporting": 1420,
        "iot_sensors_online": "99.4%",
        "last_sync": datetime.now().strftime("%H:%M:%S"),
        "latency_ms": 32,
        "provenance": "DEMO LIVE FEED (Simulated Real-Time Stream)"
    }
