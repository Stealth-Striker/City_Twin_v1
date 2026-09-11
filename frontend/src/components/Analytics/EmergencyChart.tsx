import React from 'react';
import { useCity } from '../../context/CityContext';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Siren, ChevronDown } from 'lucide-react';

export const EmergencyChart: React.FC = () => {
  const { metrics, simulationResult } = useCity();

  const baseTime = metrics?.emergency_response_min || 11.0;

  const data = [
    { time: '12 AM', normal: 10, withScenario: 11 },
    { time: '4 AM', normal: 9, withScenario: 10 },
    { time: '8 AM', normal: 10.5, withScenario: 14.5 },
    { time: '12 PM', normal: 11, withScenario: 19 },
    { time: '4 PM', normal: 10.5, withScenario: 16.5 },
    { time: '8 PM', normal: 11, withScenario: 20 },
    { time: '12 AM', normal: 9.5, withScenario: 18.5 }
  ];

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-red-50 text-red-500 flex items-center justify-center">
              <Siren className="w-3.5 h-3.5 text-red-500" />
            </div>
            <h3 className="text-xs font-bold text-slate-800">
              Emergency Response
            </h3>
          </div>
          <button className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/70 transition-colors">
            <span>Today</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>

        {/* Value and Label */}
        <div className="mt-1 mb-1">
          <div className="text-2xl font-black text-slate-900 leading-none">
            {simulationResult ? simulationResult.emergency_response_min_scenario : 11} min
          </div>
          <div className="text-[11px] font-medium text-slate-400 mt-1">
            Average Response Time
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
              domain={[0, 25]} 
              ticks={[0, 5, 10, 15, 20, 25]} 
              tick={{ fontSize: 8, fill: '#94A3B8' }} 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#0F172A', borderRadius: '10px', border: 'none', color: '#FFF', fontSize: '11px' }}
            />
            <Line 
              type="monotone" 
              dataKey="normal" 
              name="Normal" 
              stroke="#2E90FA" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#2E90FA', strokeWidth: 1, stroke: '#FFFFFF' }} 
            />
            <Line 
              type="monotone" 
              dataKey="withScenario" 
              name="With Scenario" 
              stroke="#D92D20" 
              strokeWidth={2} 
              dot={{ r: 3, fill: '#D92D20', strokeWidth: 1, stroke: '#FFFFFF' }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-5 pt-2 border-t border-slate-100 text-[10px] font-semibold">
        <div className="flex items-center space-x-1.5 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-[#2E90FA]"></span>
          <span>Normal</span>
        </div>
        <div className="flex items-center space-x-1.5 text-slate-600">
          <span className="w-2 h-2 rounded-full bg-[#D92D20]"></span>
          <span>With Scenario</span>
        </div>
      </div>
    </div>
  );
};
