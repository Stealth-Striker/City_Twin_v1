from typing import Dict, Any

def simulate_pollution_impact(
    base_aqi: int,
    base_speed: int,
    scenario_speed: int,
    traffic_delta_pct: float
) -> Dict[str, Any]:
    """
    Computes emission and AQI response based on vehicle operating speed and volume.
    Stop-and-go idling below 20 km/h exponentially increases NOx and particulate matter.
    """
    # Speed ratio factor
    if scenario_speed < 18:
        idling_penalty = 1.25
    elif scenario_speed < 25:
        idling_penalty = 1.10
    else:
        idling_penalty = 0.90
        
    volume_factor = 1.0 + (traffic_delta_pct / 100.0) * 0.45
    
    scenario_aqi = int(min(280, max(42, base_aqi * idling_penalty * volume_factor)))
    emission_delta_pct = round(((scenario_aqi - base_aqi) / base_aqi) * 100.0, 1)
    
    clean_air_corridor = round(max(1.2, 8.4 * (1.0 - (emission_delta_pct / 100.0))), 1)
    
    return {
        'aqi_baseline': base_aqi,
        'aqi_scenario': scenario_aqi,
        'emission_delta_pct': emission_delta_pct,
        'clean_air_corridor_km': clean_air_corridor
    }
