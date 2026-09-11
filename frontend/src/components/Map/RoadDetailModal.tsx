import React from 'react';
import { useCity } from '../../context/CityContext';
import { RoadFeature } from '../../types';
import { X, AlertTriangle, ArrowRight, Gauge, Car, Users, Compass } from 'lucide-react';
import { Button } from '../UI/Button';
import { Badge } from '../UI/Badge';

interface Props {
  road: RoadFeature;
  onClose: () => void;
}

export const RoadDetailModal: React.FC<Props> = ({ road, onClose }) => {
  const { setActiveView, setActiveScenario, showToast } = useCity();
  const p = road.properties;

  const handleCloseRoad = () => {
    setActiveScenario({
      id: `sc-closure-${p.id}`,
      name: `Emergency Closure — ${p.name}`,
      scenario_type: 'Road Closure',
      city_id: 'mumbai',
      road_id: p.id,
      road_name: p.name,
      duration_days: 14,
      traffic_diversion_pct: 45,
      capacity_change_pct: -100,
      drainage_improvement_pct: 0,
      rainfall_scenario_mm: 60,
      safety_priority: 'High',
      emergency_priority: 'Critical',
      created_at: 'Just now',
      status: 'Ready'
    });
    showToast(`Configured emergency closure scenario for ${p.name}`);
    setActiveView('scenario-builder');
  };

  const handleCreateScenario = () => {
    setActiveScenario({
      id: `sc-opt-${p.id}`,
      name: `Intervention & Optimization — ${p.name}`,
      scenario_type: 'Traffic Diversion',
      city_id: 'mumbai',
      road_id: p.id,
      road_name: p.name,
      duration_days: 30,
      traffic_diversion_pct: 40,
      capacity_change_pct: -25,
      drainage_improvement_pct: 35,
      rainfall_scenario_mm: 75,
      safety_priority: 'High',
      emergency_priority: 'High',
      created_at: 'Just now',
      status: 'Ready'
    });
    setActiveView('scenario-builder');
  };

  return (
    <div className="absolute bottom-4 left-4 z-30 w-84 max-w-[calc(100%-2rem)] bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-4 shadow-xl animate-in fade-in slide-in-from-bottom-3 duration-200">
      <div className="flex items-start justify-between pb-2.5 border-b border-slate-100">
        <div>
          <Badge variant="purple" size="xs">
            Road Corridor Selected
          </Badge>
          <h4 className="text-sm font-extrabold text-slate-900 leading-snug mt-1">
            {p.name}
          </h4>
          <span className="text-[11px] text-slate-500 font-medium">
            {p.type} · {p.lanes} Lanes · {p.length_km} km
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-2 my-3">
        <div className="bg-slate-50/90 rounded-xl p-2 text-center border border-slate-100">
          <div className="text-[10px] text-slate-500 font-medium flex items-center justify-center space-x-1">
            <Car className="w-3 h-3 text-emerald-600" />
            <span>Traffic</span>
          </div>
          <div className="text-xs font-bold text-slate-900 mt-0.5">
            {p.current_traffic.toLocaleString()}
          </div>
          <div className="text-[9px] text-slate-400 font-medium">veh/hr</div>
        </div>

        <div className="bg-slate-50/90 rounded-xl p-2 text-center border border-slate-100">
          <div className="text-[10px] text-slate-500 font-medium flex items-center justify-center space-x-1">
            <Gauge className="w-3 h-3 text-blue-600" />
            <span>Avg Speed</span>
          </div>
          <div className="text-xs font-bold text-slate-900 mt-0.5">
            {p.average_speed}
          </div>
          <div className="text-[9px] text-slate-400 font-medium">km/h</div>
        </div>

        <div className="bg-slate-50/90 rounded-xl p-2 text-center border border-slate-100">
          <div className="text-[10px] text-slate-500 font-medium flex items-center justify-center space-x-1">
            <Users className="w-3 h-3 text-purple-600" />
            <span>Affected</span>
          </div>
          <div className="text-xs font-bold text-slate-900 mt-0.5">
            {(p.affected_vehicles / 1000).toFixed(1)}k
          </div>
          <div className="text-[9px] text-slate-400 font-medium">riders/day</div>
        </div>
      </div>

      <div className="flex items-center space-x-2 pt-1">
        <Button
          variant="danger"
          size="sm"
          onClick={handleCloseRoad}
          icon={<AlertTriangle className="w-3.5 h-3.5" />}
          className="flex-1"
        >
          Close Road
        </Button>
        <Button
          variant="primary"
          size="sm"
          onClick={handleCreateScenario}
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          iconPosition="right"
          className="flex-1"
        >
          Scenario
        </Button>
      </div>
    </div>
  );
};
