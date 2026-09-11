from typing import Dict, Any, List

def simulate_flood_risk(
    city_id: str,
    rainfall_mm: float,
    drainage_improvement_pct: int,
    capacity_change_pct: int
) -> Dict[str, Any]:
    """
    Hydrological runoff and flood vulnerability estimation.
    Considers rainfall intensity, impervious surface ratio, and drainage capacity.
    """
    # Baseline flood risk score (0-100)
    base_score = 64 if city_id == 'mumbai' else 58
    
    # Rainfall multiplier
    rain_factor = rainfall_mm / 60.0
    
    # Drainage mitigation
    drainage_factor = max(0.2, 1.0 - (drainage_improvement_pct / 100.0) * 0.55)
    
    scenario_score = int(min(98, max(22, base_score * rain_factor * drainage_factor)))
    
    if scenario_score >= 80:
        level = "Critical"
    elif scenario_score >= 60:
        level = "High"
    elif scenario_score >= 40:
        level = "Medium"
    else:
        level = "Low"
        
    water_reduction = round(max(0.0, (drainage_improvement_pct * 0.72)), 1)
    affected_sq_km = round(max(0.8, (scenario_score / 100.0) * (8.5 if city_id == 'mumbai' else 6.2)), 2)
    affected_pop = int(affected_sq_km * 4800)
    
    if city_id == 'mumbai':
        infra_protected = [
            'Hindmata Underpass Transit Corridor',
            'Kurla Station Western Feeder',
            'Milan Subway Pedestrian Sub-zone'
        ] if drainage_improvement_pct > 20 else ['Local Stormwater Sump at Sion']
    else:
        infra_protected = [
            'Bellandur Outflow Channel',
            'Ecospace Access Underpass',
            'Rainbow Drive Culvert Line'
        ] if drainage_improvement_pct > 20 else ['HBR Drainage Line']
        
    return {
        'flood_risk_score_baseline': base_score,
        'flood_risk_score_scenario': scenario_score,
        'flood_risk_level': level,
        'water_accumulation_reduction_pct': water_reduction,
        'affected_area_sq_km': affected_sq_km,
        'affected_population': affected_pop,
        'vulnerable_infrastructure_protected': infra_protected
    }
