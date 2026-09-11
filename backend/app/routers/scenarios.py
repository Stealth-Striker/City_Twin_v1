from fastapi import APIRouter, HTTPException
from typing import Dict, Any, List
from datetime import datetime
import uuid

from app.models.schemas import ScenarioCreate, SimulationResult
from app.data_loader import loader
from app.simulation.traffic_model import simulate_traffic_network
from app.simulation.flood_model import simulate_flood_risk
from app.simulation.pollution_model import simulate_pollution_impact
from app.simulation.emergency_model import simulate_emergency_response
from app.simulation.safety_model import simulate_safety_impact
from app.simulation.cost_model import estimate_infrastructure_cost
from app.ml.predictor import predictor
from app.ml.explainability import generate_ai_explanation

router = APIRouter(prefix="/api/scenarios", tags=["Scenarios"])

# In-memory scenario storage with default pre-seeded scenarios for Mumbai & Bengaluru
scenarios_db: Dict[str, Dict[str, Any]] = {}

def init_default_scenarios():
    scenarios_db['sc-mum-1'] = {
        'id': 'sc-mum-1',
        'name': 'Road Closure — Western Express Highway',
        'scenario_type': 'Road Closure',
        'city_id': 'mumbai',
        'road_id': 'mum-weh',
        'road_name': 'Western Express Highway (WEH)',
        'duration_days': 30,
        'traffic_diversion_pct': 35,
        'capacity_change_pct': -100,
        'drainage_improvement_pct': 10,
        'rainfall_scenario_mm': 75.0,
        'safety_priority': 'High',
        'emergency_priority': 'Critical',
        'created_at': '10:15 AM, Today',
        'status': 'Completed'
    }
    scenarios_db['sc-mum-2'] = {
        'id': 'sc-mum-2',
        'name': 'Traffic Diversion via Eastern Express Corridor',
        'scenario_type': 'Traffic Diversion',
        'city_id': 'mumbai',
        'road_id': 'mum-eeh',
        'road_name': 'Eastern Express Highway (EEH)',
        'duration_days': 20,
        'traffic_diversion_pct': 60,
        'capacity_change_pct': -20,
        'drainage_improvement_pct': 30,
        'rainfall_scenario_mm': 60.0,
        'safety_priority': 'High',
        'emergency_priority': 'High',
        'created_at': '11:00 AM, Today',
        'status': 'Completed'
    }
    scenarios_db['sc-blr-1'] = {
        'id': 'sc-blr-1',
        'name': 'Traffic Diversion — Outer Ring Road (ORR)',
        'scenario_type': 'Traffic Diversion',
        'city_id': 'bengaluru',
        'road_id': 'blr-orr-east',
        'road_name': 'Outer Ring Road (Silk Board - Marathahalli)',
        'duration_days': 45,
        'traffic_diversion_pct': 45,
        'capacity_change_pct': -30,
        'drainage_improvement_pct': 40,
        'rainfall_scenario_mm': 55.0,
        'safety_priority': 'High',
        'emergency_priority': 'High',
        'created_at': '09:30 AM, Today',
        'status': 'Completed'
    }

init_default_scenarios()

def run_full_simulation(scenario: Dict[str, Any]) -> SimulationResult:
    city_id = scenario.get('city_id', 'mumbai').lower()
    meta = loader.get_city_meta(city_id)
    base_load = meta.get('traffic_load', 72)
    base_speed = meta.get('average_speed', 28)
    base_aqi = meta.get('air_quality_aqi', 78)
    base_emerg = meta.get('emergency_response_min', 11.0)
    base_safety = meta.get('safety_score', 82)
    
    cap_change = scenario.get('capacity_change_pct', -50)
    diversion = scenario.get('traffic_diversion_pct', 40)
    drainage = scenario.get('drainage_improvement_pct', 25)
    rainfall = scenario.get('rainfall_scenario_mm', 70.0)
    duration = scenario.get('duration_days', 30)
    scen_type = scenario.get('scenario_type', 'Road Closure')
    road_name = scenario.get('road_name', 'Corridor')
    
    # 1. Traffic simulation
    traffic_res = simulate_traffic_network(
        base_load=base_load,
        base_speed=base_speed,
        capacity_change_pct=cap_change,
        diversion_pct=diversion,
        road_name=road_name,
        city_id=city_id
    )
    
    # 2. Flood simulation
    flood_res = simulate_flood_risk(
        city_id=city_id,
        rainfall_mm=rainfall,
        drainage_improvement_pct=drainage,
        capacity_change_pct=cap_change
    )
    
    # 3. Pollution simulation
    poll_res = simulate_pollution_impact(
        base_aqi=base_aqi,
        base_speed=base_speed,
        scenario_speed=traffic_res['avg_speed_scenario'],
        traffic_delta_pct=traffic_res['traffic_load_delta_pct']
    )
    
    # 4. Emergency response simulation
    emerg_res = simulate_emergency_response(
        base_time_min=base_emerg,
        speed_delta_pct=traffic_res['avg_speed_delta_pct'],
        critical_intersections=traffic_res['critical_intersections_affected']
    )
    
    # 5. Safety impact simulation
    safety_res = simulate_safety_impact(
        base_safety=base_safety,
        emergency_delay_min=emerg_res['emergency_delay_min'],
        critical_intersections=traffic_res['critical_intersections_affected'],
        speed_delta_pct=traffic_res['avg_speed_delta_pct'],
        flood_risk_scenario=flood_res['flood_risk_score_scenario']
    )
    
    # 6. Cost estimation
    cost_res = estimate_infrastructure_cost(
        scenario_type=scen_type,
        duration_days=duration,
        drainage_improvement_pct=drainage,
        capacity_change_pct=cap_change
    )
    
    # 7. Scikit-Learn ML prediction
    ml_out = predictor.predict({
        'traffic_volume': 2400 + abs(cap_change) * 10,
        'road_capacity': 3200 * max(0.2, 1.0 + cap_change / 100.0),
        'rainfall_mm': rainfall,
        'drainage_capacity': 30 + drainage * 0.4,
        'population_density': 14000 if city_id == 'mumbai' else 11000,
        'closure_status': 1 if cap_change <= -80 else 0,
        'diversion_ratio': diversion / 100.0
    })
    
    # 8. AI explainability
    ai_exp = generate_ai_explanation(
        scenario_type=scen_type,
        road_name=road_name,
        traffic_delta_pct=traffic_res['traffic_load_delta_pct'],
        speed_delta_pct=traffic_res['avg_speed_delta_pct'],
        diverted_veh=traffic_res['diverted_vehicles_per_hr'],
        critical_intersections=traffic_res['critical_intersections_affected'],
        flood_reduction_pct=flood_res['water_accumulation_reduction_pct'],
        emergency_delay_min=emerg_res['emergency_delay_min'],
        factors=ml_out['top_contributing_factors']
    )
    
    # 9. 4-Pillar Impact Summary
    social = {
        'emergency_response_change_min': emerg_res['emergency_delay_min'],
        'population_protected': flood_res['affected_population'] if drainage > 20 else 4500,
        'affected_transit_riders': int(traffic_res['diverted_vehicles_per_hr'] * 14.2),
        'safety_improvement_pts': safety_res['safety_score_delta'],
        'public_service_access': 'Maintained with 2 diversions' if traffic_res['critical_intersections_affected'] < 3 else 'Rerouted'
    }
    economic = {
        'estimated_implementation_cost_cr': cost_res['estimated_cost_cr'],
        'potential_avoided_loss_cr': round(flood_res['affected_area_sq_km'] * 0.85, 2),
        'cost_confidence_pct': cost_res['cost_confidence'],
        'commercial_throughput_delta_pct': round(traffic_res['avg_speed_delta_pct'] * 0.6, 1)
    }
    environmental = {
        'emission_delta_pct': poll_res['emission_delta_pct'],
        'flood_exposure_reduction_pct': flood_res['water_accumulation_reduction_pct'],
        'clean_air_corridor_km': poll_res['clean_air_corridor_km'],
        'environmental_risk_level': 'Low' if poll_res['emission_delta_pct'] < 0 else 'Moderate'
    }
    governance = {
        'scenarios_evaluated_count': len(scenarios_db),
        'decision_confidence_pct': 84,
        'evidence_based_recommendation': 'YES',
        'transparency_score': '100% Deterministic & Auditable'
    }
    
    return SimulationResult(
        scenario_id=scenario.get('id', 'sc-temp'),
        scenario_name=scenario.get('name', 'Scenario'),
        city_id=city_id,
        status='Completed',
        timestamp=datetime.now().strftime('%d %b %Y, %I:%M %p'),
        confidence=84,
        traffic_load_baseline=base_load,
        traffic_load_scenario=traffic_res['traffic_load_scenario'],
        traffic_load_delta_pct=traffic_res['traffic_load_delta_pct'],
        avg_speed_baseline=base_speed,
        avg_speed_scenario=traffic_res['avg_speed_scenario'],
        avg_speed_delta_pct=traffic_res['avg_speed_delta_pct'],
        diverted_vehicles_per_hr=traffic_res['diverted_vehicles_per_hr'],
        critical_intersections_affected=traffic_res['critical_intersections_affected'],
        affected_roads=traffic_res['affected_roads'],
        flood_risk_score_baseline=flood_res['flood_risk_score_baseline'],
        flood_risk_score_scenario=flood_res['flood_risk_score_scenario'],
        flood_risk_level=flood_res['flood_risk_level'],
        water_accumulation_reduction_pct=flood_res['water_accumulation_reduction_pct'],
        affected_area_sq_km=flood_res['affected_area_sq_km'],
        affected_population=flood_res['affected_population'],
        vulnerable_infrastructure_protected=flood_res['vulnerable_infrastructure_protected'],
        aqi_baseline=base_aqi,
        aqi_scenario=poll_res['aqi_scenario'],
        emission_delta_pct=poll_res['emission_delta_pct'],
        clean_air_corridor_km=poll_res['clean_air_corridor_km'],
        emergency_response_min_baseline=base_emerg,
        emergency_response_min_scenario=emerg_res['emergency_response_min_scenario'],
        emergency_delay_min=emerg_res['emergency_delay_min'],
        critical_routes_rerouted=emerg_res['critical_routes_rerouted'],
        safety_score_baseline=base_safety,
        safety_score_scenario=safety_res['safety_score_scenario'],
        safety_score_delta=safety_res['safety_score_delta'],
        safety_impact_level=safety_res['safety_impact_level'],
        safety_reasons=safety_res['safety_reasons'],
        estimated_cost_cr=cost_res['estimated_cost_cr'],
        cost_confidence=cost_res['cost_confidence'],
        cost_breakdown=cost_res['cost_breakdown'],
        ai_summary=ai_exp['summary'],
        ai_reasons=ai_exp['reasons'],
        ai_recommendation=ai_exp['recommendation'],
        top_contributing_factors=ai_exp['top_contributing_factors'],
        social_impact=social,
        economic_impact=economic,
        environmental_impact=environmental,
        governance_impact=governance
    )

@router.get("", response_model=List[Dict[str, Any]])
def list_scenarios(city: str = None):
    results = list(scenarios_db.values())
    if city:
        results = [s for s in results if s.get('city_id', '').lower() == city.lower()]
    return results

@router.get("/{id}")
def get_scenario(id: str):
    if id not in scenarios_db:
        raise HTTPException(status_code=404, detail="Scenario not found")
    return scenarios_db[id]

@router.post("")
def create_scenario(payload: ScenarioCreate):
    scen_id = f"sc-{uuid.uuid4().hex[:6]}"
    data = payload.dict()
    data['id'] = scen_id
    data['created_at'] = datetime.now().strftime("%I:%M %p, %d %b %Y")
    data['status'] = "Ready"
    scenarios_db[scen_id] = data
    return data

@router.post("/{id}/simulate", response_model=SimulationResult)
def simulate_scenario_endpoint(id: str):
    if id not in scenarios_db:
        raise HTTPException(status_code=404, detail="Scenario not found")
    scenario = scenarios_db[id]
    result = run_full_simulation(scenario)
    scenarios_db[id]['simulation_result'] = result.dict()
    scenarios_db[id]['status'] = "Completed"
    return result
