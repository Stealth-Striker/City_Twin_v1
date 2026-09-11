import React from 'react';
import { useCity } from '../context/CityContext';
import { Wind, Leaf, Activity } from 'lucide-react';
import { SectionHeader } from '../components/UI/SectionHeader';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';

export const AirPollutionPage: React.FC = () => {
  const { metrics, simulationResult } = useCity();

  const aqi = simulationResult ? simulationResult.aqi_scenario : metrics?.air_quality_aqi || 78;
  const delta = simulationResult ? simulationResult.emission_delta_pct : -14.2;

  return (
    <div className="space-y-4 pb-8 max-w-[1600px] mx-auto">
      <SectionHeader
        badgeText="Air Quality"
        provenance="MODEL ESTIMATE"
        title="Vehicular Emissions & Atmospheric Dispersion Model"
        subtitle="Evaluates PM2.5, NOx, and CO2 emissions as a function of stop-and-go vehicle idling when corridor speeds drop below 20 km/h."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Current Air Quality Index (AQI)
          </div>
          <div className="text-3xl font-extrabold text-slate-900 mt-1">
            {aqi}
          </div>
          <div className="mt-2">
            <Badge variant={aqi <= 50 ? 'emerald' : 'amber'}>
              {aqi <= 50 ? 'Good Air Quality' : 'Moderate Threshold'}
            </Badge>
          </div>
        </Card>

        <Card>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Simulated Emissions Delta
          </div>
          <div className={`text-3xl font-extrabold mt-1 ${delta < 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {delta > 0 ? '+' : ''}{delta}%
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Result of vehicle redistribution and reduced corridor idling.
          </p>
        </Card>

        <Card>
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Clean Air Corridor Protection
          </div>
          <div className="text-3xl font-extrabold text-indigo-600 mt-1">
            {simulationResult ? `${simulationResult.clean_air_corridor_km} km` : '7.5 km'}
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">
            Continuous low-emission priority transit route length.
          </p>
        </Card>
      </div>
    </div>
  );
};
