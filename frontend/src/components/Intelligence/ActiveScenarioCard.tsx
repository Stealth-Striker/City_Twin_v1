import React from 'react';
import { useCity } from '../../context/CityContext';
import { ArrowRight } from 'lucide-react';

interface Props {
  onOpenProgress: () => void;
}

export const ActiveScenarioCard: React.FC<Props> = ({ onOpenProgress }) => {
  const { activeScenario, simulationResult, isSimulating } = useCity();

  const name = activeScenario?.name || 'Road Closure – MG Road';
  const type = activeScenario?.scenario_type || 'Road Closure';
  const time = '24 May 2024, 10:15 AM';
  const duration = `${activeScenario?.duration_days || 30} days`;
  const confidence = simulationResult ? simulationResult.confidence : 82;

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between mb-3.5">
          <h3 className="text-sm font-bold text-slate-900">
            Active Scenario
          </h3>
          <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-[#F4EBFF] text-[#6941C6]">
            {isSimulating ? 'Simulating...' : 'Running Simulation...'}
          </span>
        </div>

        {/* Body */}
        <div className="flex items-start space-x-3.5 mb-3">
          {/* Roadblock Icon Container */}
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200/70 text-rose-500 flex items-center justify-center shrink-0 shadow-2xs">
            {/* Styled Roadblock Barricade SVG */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16" />
              <path d="M4 14h16" />
              <path d="M6 6v14" />
              <path d="M18 6v14" />
              <path d="m8 6 6 8" />
              <path d="m14 6 4 5" />
              <path d="m6 9 4 5" />
            </svg>
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="text-[13px] font-extrabold text-slate-900 leading-tight truncate">
              {name}
            </h4>

            <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 text-[11px]">
              <div className="text-slate-500">
                Type
              </div>
              <div className="font-semibold text-slate-800 text-right">
                {type}
              </div>

              <div className="text-slate-500">
                Start Time
              </div>
              <div className="font-semibold text-slate-800 text-right">
                {time}
              </div>

              <div className="text-slate-500">
                Duration
              </div>
              <div className="font-semibold text-slate-800 text-right">
                {duration}
              </div>

              <div className="text-slate-500">
                Confidence
              </div>
              <div className="font-semibold text-slate-800 text-right">
                {confidence}%
              </div>
            </div>

            {/* Confidence Progress Bar matching reference */}
            <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden mt-1.5">
              <div
                className="bg-[#12B76A] h-full rounded-full transition-all duration-500"
                style={{ width: `${confidence}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Button matching reference */}
      <button
        onClick={onOpenProgress}
        className="w-full py-2 px-3.5 bg-[#F9F5FF] hover:bg-[#F4EBFF] text-[#6941C6] border border-[#D6BBFB] rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-2xs group mt-2"
      >
        <span>View Simulation Progress</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#6941C6] group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
