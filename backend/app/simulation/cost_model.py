from typing import Dict, Any

def estimate_infrastructure_cost(
    scenario_type: str,
    duration_days: int,
    drainage_improvement_pct: int,
    capacity_change_pct: int
) -> Dict[str, Any]:
    """
    Parametric cost estimation in Indian Crores (₹ Cr).
    Based on CPWD (Central Public Works Department) norms & urban traffic advisory benchmarks.
    """
    civil_cost = 0.0
    drainage_cost = 0.0
    operational_cost = 0.0
    
    if scenario_type in ["Road Construction", "New Road"]:
        civil_cost = 3.5 + abs(capacity_change_pct) * 0.04
    elif scenario_type in ["Road Closure", "Traffic Diversion"]:
        # Traffic signage, physical barricading, warden deployment, signaling recalibration
        civil_cost = 0.45
        operational_cost = round((duration_days / 30.0) * 0.35, 2)
    elif scenario_type == "Emergency Route":
        civil_cost = 0.60
        operational_cost = round((duration_days / 30.0) * 0.20, 2)
        
    if drainage_improvement_pct > 0:
        drainage_cost = round((drainage_improvement_pct / 10.0) * 0.42, 2)
        
    total_cost_cr = round(civil_cost + drainage_cost + operational_cost, 2)
    confidence = 85 if total_cost_cr > 1.0 else 90
    
    return {
        'estimated_cost_cr': total_cost_cr,
        'cost_confidence': confidence,
        'cost_breakdown': {
            'civil_works_cr': round(civil_cost, 2),
            'drainage_upgrades_cr': round(drainage_cost, 2),
            'traffic_ops_monitoring_cr': round(operational_cost, 2)
        }
    }
