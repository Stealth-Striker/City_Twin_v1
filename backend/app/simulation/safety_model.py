from typing import Dict, Any, List

def simulate_safety_impact(
    base_safety: int,
    emergency_delay_min: float,
    critical_intersections: int,
    speed_delta_pct: float,
    flood_risk_scenario: int
) -> Dict[str, Any]:
    """
    Evaluates urban safety score and generates human-interpretable reasons for changes.
    Factors:
    - Emergency vehicle access delays
    - Hazardous intersection congestion
    - Pedestrian and transit friction
    - Flood inundation exposure
    """
    penalty = 0
    reasons: List[str] = []
    
    if emergency_delay_min > 2.0:
        p = int(emergency_delay_min * 3.5)
        penalty += p
        reasons.append(f"Emergency vehicle transit response time increased by {emergency_delay_min:.1f} min")
    elif emergency_delay_min < -0.5:
        reasons.append(f"Emergency access improved by {abs(emergency_delay_min):.1f} min along arterial green corridor")
        
    if critical_intersections >= 3:
        penalty += 8
        reasons.append(f"{critical_intersections} critical transit intersections exceeded 90% capacity saturation")
        
    if speed_delta_pct < -20.0:
        penalty += 5
        reasons.append("Severe gridlock on alternative residential feeder roads elevates pedestrian collision hazard")
        
    if flood_risk_scenario > 75:
        penalty += 9
        reasons.append("High water accumulation risk detected near critical pedestrian underpasses and transit nodes")
    elif flood_risk_scenario < 50:
        reasons.append("Improved drainage interventions significantly reduced stormwater inundation risk")
        
    scenario_safety = max(25, min(98, base_safety - penalty))
    delta = scenario_safety - base_safety
    
    if scenario_safety >= 80:
        level = "LOW"
    elif scenario_safety >= 65:
        level = "MODERATE"
    elif scenario_safety >= 50:
        level = "HIGH"
    else:
        level = "CRITICAL"
        
    if not reasons:
        reasons.append("Traffic redistribution within normal operating buffer with minimal systemic friction.")
        
    return {
        'safety_score_baseline': base_safety,
        'safety_score_scenario': scenario_safety,
        'safety_score_delta': delta,
        'safety_impact_level': level,
        'safety_reasons': reasons
    }
