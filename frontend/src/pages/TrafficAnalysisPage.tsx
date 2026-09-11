import React from 'react';
import { useCity } from '../context/CityContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { SectionHeader } from '../components/UI/SectionHeader';
import { Card } from '../components/UI/Card';
import { Badge } from '../components/UI/Badge';

export const TrafficAnalysisPage: React.FC = () => {
  const { city, roadsGeoJson, simulationResult } = useCity();

  const corridors = roadsGeoJson?.features?.map((f: any) => ({
    name: f.properties.name,
    capacity: f.properties.capacity,
    current: f.properties.current_traffic,
    speed: f.properties.average_speed,
    congestion: f.properties.congestion_pct
  })) || [];

  const bprData = [
    { vc: '0.2', normalTime: 10, congestedTime: 10 },
    { vc: '0.4', normalTime: 10.5, congestedTime: 11 },
    { vc: '0.6', normalTime: 11.5, congestedTime: 12.8 },
    { vc: '0.8', normalTime: 13.5, congestedTime: 16.5 },
    { vc: '1.0', normalTime: 18.0, congestedTime: 24.0 },
    { vc: '1.2', normalTime: 25.0, congestedTime: 38.0 },
    { vc: '1.4', normalTime: 36.0, congestedTime: 58.0 }
  ];

  return (
    <div className="space-y-4 pb-8 max-w-[1600px] mx-auto">
      <SectionHeader
        badgeText="Traffic Analysis"
        provenance="SIMULATED"
        title="Corridor Bottleneck & Equilibrium Flow Analysis"
        subtitle="Bureau of Public Roads (BPR) equilibrium delay curve: t = t0 [1 + alpha * (V/C)^beta]. Demonstrates non-linear saturation when capacity is constrained or detours are instituted."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Corridor Saturation Bar Chart */}
        <Card
          title="Arterial Corridors: Design Capacity vs Simulated Peak Demand (veh/hr)"
          subtitle="Identifies corridors exceeding safe operating volume"
        >
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={corridors} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 9, fill: '#64748B' }} interval={0} angle={-15} textAnchor="end" />
                <YAxis tick={{ fontSize: 9, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '10px', color: '#FFF', fontSize: '11px', border: 'none' }} />
                <Bar dataKey="capacity" name="Design Capacity" fill="#E2E8F0" radius={[4, 4, 0, 0]} />
                <Bar dataKey="current" name="Simulated Demand" fill="#6366F1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* BPR Delay Function Curve */}
        <Card
          title="Non-Linear Travel Delay vs Volume-to-Capacity (V/C) Ratio"
          subtitle="Delay surges exponentially when V/C exceeds 0.85"
        >
          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bprData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
                <XAxis dataKey="vc" label={{ value: 'V/C Ratio', position: 'insideBottom', offset: -5, fontSize: 10, fill: '#64748B' }} tick={{ fontSize: 9, fill: '#64748B' }} />
                <YAxis label={{ value: 'Travel Time (min)', angle: -90, position: 'insideLeft', fontSize: 10, fill: '#64748B' }} tick={{ fontSize: 9, fill: '#64748B' }} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderRadius: '10px', color: '#FFF', fontSize: '11px', border: 'none' }} />
                <Line type="monotone" dataKey="normalTime" name="Normal Equilibrium" stroke="#10B981" strokeWidth={2.5} />
                <Line type="monotone" dataKey="congestedTime" name="With Scenario Detours" stroke="#EF4444" strokeWidth={2.5} strokeDasharray="4 4" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
