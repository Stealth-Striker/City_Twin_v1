import { CityId, CityMetrics, Scenario, SimulationResult, OptimizationWeights, OptimizationResponse } from '../types';

const API_BASE = '/api';

export async function fetchCities(): Promise<any[]> {
  try {
    const res = await fetch(`${API_BASE}/cities`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, using local fallback for cities', e);
  }
  return [
    { id: 'mumbai', name: 'Mumbai', state: 'Maharashtra', center: [19.0760, 72.8777], population: '21.7M' },
    { id: 'bengaluru', name: 'Bengaluru', state: 'Karnataka', center: [12.9716, 77.5946], population: '13.6M' }
  ];
}

export async function fetchCityMetrics(cityId: CityId): Promise<CityMetrics> {
  try {
    const res = await fetch(`${API_BASE}/cities/${cityId}/metrics`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Backend offline, using fallback metrics', e);
  }
  
  if (cityId === 'mumbai') {
    return {
      city_id: 'mumbai',
      city_name: 'Mumbai',
      population: '21.7M',
      population_raw: 21700000,
      population_change: '+1.2% vs last month',
      traffic_load: 72,
      traffic_status: 'High',
      average_speed: 28,
      speed_change: '-5%',
      flood_risk: 'Medium',
      air_quality_aqi: 78,
      air_quality_status: 'Moderate',
      emergency_response_min: 11.0,
      emergency_change: '-2 min',
      safety_score: 82,
      safety_status: 'Moderate',
      estimated_cost_base: '₹2.4 Cr',
      rainfall_mm: 65.0,
      weather_desc: 'Partly Cloudy, 31°C, 78% Humidity',
      last_updated: '10:24 AM, 24 May 2024',
      data_provenance: {
        geographic_boundaries: 'REAL — OpenStreetMap GeoJSON',
        roads_network: 'REAL — OpenStreetMap Arterial Polylines',
        infrastructure: 'REAL — Authentic Geocoded Points',
        traffic_state: 'DEMO / SYNTHETIC BASELINE',
        flood_index: 'SIMULATED HYDROLOGIC MODEL',
        safety_rating: 'MODEL ESTIMATE (Non-official)'
      }
    };
  } else {
    return {
      city_id: 'bengaluru',
      city_name: 'Bengaluru',
      population: '13.6M',
      population_raw: 13600000,
      population_change: '+1.8% vs last month',
      traffic_load: 78,
      traffic_status: 'Severe',
      average_speed: 19,
      speed_change: '-7%',
      flood_risk: 'High',
      air_quality_aqi: 68,
      air_quality_status: 'Moderate',
      emergency_response_min: 14.5,
      emergency_change: '+1.5 min',
      safety_score: 76,
      safety_status: 'Moderate',
      estimated_cost_base: '₹3.1 Cr',
      rainfall_mm: 42.0,
      weather_desc: 'Scattered Clouds, 26°C, 62% Humidity',
      last_updated: '10:24 AM, 24 May 2024',
      data_provenance: {
        geographic_boundaries: 'REAL — OpenStreetMap GeoJSON',
        roads_network: 'REAL — OpenStreetMap Arterial Polylines',
        infrastructure: 'REAL — Authentic Geocoded Points',
        traffic_state: 'DEMO / SYNTHETIC BASELINE',
        flood_index: 'SIMULATED HYDROLOGIC MODEL',
        safety_rating: 'MODEL ESTIMATE (Non-official)'
      }
    };
  }
}

export async function fetchRoads(cityId: CityId): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/cities/${cityId}/roads`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Using fallback roads data', e);
  }
  return null;
}

export async function fetchInfrastructure(cityId: CityId): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/cities/${cityId}/infrastructure`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Using fallback infrastructure data', e);
  }
  return null;
}

export async function fetchFloodZones(cityId: CityId): Promise<any> {
  try {
    const res = await fetch(`${API_BASE}/cities/${cityId}/flood-risk`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Using fallback flood data', e);
  }
  return null;
}

export async function fetchScenarios(cityId: CityId): Promise<Scenario[]> {
  try {
    const res = await fetch(`${API_BASE}/scenarios?city=${cityId}`);
    if (res.ok) return await res.json();
  } catch (e) {
    console.warn('Using fallback scenarios', e);
  }
  return [];
}

export async function createScenarioApi(payload: any): Promise<Scenario> {
  const res = await fetch(`${API_BASE}/scenarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  return await res.json();
}

export async function runSimulationApi(scenarioId: string): Promise<SimulationResult> {
  const res = await fetch(`${API_BASE}/scenarios/${scenarioId}/simulate`, {
    method: 'POST'
  });
  return await res.json();
}

export async function rankScenariosApi(weights: OptimizationWeights, cityId: CityId): Promise<OptimizationResponse> {
  const res = await fetch(`${API_BASE}/optimization/rank?city=${cityId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(weights)
  });
  return await res.json();
}

export async function fetchReportApi(scenarioId: string): Promise<any> {
  const res = await fetch(`${API_BASE}/reports/${scenarioId}`);
  return await res.json();
}
