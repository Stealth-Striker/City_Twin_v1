from fastapi import APIRouter
from typing import Dict, Any, List
from app.models.schemas import OptimizationWeights, OptimizationResponse, ScenarioComparisonItem
from app.routers.scenarios import scenarios_db, run_full_simulation

router = APIRouter(prefix="/api/optimization", tags=["Optimization & Decision Support"])

@router.post("/rank", response_model=OptimizationResponse)
def rank_scenarios(weights: OptimizationWeights, city: str = "mumbai"):
    # Filter scenarios for city
    matching = [s for s in scenarios_db.values() if s.get("city_id", "").lower() == city.lower()]
    if not matching:
        # Fallback to all
        matching = list(scenarios_db.values())
        
    items: List[ScenarioComparisonItem] = []
    
    # Calculate simulation results for each scenario
    for s in matching:
        res = run_full_simulation(s)
        
        # Scoring metrics (0-100 normalized where 100 is best)
        # 1. Traffic score: lower load is better -> (100 - traffic_load_scenario)
        s_traffic = max(0, 100 - res.traffic_load_scenario)
        # 2. Flood score: lower flood risk score is better -> (100 - flood_risk_score_scenario)
        s_flood = max(0, 100 - res.flood_risk_score_scenario)
        # 3. Emergency score: lower emergency response time is better (target < 10 min)
        s_emerg = max(0, min(100, int((20.0 - res.emergency_response_min_scenario) * 7.5)))
        # 4. Pollution score: lower AQI is better -> (100 - min(100, res.aqi_scenario * 0.7))
        s_poll = max(0, min(100, int(100 - (res.aqi_scenario * 0.6))))
        # 5. Cost score: lower cost is better -> (10.0 - cost_cr) * 10
        s_cost = max(0, min(100, int((6.0 - min(6.0, res.estimated_cost_cr)) * 16.6)))
        # 6. Safety score: direct 0-100
        s_safety = res.safety_score_scenario
        
        total_weight = (
            weights.traffic + weights.flood + weights.emergency +
            weights.pollution + weights.cost + weights.safety
        )
        if total_weight == 0:
            total_weight = 1.0
            
        overall = (
            s_traffic * weights.traffic +
            s_flood * weights.flood +
            s_emerg * weights.emergency +
            s_poll * weights.pollution +
            s_cost * weights.cost +
            s_safety * weights.safety
        ) / total_weight
        
        reasons = []
        if s_traffic > 35:
            reasons.append("Maintains balanced corridor vehicle flow")
        if s_flood > 45:
            reasons.append("Mitigates waterlogging exposure across low-lying underpasses")
        if s_safety > 75:
            reasons.append("Maintains strong pedestrian and transit safety buffer")
        if s_cost > 60:
            reasons.append(f"Highly cost-effective implementation (₹{res.estimated_cost_cr:.2f} Cr)")
            
        items.append(ScenarioComparisonItem(
            id=s["id"],
            name=s["name"],
            scenario_type=s["scenario_type"],
            traffic_load=res.traffic_load_scenario,
            avg_speed=res.avg_speed_scenario,
            flood_risk=res.flood_risk_score_scenario,
            pollution_aqi=res.aqi_scenario,
            emergency_min=res.emergency_response_min_scenario,
            safety_score=res.safety_score_scenario,
            estimated_cost_cr=res.estimated_cost_cr,
            overall_score=round(overall, 1),
            rank=0,
            recommendation_verdict="Candidate",
            reasons=reasons or ["Standard intervention profile with predictable trade-offs"],
            trade_offs=f"Requires temporary operational diversion of {res.diverted_vehicles_per_hr:,} veh/hr"
        ))
        
    # Sort descending by overall score
    items.sort(key=lambda x: x.overall_score, reverse=True)
    for idx, itm in enumerate(items):
        itm.rank = idx + 1
        if idx == 0:
            itm.recommendation_verdict = "RECOMMENDED"
        elif idx == 1:
            itm.recommendation_verdict = "VIABLE ALTERNATIVE"
        else:
            itm.recommendation_verdict = "SUB-OPTIMAL"
            
    best = items[0]
    why_higher = [
        f"Delivers an overall multi-criteria performance index of {best.overall_score}/100.",
        f"Balances flow with an average speed of {best.avg_speed} km/h versus slower congested alternatives.",
        f"Maintains emergency response window at {best.emergency_min:.1f} minutes to nearest medical trauma centres.",
        f"Offers superior capital feasibility at ₹{best.estimated_cost_cr:.2f} Cr."
    ]
    
    justification = (
        f"{best.name} ranked highest because it optimizes the configured weighted balance of "
        f"traffic flow ({int(weights.traffic*100)}%), flood risk ({int(weights.flood*100)}%), "
        f"safety ({int(weights.safety*100)}%), and cost efficiency ({int(weights.cost*100)}%). "
        f"It avoids catastrophic gridlock while preserving essential emergency response corridors."
    )
    
    return OptimizationResponse(
        weights_applied=weights.dict(),
        ranked_scenarios=items,
        best_scenario_id=best.id,
        best_scenario_name=best.name,
        ai_justification=justification,
        why_ranked_higher=why_higher
    )

