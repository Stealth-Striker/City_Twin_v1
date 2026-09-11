from typing import Dict, Any

def simulate_emergency_response(
    base_time_min: float,
    speed_delta_pct: float,
    critical_intersections: int
) -> Dict[str, Any]:
    """
    Emergency response routing and delay model based on intersection bottlenecking
    and average link speeds.
    """
    # Delay from congested intersections (approx 0.8 min delay per overloaded junction)
    junction_delay = critical_intersections * 0.75
    
    # Delay from speed reduction
    speed_factor = 1.0 - (speed_delta_pct / 100.0)
    scenario_time = round(max(6.0, base_time_min * speed_factor + junction_delay), 1)
    
    delay_min = round(scenario_time - base_time_min, 1)
    rerouted_routes = min(4, max(1, int(critical_intersections)))
    
    return {
        'emergency_response_min_baseline': base_time_min,
        'emergency_response_min_scenario': scenario_time,
        'emergency_delay_min': delay_min,
        'critical_routes_rerouted': rerouted_routes
    }
