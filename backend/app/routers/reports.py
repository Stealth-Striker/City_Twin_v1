from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from datetime import datetime
from app.routers.scenarios import scenarios_db, run_full_simulation
from app.models.schemas import UrbanImpactReport, DataSourceMeta

router = APIRouter(prefix="/api/reports", tags=["Reports & Impact Assessment"])

@router.get("/{scenario_id}", response_model=UrbanImpactReport)
def get_urban_impact_assessment_report(scenario_id: str):
    if scenario_id not in scenarios_db:
        raise HTTPException(status_code=404, detail="Scenario not found")
    scen = scenarios_db[scenario_id]
    result = run_full_simulation(scen)
    
    sources = [
        DataSourceMeta(
            name="OpenStreetMap Spatial Road Network & Infrastructure",
            source_type="REAL",
            source_url="https://www.openstreetmap.org",
            last_updated="2026-03-01",
            confidence=95,
            provenance_note="Authentic geometry extracted from OpenStreetMap Overpass API"
        ),
        DataSourceMeta(
            name="City Baseline Sensor Observables (Traffic, Weather)",
            source_type="DEMO DATA",
            source_url="Internal CityTwin Simulator",
            last_updated=datetime.now().strftime("%Y-%m-%d"),
            confidence=85,
            provenance_note="Synthesized baseline telemetry matching municipal historic averages"
        ),
        DataSourceMeta(
            name="Bureau of Public Roads (BPR) Traffic Simulation",
            source_type="SIMULATED",
            source_url="SUMO / Python Graph Engine",
            last_updated=datetime.now().strftime("%Y-%m-%d"),
            confidence=88,
            provenance_note="Micro-simulation with flow redistribution and intersection delay modeling"
        ),
        DataSourceMeta(
            name="Scikit-Learn Random Forest & Hydrological Predictor",
            source_type="MODEL ESTIMATE",
            source_url="Scikit-Learn ML Subsystem",
            last_updated=datetime.now().strftime("%Y-%m-%d"),
            confidence=84,
            provenance_note="Statistical regressor predicting systemic cross-impacts"
        )
    ]
    
    return UrbanImpactReport(
        report_id=f"REP-{scenario_id.upper()}-{datetime.now().strftime('%Y%m%d%H%M')}",
        generated_at=datetime.now().strftime("%d %B %Y, %I:%M %p"),
        city_name=scen.get("city_id", "Mumbai").capitalize(),
        scenario=result,
        data_sources=sources,
        model_metadata={
            "simulation_engine": "BPR Flow Redistribution v2.4 + Hydrological Rational Runoff",
            "ml_model": "RandomForestRegressor (n_estimators=50, max_depth=6)",
            "safety_index_standard": "CityTwin Urban Vulnerability Framework 2026",
            "cost_index_standard": "CPWD Infrastructure Benchmark Schedule 2025-26"
        },
        audit_trail={
            "scenario_id": scenario_id,
            "created_by": "Ramesh P (Lead Urban Planner)",
            "simulation_status": "Verified Deterministic",
            "weights_hash": "TRAFFIC_30_FLOOD_20_EMERG_20_POLL_15_COST_15"
        }
    )
