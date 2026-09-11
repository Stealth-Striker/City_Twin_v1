from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from datetime import datetime
from app.data_loader import loader

router = APIRouter(prefix="/api/cities", tags=["Cities"])

@router.get("", response_model=List[Dict[str, Any]])
def get_cities():
    return loader.get_all_cities()

@router.get("/{city}")
def get_city(city: str):
    meta = loader.get_city_meta(city)
    if not meta:
        raise HTTPException(status_code=404, detail="City not found")
    return meta

@router.get("/{city}/metrics")
def get_city_metrics(city: str):
    meta = loader.get_city_meta(city)
    if not meta:
        raise HTTPException(status_code=404, detail="City not found")
    return {
        "city_id": meta.get("id"),
        "city_name": meta.get("name"),
        "population": meta.get("population"),
        "population_raw": meta.get("population_raw"),
        "population_change": meta.get("population_change"),
        "traffic_load": meta.get("traffic_load"),
        "traffic_status": meta.get("traffic_status"),
        "average_speed": meta.get("average_speed"),
        "speed_change": meta.get("speed_change"),
        "flood_risk": meta.get("flood_risk"),
        "air_quality_aqi": meta.get("air_quality_aqi"),
        "air_quality_status": meta.get("air_quality_status"),
        "emergency_response_min": meta.get("emergency_response_min"),
        "emergency_change": meta.get("emergency_change"),
        "safety_score": meta.get("safety_score"),
        "safety_status": meta.get("safety_status"),
        "estimated_cost_base": meta.get("estimated_cost_base"),
        "rainfall_mm": meta.get("rainfall_mm"),
        "weather_desc": meta.get("weather_desc"),
        "last_updated": datetime.now().strftime("%I:%M %p, %d %b %Y"),
        "data_provenance": {
            "geographic_boundaries": "REAL — OpenStreetMap GeoJSON",
            "roads_network": "REAL — OpenStreetMap Arterial Polylines",
            "infrastructure": "REAL — Authentic Geocoded Points",
            "traffic_state": "DEMO / SYNTHETIC BASELINE",
            "flood_index": "SIMULATED HYDROLOGIC MODEL",
            "safety_rating": "MODEL ESTIMATE (Non-official)"
        }
    }

@router.get("/{city}/roads")
def get_city_roads(city: str):
    return loader.get_roads(city)

@router.get("/{city}/infrastructure")
def get_city_infrastructure(city: str):
    return loader.get_infrastructure(city)

@router.get("/{city}/traffic")
def get_city_traffic(city: str):
    meta = loader.get_city_meta(city)
    return {
        "city_id": city,
        "load_pct": meta.get("traffic_load", 72),
        "status": meta.get("traffic_status", "High"),
        "avg_speed_kmh": meta.get("average_speed", 28),
        "hourly_distribution": [
            {"time": "12 AM", "baseline": 18, "scenario": 18},
            {"time": "4 AM", "baseline": 12, "scenario": 12},
            {"time": "8 AM", "baseline": 65, "scenario": 74},
            {"time": "12 PM", "baseline": 72, "scenario": 85},
            {"time": "4 PM", "baseline": 68, "scenario": 78},
            {"time": "8 PM", "baseline": 55, "scenario": 64},
            {"time": "12 AM", "baseline": 22, "scenario": 22}
        ]
    }

@router.get("/{city}/flood-risk")
def get_city_flood_risk(city: str):
    return {
        "city_id": city,
        "zones": loader.get_flood_zones(city),
        "water_bodies": loader.get_water_bodies(city)
    }

@router.get("/{city}/pollution")
def get_city_pollution(city: str):
    meta = loader.get_city_meta(city)
    return {
        "city_id": city,
        "current_aqi": meta.get("air_quality_aqi", 78),
        "status": meta.get("air_quality_status", "Moderate"),
        "hourly_aqi": [
            {"time": "12 AM", "aqi": 52},
            {"time": "4 AM", "aqi": 48},
            {"time": "8 AM", "aqi": 82},
            {"time": "12 PM", "aqi": 78},
            {"time": "4 PM", "aqi": 88},
            {"time": "8 PM", "aqi": 72},
            {"time": "12 AM", "aqi": 58}
        ]
    }

@router.get("/{city}/emergency")
def get_city_emergency(city: str):
    meta = loader.get_city_meta(city)
    return {
        "city_id": city,
        "avg_response_min": meta.get("emergency_response_min", 11.0),
        "zones": [
            {"zone": "North", "baseline": 9.5, "scenario": 11.2},
            {"zone": "South", "baseline": 8.0, "scenario": 8.5},
            {"zone": "Central", "baseline": 12.0, "scenario": 15.4},
            {"zone": "East", "baseline": 11.5, "scenario": 13.8},
            {"zone": "West", "baseline": 13.0, "scenario": 16.5}
        ]
    }

@router.get("/{city}/safety")
def get_city_safety(city: str):
    meta = loader.get_city_meta(city)
    return {
        "city_id": city,
        "safety_score": meta.get("safety_score", 82),
        "safety_status": meta.get("safety_status", "Moderate"),
        "factors": {
            "Emergency Accessibility": 84,
            "Intersection Saturation Buffer": 72,
            "Flood Inundation Exposure": 78,
            "Pedestrian Vulnerability": 68
        }
    }
