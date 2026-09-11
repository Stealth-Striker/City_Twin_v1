from pydantic import BaseModel, Field
from typing import List, Dict, Any, Optional

class DataSourceMeta(BaseModel):
    name: str
    source_type: str = 'REAL'  # REAL, DEMO DATA, SIMULATED, MODEL ESTIMATE, FUTURE INTEGRATION
    source_url: Optional[str] = None
    last_updated: str
    confidence: int = 90
    provenance_note: Optional[str] = None

class CityMetrics(BaseModel):
    city_id: str
    city_name: str
    population: str
    population_raw: int
    population_change: str
    traffic_load: int
    traffic_status: str
    average_speed: int
    speed_change: str
    flood_risk: str
    air_quality_aqi: int
    air_quality_status: str
    emergency_response_min: float
    emergency_change: str
    safety_score: int
    safety_status: str
    estimated_cost_base: str
    rainfall_mm: float
    weather_desc: str
    last_updated: str
    data_provenance: Dict[str, str]

class ScenarioCreate(BaseModel):
    name: str
    scenario_type: str  # Road Closure, Road Construction, Traffic Diversion, New Road, Drainage Improvement, Emergency Route
    city_id: str
    road_id: Optional[str] = None
    road_name: Optional[str] = None
    duration_days: int = 30
    traffic_diversion_pct: int = 40
    capacity_change_pct: int = -50
    drainage_improvement_pct: int = 25
    rainfall_scenario_mm: float = 80.0
    safety_priority: str = 'High'
    emergency_priority: str = 'High'
    description: Optional[str] = None

class SimulationResult(BaseModel):
    scenario_id: str
    scenario_name: str
    city_id: str
    status: str = 'Completed'
    timestamp: str
    confidence: int = 84
    
    # Traffic Impact
    traffic_load_baseline: int
    traffic_load_scenario: int
    traffic_load_delta_pct: float
    avg_speed_baseline: int
    avg_speed_scenario: int
    avg_speed_delta_pct: float
    diverted_vehicles_per_hr: int
    critical_intersections_affected: int
    affected_roads: List[str]
    
    # Flood Impact
    flood_risk_score_baseline: int
    flood_risk_score_scenario: int
    flood_risk_level: str
    water_accumulation_reduction_pct: float
    affected_area_sq_km: float
    affected_population: int
    vulnerable_infrastructure_protected: List[str]
    
    # Pollution Impact
    aqi_baseline: int
    aqi_scenario: int
    emission_delta_pct: float
    clean_air_corridor_km: float
    
    # Emergency Response Impact
    emergency_response_min_baseline: float
    emergency_response_min_scenario: float
    emergency_delay_min: float
    critical_routes_rerouted: int
    
    # Safety Impact
    safety_score_baseline: int
    safety_score_scenario: int
    safety_score_delta: int
    safety_impact_level: str  # LOW, MODERATE, HIGH, CRITICAL
    safety_reasons: List[str]
    
    # Cost Impact
    estimated_cost_cr: float
    cost_confidence: int
    cost_breakdown: Dict[str, float]
    
    # AI Explainability
    ai_summary: str
    ai_reasons: List[str]
    ai_recommendation: str
    top_contributing_factors: Dict[str, float]
    
    # Impact Summary Dimensions
    social_impact: Dict[str, Any]
    economic_impact: Dict[str, Any]
    environmental_impact: Dict[str, Any]
    governance_impact: Dict[str, Any]

class OptimizationWeights(BaseModel):
    traffic: float = 0.30
    flood: float = 0.20
    emergency: float = 0.20
    pollution: float = 0.15
    cost: float = 0.15
    safety: float = 0.20

class ScenarioComparisonItem(BaseModel):
    id: str
    name: str
    scenario_type: str
    traffic_load: int
    avg_speed: int
    flood_risk: int
    pollution_aqi: int
    emergency_min: float
    safety_score: int
    estimated_cost_cr: float
    overall_score: float
    rank: int
    recommendation_verdict: str
    reasons: List[str]
    trade_offs: str

class OptimizationResponse(BaseModel):
    weights_applied: Dict[str, float]
    ranked_scenarios: List[ScenarioComparisonItem]
    best_scenario_id: str
    best_scenario_name: str
    ai_justification: str
    why_ranked_higher: List[str]
    data_provenance: str = 'SIMULATED & MODEL ESTIMATE'

class UrbanImpactReport(BaseModel):
    report_id: str
    generated_at: str
    city_name: str
    scenario: SimulationResult
    data_sources: List[DataSourceMeta]
    model_metadata: Dict[str, Any]
    audit_trail: Dict[str, Any]
