import React from 'react';
import { useCity } from '../context/CityContext';
import { 
  Users, 
  Car, 
  Gauge, 
  Droplets, 
  Leaf, 
  Siren, 
  ShieldCheck, 
  Coins,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { DataSourceBadge } from './Common/DataSourceBadge';
import { ProvenanceType } from './Common/DataSourceBadge';

export const KPIGrid: React.FC = () => {
  const { metrics, simulationResult } = useCity();

  if (!metrics) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-2.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white border border-slate-200/80 rounded-2xl p-3 h-24 animate-pulse">
            <div className="w-12 h-3 bg-slate-200 rounded mb-2" />
            <div className="w-16 h-6 bg-slate-200 rounded mb-1" />
            <div className="w-10 h-2.5 bg-slate-100 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const trafficVal = simulationResult ? simulationResult.traffic_load_scenario : metrics.traffic_load;
  const speedVal = simulationResult ? simulationResult.avg_speed_scenario : metrics.average_speed;
  const floodVal = simulationResult ? simulationResult.flood_risk_level : metrics.flood_risk;
  const aqiVal = simulationResult ? simulationResult.aqi_scenario : metrics.air_quality_aqi;
  const emergVal = simulationResult ? simulationResult.emergency_response_min_scenario : metrics.emergency_response_min;
  const safetyVal = simulationResult ? simulationResult.safety_score_scenario : metrics.safety_score;
  const costVal = simulationResult ? `₹${simulationResult.estimated_cost_cr.toFixed(1)} Cr` : metrics.estimated_cost_base;

  const kpis: {
    title: string;
    value: string | number;
    subtitle: string;
    subtitleColor: string;
    icon: any;
    iconColor: string;
    iconBg: string;
    delta?: string;
    deltaType?: 'up' | 'down';
    provenance: ProvenanceType;
  }[] = [
    {
      title: 'Population',
      value: metrics.population,
      subtitle: 'vs last month',
      subtitleColor: 'text-slate-400 font-medium',
      delta: '↑ 1.2%',
      deltaType: 'up',
      icon: Users,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50/80',
      provenance: 'REAL DATA'
    },
    {
      title: 'Traffic Load',
      value: `${trafficVal}%`,
      subtitle: 'High',
      subtitleColor: 'text-amber-500 font-bold',
      icon: Car,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50/80',
      provenance: simulationResult ? 'SIMULATED' : 'DEMO DATA'
    },
    {
      title: 'Avg Speed',
      value: `${speedVal} km/h`,
      subtitle: '↓ 5%',
      subtitleColor: 'text-rose-500 font-bold',
      icon: Gauge,
      iconColor: 'text-slate-600',
      iconBg: 'bg-slate-100',
      provenance: simulationResult ? 'SIMULATED' : 'DEMO DATA'
    },
    {
      title: 'Flood Risk',
      value: floodVal,
      subtitle: '',
      subtitleColor: '',
      icon: Droplets,
      iconColor: 'text-sky-500',
      iconBg: 'bg-sky-50/80',
      provenance: 'SIMULATED'
    },
    {
      title: 'Air Quality (AQI)',
      value: aqiVal,
      subtitle: 'Moderate',
      subtitleColor: 'text-amber-500 font-bold',
      icon: Leaf,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-50/80',
      provenance: 'MODEL ESTIMATE'
    },
    {
      title: 'Emergency Response',
      value: `${emergVal} min`,
      subtitle: '↓ 2 min',
      subtitleColor: 'text-emerald-600 font-bold',
      icon: Siren,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50/80',
      provenance: 'MODEL ESTIMATE'
    }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3">
      {kpis.map((kpi, index) => {
        const Icon = kpi.icon;
        return (
          <div
            key={index}
            className="bg-white/95 backdrop-blur-sm border border-slate-200/90 rounded-2xl p-3.5 flex items-center space-x-3 shadow-xs hover:border-purple-300 hover:shadow-sm transition-all"
          >
            {/* Left Circular Icon Container */}
            <div className={`w-10 h-10 rounded-full ${kpi.iconBg} ${kpi.iconColor} flex items-center justify-center shrink-0 border border-slate-100/80 shadow-2xs`}>
              <Icon className="w-5 h-5 stroke-[2.2]" />
            </div>

            {/* Right Value & Label Stack */}
            <div className="min-w-0 flex-1">
              <div className="text-[11px] font-bold text-slate-500 truncate leading-tight">
                {kpi.title}
              </div>

              <div className="flex items-baseline space-x-1.5 mt-0.5">
                <span className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-none">
                  {kpi.value}
                </span>

                {kpi.delta && (
                  <span className="text-[11px] font-bold text-emerald-600">
                    {kpi.delta}
                  </span>
                )}
              </div>

              {kpi.subtitle && (
                <div className={`text-[10px] mt-0.5 leading-none ${kpi.subtitleColor}`}>
                  {kpi.subtitle}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
