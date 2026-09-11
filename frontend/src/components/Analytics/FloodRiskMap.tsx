import React from 'react';
import { useCity } from '../../context/CityContext';
import { Droplets, ChevronDown } from 'lucide-react';

export const FloodRiskMap: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <Droplets className="w-3.5 h-3.5 text-blue-600" />
            </div>
            <h3 className="text-xs font-bold text-slate-800">
              Flood Risk Map
            </h3>
          </div>
          <button className="flex items-center space-x-1 text-[11px] font-semibold text-slate-500 bg-slate-50 hover:bg-slate-100 px-2 py-0.5 rounded-lg border border-slate-200/70 transition-colors">
            <span>Current</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Clean Scientific GIS Thermal Flood Heatmap Graphic matching reference */}
      <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200/90 shadow-2xs my-1">
        <img 
          src="/assets/illustrations/flood_matrix.jpg" 
          alt="GIS Hydrological Inundation Heatmap"
          className="w-full h-full object-cover object-center" 
        />
      </div>

      {/* Risk Legend matching reference */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[10px] font-semibold text-slate-600">
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#2E90FA]"></span>
          <span>Low</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#FEC84B]"></span>
          <span>Moderate</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#F79009]"></span>
          <span>High</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2 h-2 rounded-full bg-[#D92D20]"></span>
          <span>Critical</span>
        </div>
      </div>
    </div>
  );
};
