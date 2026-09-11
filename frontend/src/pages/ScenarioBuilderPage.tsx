import React, { useState, useEffect } from 'react';
import { useCity } from '../context/CityContext';
import { 
  GitFork, 
  Play, 
  MapPin, 
  Sliders, 
  CloudRain, 
  ShieldAlert, 
  Siren, 
  Clock, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { SimulationProgressModal } from '../components/Intelligence/SimulationProgressModal';
import { SectionHeader } from '../components/UI/SectionHeader';
import { Card } from '../components/UI/Card';
import { Button } from '../components/UI/Button';
import { Badge } from '../components/UI/Badge';

export const ScenarioBuilderPage: React.FC = () => {
  const { 
    city, 
    setCity, 
    roadsGeoJson, 
    runSimulation, 
    isSimulating, 
    setActiveScenario, 
    setActiveView 
  } = useCity();

  const [scenarioName, setScenarioName] = useState('Road Closure & Traffic Diversion Corridor');
  const [scenarioType, setScenarioType] = useState('Road Closure');
  const [selectedRoadId, setSelectedRoadId] = useState(city === 'mumbai' ? 'mum-weh' : 'blr-orr-east');
  const [durationDays, setDurationDays] = useState(30);
  const [trafficDiversionPct, setTrafficDiversionPct] = useState(40);
  const [capacityChangePct, setCapacityChangePct] = useState(-50);
  const [drainageImprovementPct, setDrainageImprovementPct] = useState(30);
  const [rainfallScenarioMm, setRainfallScenarioMm] = useState(75);
  const [safetyPriority, setSafetyPriority] = useState('High');
  const [emergencyPriority, setEmergencyPriority] = useState('Critical');
  const [progressModalOpen, setProgressModalOpen] = useState(false);

  // Available roads for currently selected city with city-aware fallback
  const roadsList = roadsGeoJson?.features?.map((f: any) => ({
    id: f.properties.id,
    name: f.properties.name,
    lanes: f.properties.lanes,
    length: f.properties.length_km
  })) || (city === 'mumbai' ? [
    { id: 'mum-weh', name: 'Western Express Highway (WEH)', lanes: 8, length: 25.3 },
    { id: 'mum-eeh', name: 'Eastern Express Highway (EEH)', lanes: 8, length: 23.6 },
    { id: 'mum-bwsl', name: 'Bandra-Worli Sea Link', lanes: 8, length: 5.6 },
    { id: 'mum-jvlr', name: 'Jogeshwari-Vikhroli Link Road (JVLR)', lanes: 6, length: 10.6 }
  ] : [
    { id: 'blr-orr-east', name: 'Outer Ring Road (ORR - Silk Board to Marathahalli)', lanes: 8, length: 16.4 },
    { id: 'blr-hosur', name: 'Hosur Road Expressway (Electronic City Flyover)', lanes: 6, length: 12.8 },
    { id: 'blr-old-madras', name: 'Old Madras Road (Indiranagar to KR Puram)', lanes: 6, length: 11.2 },
    { id: 'blr-bellary', name: 'Bellary Road (Airport Expressway)', lanes: 8, length: 18.5 }
  ]);

  // Ensure selected road belongs to active city when city or roadsGeoJson changes
  useEffect(() => {
    if (roadsList.length > 0) {
      const roadExists = roadsList.some((r: any) => r.id === selectedRoadId);
      if (!roadExists) {
        setSelectedRoadId(roadsList[0].id);
      }
    }
  }, [city, roadsGeoJson, roadsList, selectedRoadId]);

  const handleRunSimulation = async () => {
    const roadObj = roadsList.find((r: any) => r.id === selectedRoadId);
    const newScen = {
      id: `sc-${Date.now()}`,
      name: scenarioName,
      scenario_type: scenarioType,
      city_id: city,
      road_id: selectedRoadId,
      road_name: roadObj ? roadObj.name : 'Urban Corridor',
      duration_days: durationDays,
      traffic_diversion_pct: trafficDiversionPct,
      capacity_change_pct: capacityChangePct,
      drainage_improvement_pct: drainageImprovementPct,
      rainfall_scenario_mm: rainfallScenarioMm,
      safety_priority: safetyPriority,
      emergency_priority: emergencyPriority,
      created_at: 'Just now',
      status: 'Running'
    };

    setActiveScenario(newScen);
    setProgressModalOpen(true);
    await runSimulation(newScen.id);
  };

  return (
    <div className="space-y-4 pb-8 max-w-5xl mx-auto">
      <SectionHeader
        badgeText="What-If Simulator"
        provenance="SIMULATED"
        title="What-If Urban Scenario Builder"
        subtitle="Configure proposed civil works, arterial road closures, and drainage upgrades to test systemic consequences virtually before executing them in the physical world."
      />

      {/* Main Form Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left 2 Cols: Form Parameters */}
        <div className="lg:col-span-2 space-y-4">
          {/* Card 1: Primary Scenario Identity */}
          <Card
            title="1. Scenario Identification & Corridor Target"
            icon={<GitFork className="w-4 h-4 text-purple-600" />}
          >
            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Scenario Label
                </label>
                <input
                  type="text"
                  value={scenarioName}
                  onChange={(e) => setScenarioName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  placeholder="e.g. Western Express Flyover Repair & Detour"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Intervention Type
                  </label>
                  <select
                    value={scenarioType}
                    onChange={(e) => setScenarioType(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                  >
                    <option value="Road Closure">Road Closure</option>
                    <option value="Road Construction">Road Construction</option>
                    <option value="Traffic Diversion">Traffic Diversion</option>
                    <option value="New Road">New Road</option>
                    <option value="Drainage Improvement">Drainage Improvement</option>
                    <option value="Emergency Route">Emergency Route</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Target City
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() => setCity('mumbai')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        city === 'mumbai'
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Mumbai
                    </button>
                    <button
                      type="button"
                      onClick={() => setCity('bengaluru')}
                      className={`flex-1 py-2 px-3 rounded-xl text-xs font-bold border transition-colors ${
                        city === 'bengaluru'
                          ? 'bg-purple-600 border-purple-600 text-white'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      Bengaluru
                    </button>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Target Road Corridor
                </label>
                <select
                  value={selectedRoadId}
                  onChange={(e) => setSelectedRoadId(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                >
                  {roadsList.map((r: any) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.lanes} Lanes, {r.length} km)
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>

          {/* Card 2: Parametric Interventions & Physics Sliders */}
          <Card
            title="2. Physical Interventions & Simulation Parameters"
            icon={<Sliders className="w-4 h-4 text-purple-600" />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs">
              {/* Duration Slider */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Execution Duration</span>
                  <span className="text-purple-600 font-extrabold">{durationDays} Days</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="180"
                  value={durationDays}
                  onChange={(e) => setDurationDays(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Traffic Diversion % */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Diversion Allocation</span>
                  <span className="text-purple-600 font-extrabold">{trafficDiversionPct}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={trafficDiversionPct}
                  onChange={(e) => setTrafficDiversionPct(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Capacity Change % */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Capacity Alteration</span>
                  <span className={`font-extrabold ${capacityChangePct < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {capacityChangePct > 0 ? '+' : ''}{capacityChangePct}%
                  </span>
                </div>
                <input
                  type="range"
                  min="-100"
                  max="100"
                  value={capacityChangePct}
                  onChange={(e) => setCapacityChangePct(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Drainage Improvement % */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Drainage Capacity Upgrade</span>
                  <span className="text-emerald-700 font-extrabold">+{drainageImprovementPct}% Upgrade</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={drainageImprovementPct}
                  onChange={(e) => setDrainageImprovementPct(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Rainfall Scenario (mm) */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Monsoon Rainfall Stress</span>
                  <span className="text-blue-700 font-extrabold">{rainfallScenarioMm} mm/day</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  value={rainfallScenarioMm}
                  onChange={(e) => setRainfallScenarioMm(Number(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer"
                />
              </div>

              {/* Priorities */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <div className="flex justify-between font-bold text-slate-800 mb-1">
                  <span>Policy Priorities</span>
                  <span className="text-slate-500 font-medium">Standard</span>
                </div>
                <div className="flex space-x-2 mt-1">
                  <Badge variant="purple">Safety: {safetyPriority}</Badge>
                  <Badge variant="rose">Emergency: {emergencyPriority}</Badge>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right 1 Col: Execution Card */}
        <div>
          <div className="bg-gradient-to-br from-purple-800 via-indigo-900 to-slate-950 text-white rounded-2xl p-5 shadow-md flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-200">
                  Ready to Simulate
                </span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-white/20 text-white">
                  11-Stage Pipeline
                </span>
              </div>

              <h4 className="text-base font-extrabold text-white leading-snug">
                {scenarioName}
              </h4>
              <p className="text-xs text-purple-200 mt-2 leading-relaxed font-medium">
                Clicking Run Simulation executes the multi-physics engine: BPR traffic redistribution, hydrological runoff, air quality dispersion, emergency hospital reach, and CPWD cost benchmarks.
              </p>

              <div className="my-5 p-3.5 rounded-xl bg-white/10 backdrop-blur-xs space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-purple-200 font-medium">Active City:</span>
                  <span className="font-bold capitalize text-white">{city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 font-medium">Capacity Alteration:</span>
                  <span className="font-bold text-white">{capacityChangePct}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 font-medium">Rainfall Stress:</span>
                  <span className="font-bold text-white">{rainfallScenarioMm} mm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-200 font-medium">Duration:</span>
                  <span className="font-bold text-white">{durationDays} Days</span>
                </div>
              </div>
            </div>

            <Button
              variant="emerald"
              size="md"
              onClick={handleRunSimulation}
              disabled={isSimulating}
              icon={<Play className="w-4 h-4 fill-current" />}
              className="w-full"
            >
              {isSimulating ? 'SIMULATION IN PROGRESS...' : 'RUN SIMULATION'}
            </Button>
          </div>
        </div>
      </div>

      {/* Simulation Progress Modal */}
      <SimulationProgressModal
        isOpen={progressModalOpen}
        onClose={() => setProgressModalOpen(false)}
      />
    </div>
  );
};
