from typing import Dict, Any, List

def generate_ai_explanation(
    scenario_type: str,
    road_name: str,
    traffic_delta_pct: float,
    speed_delta_pct: float,
    diverted_veh: int,
    critical_intersections: int,
    flood_reduction_pct: float,
    emergency_delay_min: float,
    factors: Dict[str, float]
) -> Dict[str, Any]:
    """
    Generates human-readable, non-black-box explanations grounded in ML feature attributions
    and physical simulation calculations.
    """
    reasons: List[str] = []
    
    if traffic_delta_pct > 0:
        reasons.append(f"Road capacity intervention shifts {diverted_veh:,} vehicles/hour into secondary corridors.")
    else:
        reasons.append(f"Traffic redistribution eases pressure across primary bottlenecks by {abs(traffic_delta_pct):.1f}%.")
        
    if critical_intersections > 0:
        reasons.append(f"{critical_intersections} nearby transit intersections exceed 88% capacity utilization threshold.")
        
    if speed_delta_pct < 0:
        reasons.append(f"Average network speed drops by {abs(speed_delta_pct):.1f}% during peak travel windows.")
        
    if flood_reduction_pct > 15:
        reasons.append(f"Integrated drainage capacity relieves localized waterlogging by {flood_reduction_pct:.1f}%.")
        
    if emergency_delay_min > 1.5:
        reasons.append(f"Emergency services experience an estimated transit delay of +{emergency_delay_min:.1f} minutes.")
        
    summary = (
        f"{scenario_type} along {road_name} is projected to alter corridor congestion by "
        f"{'+' if traffic_delta_pct > 0 else ''}{traffic_delta_pct:.1f}%."
    )
    
    if traffic_delta_pct > 10:
        recommendation = "Deploy adaptive traffic signaling along alternate arterial corridors and activate real-time VMS diversions."
    else:
        recommendation = "Maintain planned diversion routes with synchronized green waves for public transit."
        
    return {
        'summary': summary,
        'reasons': reasons,
        'recommendation': recommendation,
        'top_contributing_factors': factors
    }
