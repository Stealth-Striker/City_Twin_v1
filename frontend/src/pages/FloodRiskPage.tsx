import React from 'react';
import { useCity } from '../context/CityContext';
import { Droplets, ShieldAlert, Waves, CloudRain } from 'lucide-react';
import { SectionHeader } from '../components/UI/SectionHeader';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';

export const FloodRiskPage: React.FC = () => {
  const { city, metrics, simulationResult, floodGeoJson } = useCity();

  const zones = floodGeoJson?.features || [];

  return (
    <div className="space-y-4 pb-8 max-w-[1600px] mx-auto">
      <SectionHeader
        badgeText="Hydrological Engine"
        provenance="SIMULATED"
        title={`Monsoon Inundation & Runoff Vulnerability (${city.toUpperCase()})`}
        subtitle="Combines digital elevation modeling (DEM), impervious pavement runoff, and stormwater culvert discharge capacities under simulated heavy monsoon events."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center space-x-2 text-blue-600 mb-1">
            <CloudRain className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Rainfall Stress</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {metrics?.rainfall_mm || 65} mm/day
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Monsoon peak precipitation event benchmark.
          </p>
        </Card>

        <Card>
          <div className="flex items-center space-x-2 text-rose-600 mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Vulnerability Score</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {simulationResult ? simulationResult.flood_risk_score_scenario : 64}/100
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Citywide catchment exposure rating.
          </p>
        </Card>

        <Card>
          <div className="flex items-center space-x-2 text-emerald-600 mb-1">
            <Waves className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-wider">Drainage Inundation Relief</span>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 mt-1">
            {simulationResult ? `-${simulationResult.water_accumulation_reduction_pct}%` : '0% Base'}
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Simulated stormwater accumulation reduction.
          </p>
        </Card>
      </div>

      {/* Flood Hotspots List */}
      <Card
        title={`Geocoded Low-Lying Catchment Basins (${city.toUpperCase()})`}
        subtitle="Vulnerable transit underpasses and natural drainage depressions"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-1">
          {zones.map((zone: any, idx: number) => {
            const p = zone.properties;
            return (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                  <div className="text-slate-500 text-[11px] mt-0.5">
                    Elevation: {p.elevation_m}m · Drainage: {p.drainage_capacity_mm_hr} mm/hr
                  </div>
                  <div className="text-slate-700 font-bold text-[11px] mt-1">
                    Historical Waterlogging: {p.historical_waterlogging_cm} cm
                  </div>
                </div>
                <Badge
                  variant={p.risk_level === 'Critical' ? 'rose' : p.risk_level === 'High' ? 'amber' : 'blue'}
                >
                  {p.risk_level}
                </Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
