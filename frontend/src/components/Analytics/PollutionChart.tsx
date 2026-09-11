import React from 'react';
import { useCity } from '../../context/CityContext';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { Leaf, ChevronDown } from 'lucide-react';

export const PollutionChart: React.FC = () => {
  const { metrics, simulationResult } = useCity();

  const currentAqi = simulationResult ? simulationResult.aqi_scenario : metrics?.air_quality_aqi || 78;

  // 13 hourly readings matching the reference bar distribution
  const data = [
    { time: '12 AM', aqi: 18 },
    { time: '2 AM', aqi: 24 },
    { time: '4 AM', aqi: 20 },
    { time: '6 AM', aqi: 45 },
    { time: '8 AM', aqi: 75 },
    { time: '10 AM', aqi: 105 },
    { time: '12 PM', aqi: 135 },
    { time: '2 PM', aqi: 132 },
    { time: '4 PM', aqi: 120 },
    { time: '6 PM', aqi: 95 },
    { time: '8 PM', aqi: 55 },
    { time: '10 PM', aqi: 35 },
    { time: '12 AM', aqi: 82 }
  ];

  const getBarColor = (aqi: number) => {
    if (aqi <= 35) return '#86EFAC'; // light green
    if (aqi <= 60) return '#FDE047'; // light yellow
    if (aqi <= 100) return '#FDB022'; // golden amber
    return '#F79009'; // orange
  };

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <h3 className="text-xs font-bold text-slate-800">
              Air Quality (AQI)
            </h3>
          </div>
          <button className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/70 transition-colors">
            <span>Today</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Value and Moderate Badge */}
        <div className="flex items-center space-x-2.5 mt-1 mb-1">
          <span className="text-2xl font-black text-slate-900 leading-none">
            {currentAqi}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FEF0C7] text-[#B54708]">
            Moderate
          </span>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="h-28 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 8, fill: '#94A3B8' }} tickLine={false} axisLine={false} interval={2} />
            <YAxis 
              domain={[0, 200]} 
              ticks={[0, 50, 100, 150, 200]} 
              tick={{ fontSize: 8, fill: '#94A3B8' }} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderRadius: '10px', border: 'none', color: '#FFF', fontSize: '11px' }}
            />
            <Bar dataKey="aqi" radius={[3, 3, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.aqi)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Spacer / padding matching bento grid row height */}
      <div className="pt-2 border-t border-transparent text-[10px]" />
    </div>
  );
};
