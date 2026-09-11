import React from 'react';
import { useCity } from '../context/CityContext';
import { 
  Boxes, 
  Database, 
  MapPin, 
  Activity, 
  Layers, 
  Server, 
  ShieldCheck, 
  PlusCircle 
} from 'lucide-react';
import { SectionHeader } from '../components/UI/SectionHeader';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';
import { Button } from '../components/UI/Button';
import { DataSourceBadge } from '../components/Common/DataSourceBadge';
import { ProvenanceType } from '../components/Common/DataSourceBadge';

export const DigitalTwinPage: React.FC = () => {
  const { city, setActiveView } = useCity();

  const twinDimensions: {
    title: string;
    desc: string;
    status: string;
    nodes: string;
    provenance: ProvenanceType;
  }[] = [
    {
      title: 'Geographic & Spatial Representation',
      desc: 'Real OpenStreetMap vectors, elevation contours, shoreline and water body polygon topology.',
      status: 'Synchronized',
      nodes: city === 'mumbai' ? '25.3 km arterial corridor' : '18.4 km ORR corridor',
      provenance: 'REAL DATA'
    },
    {
      title: 'Infrastructure & Asset State',
      desc: 'Hospitals with ICU bed readiness, fire rescue engines, police sectors, and metro line networks.',
      status: 'Active Telemetry',
      nodes: '18 Major Stations Geocoded',
      provenance: 'REAL DATA'
    },
    {
      title: 'Dynamic Traffic & Mobility Flow',
      desc: 'Bureau of Public Roads equilibrium micro-simulation, lane capacities, and vehicle redistribution.',
      status: 'Simulating',
      nodes: '1,420 Network Links',
      provenance: 'SIMULATED'
    },
    {
      title: 'Hydrological & Monsoon Runoff',
      desc: 'Digital elevation model, impervious surface runoff, drainage catchment saturation index.',
      status: 'Hydrologic Model',
      nodes: '4 Vulnerability Hotspots',
      provenance: 'SIMULATED'
    },
    {
      title: 'Environmental AQI & Microclimate',
      desc: 'Dynamic vehicular emission factors (PM2.5, NOx), idling penalties, and clean air corridors.',
      status: 'Predictive Feed',
      nodes: '12 Virtual Monitoring Zones',
      provenance: 'MODEL ESTIMATE'
    },
    {
      title: 'Urban Safety & Resilience Index',
      desc: 'Multi-criteria index combining intersection saturation buffer, medical reach, and disaster resilience.',
      status: 'Continuous Scoring',
      nodes: 'Safety Index: 82/100',
      provenance: 'MODEL ESTIMATE'
    }
  ];

  const actions = (
    <Button
      variant="primary"
      size="sm"
      onClick={() => setActiveView('scenario-builder')}
      icon={<PlusCircle className="w-4 h-4" />}
    >
      Create What-If Scenario
    </Button>
  );

  return (
    <div className="space-y-4 pb-8 max-w-[1600px] mx-auto">
      <SectionHeader
        badgeText="Digital Twin 360"
        provenance="REAL DATA"
        title={`Urban Digital Twin Baseline Engine (${city.toUpperCase()})`}
        subtitle="A digital twin is not merely a map. It is an interconnected, multi-physics digital baseline uniting spatial geography, infrastructure capacity, real-time traffic equilibrium, and environmental resilience against which proposed decisions are evaluated."
        actions={actions}
      />

      {/* 6 Dimension Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {twinDimensions.map((dim, idx) => (
          <Card
            key={idx}
            title={dim.title}
            hoverEffect={true}
            headerAction={
              <div className="flex items-center space-x-1.5">
                <DataSourceBadge type={dim.provenance} />
                <Badge variant="purple" size="xs">
                  {dim.status}
                </Badge>
              </div>
            }
            className="flex flex-col justify-between"
          >
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {dim.desc}
            </p>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Resolution & Scope</span>
              <span className="font-extrabold text-slate-800">{dim.nodes}</span>
            </div>
          </Card>
        ))}
      </div>

      {/* Technical Architecture & Provenance Matrix */}
      <Card
        title="Underlying Multi-Physics & Computational Stack"
        subtitle="Transparent GovTech Architecture"
        icon={<Database className="w-4 h-4 text-purple-600" />}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs pt-1">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-bold text-slate-900">GIS Topology</div>
            <div className="text-slate-500 text-[11px] mt-1 leading-relaxed">
              OpenStreetMap + GeoPandas + Shapely geometric validation.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-bold text-slate-900">Equilibrium Flow</div>
            <div className="text-slate-500 text-[11px] mt-1 leading-relaxed">
              SUMO-compatible Bureau of Public Roads (BPR) delay modeling.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-bold text-slate-900">Predictive Machine Learning</div>
            <div className="text-slate-500 text-[11px] mt-1 leading-relaxed">
              Scikit-Learn Random Forest Regressor with grounded feature importances.
            </div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-bold text-slate-900">Deterministic Scoring</div>
            <div className="text-slate-500 text-[11px] mt-1 leading-relaxed">
              Multi-Criteria Decision Analysis (MCDA) with auditable weights.
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
