export type CityId = 'mumbai' | 'bengaluru';

export interface CitySummary {
  id: CityId;
  name: string;
  state: string;
  country: string;
  center: [number, number];
  population: string;
}

export interface CityMetrics {
  city_id: CityId;
  city_name: string;
  population: string;
  population_raw: number;
  population_change: string;
  traffic_load: number;
  traffic_status: string;
  average_speed: number;
  speed_change: string;
  flood_risk: string;
  air_quality_aqi: number;
  air_quality_status: string;
  emergency_response_min: number;
  emergency_change: string;
  safety_score: number;
  safety_status: string;
  estimated_cost_base: string;
  rainfall_mm: number;
  weather_desc: string;
  last_updated: string;
  data_provenance: Record<string, string>;
}

export interface RoadFeature {
  type: 'Feature';
  id: string;
  properties: {
    id: string;
    name: string;
    type: string;
    lanes: number;
    length_km: number;
    capacity: number;
    current_traffic: number;
    speed_limit: number;
    average_speed: number;
    affected_vehicles: number;
    status: string;
    congestion_pct: number;
    corridor: string;
  };
  geometry: {
    type: 'LineString';
    coordinates: [number, number][];
  };
}

export interface InfrastructureFeature {
  type: 'Feature';
  id: string;
  properties: {
    id: string;
    name: string;
    category: 'Hospital' | 'Fire Station' | 'Police Station' | 'Railway Station' | 'Metro Station' | 'School';
    capacity: string;
    status: string;
    emergency_unit?: string;
  };
  geometry: {
    type: 'Point';
    coordinates: [number, number];
  };
}

export interface FloodZoneFeature {
  type: 'Feature';
  id: string;
  properties: {
    name: string;
    risk_level: 'Low' | 'Medium' | 'High' | 'Critical';
    elevation_m: number;
    drainage_capacity_mm_hr: number;
    vulnerability_score: number;
    historical_waterlogging_cm: number;
  };
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][][];
  };
}

export interface WaterBodyFeature {
  type: 'Feature';
  id: string;
  properties: {
    name: string;
    type: string;
    risk_factor: string;
  };
  geometry: {
    type: 'LineString' | 'Polygon';
    coordinates: any;
  };
}

export interface Scenario {
  id: string;
  name: string;
  scenario_type: string;
  city_id: CityId;
  road_id?: string;
  road_name?: string;
  duration_days: number;
  traffic_diversion_pct: number;
  capacity_change_pct: number;
  drainage_improvement_pct: number;
  rainfall_scenario_mm: number;
  safety_priority: string;
  emergency_priority: string;
  created_at: string;
  status: string;
  simulation_result?: SimulationResult;
}

export interface SimulationResult {
  scenario_id: string;
  scenario_name: string;
  city_id: CityId;
  status: string;
  timestamp: string;
  confidence: number;
  
  traffic_load_baseline: number;
  traffic_load_scenario: number;
  traffic_load_delta_pct: number;
  avg_speed_baseline: number;
  avg_speed_scenario: number;
  avg_speed_delta_pct: number;
  diverted_vehicles_per_hr: number;
  critical_intersections_affected: number;
  affected_roads: string[];
  
  flood_risk_score_baseline: number;
  flood_risk_score_scenario: number;
  flood_risk_level: string;
  water_accumulation_reduction_pct: number;
  affected_area_sq_km: number;
  affected_population: number;
  vulnerable_infrastructure_protected: string[];
  
  aqi_baseline: number;
  aqi_scenario: number;
  emission_delta_pct: number;
  clean_air_corridor_km: number;
  
  emergency_response_min_baseline: number;
  emergency_response_min_scenario: number;
  emergency_delay_min: number;
  critical_routes_rerouted: number;
  
  safety_score_baseline: number;
  safety_score_scenario: number;
  safety_score_delta: number;
  safety_impact_level: string;
  safety_reasons: string[];
  
  estimated_cost_cr: number;
  cost_confidence: number;
  cost_breakdown: {
    civil_works_cr: number;
    drainage_upgrades_cr: number;
    traffic_ops_monitoring_cr: number;
  };
  
  ai_summary: string;
  ai_reasons: string[];
  ai_recommendation: string;
  top_contributing_factors: Record<string, number>;
  
  social_impact: {
    emergency_response_change_min: number;
    population_protected: number;
    affected_transit_riders: number;
    safety_improvement_pts: number;
    public_service_access: string;
  };
  economic_impact: {
    estimated_implementation_cost_cr: number;
    potential_avoided_loss_cr: number;
    cost_confidence_pct: number;
    commercial_throughput_delta_pct: number;
  };
  environmental_impact: {
    emission_delta_pct: number;
    flood_exposure_reduction_pct: number;
    clean_air_corridor_km: number;
    environmental_risk_level: string;
  };
  governance_impact: {
    scenarios_evaluated_count: number;
    decision_confidence_pct: number;
    evidence_based_recommendation: string;
    transparency_score: string;
  };
}

export interface OptimizationWeights {
  traffic: number;
  flood: number;
  emergency: number;
  pollution: number;
  cost: number;
  safety: number;
}

export interface ScenarioComparisonItem {
  id: string;
  name: string;
  scenario_type: string;
  traffic_load: number;
  avg_speed: number;
  flood_risk: number;
  pollution_aqi: number;
  emergency_min: number;
  safety_score: number;
  estimated_cost_cr: number;
  overall_score: number;
  rank: number;
  recommendation_verdict: string;
  reasons: string[];
  trade_offs: string;
}

export interface OptimizationResponse {
  weights_applied: OptimizationWeights;
  ranked_scenarios: ScenarioComparisonItem[];
  best_scenario_id: string;
  best_scenario_name: string;
  ai_justification: string;
  why_ranked_higher: string[];
  data_provenance: string;
}

export type ActiveView = 
  | 'dashboard'
  | 'digital-twin'
  | 'scenario-builder'
  | 'traffic'
  | 'flood'
  | 'pollution'
  | 'emergency'
  | 'infrastructure'
  | 'compare'
  | 'recommendations'
  | 'reports'
  | 'login';
