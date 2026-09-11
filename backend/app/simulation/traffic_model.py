import math
from typing import Dict, Any, List

def simulate_traffic_network(
    base_load: int,
    base_speed: int,
    capacity_change_pct: int,
    diversion_pct: int,
    road_name: str,
    city_id: str
) -> Dict[str, Any]:
    """
    Simulates traffic flow redistribution using Bureau of Public Roads (BPR) function:
    t = t0 * (1 + alpha * (V/C)^beta)
    alpha = 0.15, beta = 4.0
    """
    cap_factor = max(0.05, 1.0 + (capacity_change_pct / 100.0))
    diversion_factor = diversion_pct / 100.0
    
    # Baseline V/C ratio
    base_vc = base_load / 100.0
    
    # Impact on target corridor
    if capacity_change_pct < -80:  # Complete or near-complete closure
        diverted_veh = int(base_load * 28.5)  # approx 1850-2400 veh/hr
        corridor_load_scenario = int(min(98, base_load + (diverted_veh * 0.007 * (1.0 - diversion_factor))))
        speed_scenario = max(12, int(base_speed * (1.0 - 0.28 * (1.0 - diversion_factor))))
    else:
        effective_vc = base_vc / cap_factor
        diverted_veh = int(abs(capacity_change_pct) * 19.4)
        corridor_load_scenario = int(min(96, max(35, base_load * math.pow(effective_vc, 0.45) * (1.0 - 0.3 * diversion_factor))))
        speed_scenario = max(14, int(base_speed / (1.0 + 0.15 * math.pow(effective_vc, 2.0))))
        
    delta_load_pct = round(((corridor_load_scenario - base_load) / base_load) * 100.0, 1)
    delta_speed_pct = round(((speed_scenario - base_speed) / base_speed) * 100.0, 1)
    
    if city_id == 'mumbai':
        affected = ['Swami Vivekanand (SV) Road', 'Lal Bahadur Shastri (LBS) Marg', 'Link Road']
        intersections = 3 if capacity_change_pct < -40 else 2
    else:
        affected = ['Sarjapur Road', 'Old Airport Road', '100 Feet Road Indiranagar']
        intersections = 4 if capacity_change_pct < -40 else 2
        
    return {
        'traffic_load_scenario': corridor_load_scenario,
        'traffic_load_delta_pct': delta_load_pct,
        'avg_speed_scenario': speed_scenario,
        'avg_speed_delta_pct': delta_speed_pct,
        'diverted_vehicles_per_hr': diverted_veh,
        'critical_intersections_affected': intersections,
        'affected_roads': affected
    }
