import React from 'react';
import { useCity } from '../../context/CityContext';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Car, ChevronDown } from 'lucide-react';

export const TrafficChart: React.FC = () => {
  const { metrics, simulationResult } = useCity();

  const baseLoad = metrics?.traffic_load || 72;
  const scenDelta = simulationResult ? simulationResult.traffic_load_delta_pct : 18;

  const data = [
    { time: '12 AM', current: 18, withScenario: 18 },
    { time: '4 AM', current: 14, withScenario: 14 },
    { time: '8 AM', current: 48, withScenario: 65 },
    { time: '12 PM', current: 65, withScenario: 88 },
    { time: '4 PM', current: baseLoad, withScenario: 92 },
    { time: '8 PM', current: 52, withScenario: 68 },
    { time: '12 AM', current: 20, withScenario: 22 }
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Car className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <h3 className="text-xs font-bold text-slate-800">
              Traffic Trend
            </h3>
          </div>
          <button className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/70 transition-colors">
            <span>Today</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Value and Peak Callout */}
        <div className="relative flex items-start justify-between mt-1 mb-1">
          <div>
            <div className="text-2xl font-black text-[#12B76A] leading-none">
              {baseLoad}%
            </div>
            <div className="text-[11px] font-medium text-slate-400 mt-1">
              Traffic Load
            </div>
          </div>

          {/* Peak Callout Badge matching reference */}
          <div className="px-2.5 py-0.5 bg-[#FEE4E2] text-[#D92D20] text-[10px] font-bold rounded-full border border-red-100 shadow-2xs">
            Peak: 92%
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-28 w-full pt-1">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: '#94A3B8' }} tickLine={false} axisLine={false} />
            <YAxis 
              domain={[0, 100]} 
              ticks={[0, 25, 50, 75, 100]} 
              unit="%" 
              tick={{ fontSize: 8, fill: '#94A3B8' }} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderRadius: '10px', border: 'none', color: '#FFF', fontSize: '11px' }}
            />
            <Line 
              type="monotone" 
              dataKey="current" 
              name="Current" 
              stroke="#12B76A" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#12B76A', strokeWidth: 1, stroke: '#FFFFFF' }} 
            />
            <Line 
              type="monotone" 
              dataKey="withScenario" 
              name="With Scenario" 
              stroke="#F79009" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#F79009', strokeWidth: 1, stroke: '#FFFFFF' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-5 pt-2 border-t border-slate-100 text-[10px] font-semibold">
        <div className="flex items-center space-x-1.5 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-[#12B76A]"></span>
          <span>Current</span>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-[#F79009]"></span>
          <span>With Scenario</span>
        </div>
      </div>
    </div>
  );
};
