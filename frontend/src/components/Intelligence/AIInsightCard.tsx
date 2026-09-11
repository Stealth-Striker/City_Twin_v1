import React from 'react';
import { useCity } from '../../context/CityContext';
import { Sparkles, ArrowRight } from 'lucide-react';

export const AIInsightCard: React.FC = () => {
  const { simulationResult, setActiveView } = useCity();

  const insightText = simulationResult 
    ? `${simulationResult.ai_summary} ${simulationResult.ai_recommendation}`
    : 'Closing MG Road is likely to increase congestion by 18% in nearby areas. Consider alternate route via Ring Road for better flow.';

  return (
    <div className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between h-full">
      <div>
        {/* Header matching reference */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-[#F4EBFF] text-[#7F56D9] flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 fill-current text-[#7F56D9]" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">
              AI Insight
            </h3>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#F4EBFF] text-[#6941C6]">
            Powered by ML
          </span>
        </div>

        {/* Insight Text matching reference */}
        <p className="text-xs font-medium text-slate-600 leading-relaxed">
          {insightText}
        </p>
      </div>

      {/* Button matching reference */}
      <button
        onClick={() => setActiveView('traffic')}
        className="w-full mt-3 py-2 px-3.5 bg-[#F9F5FF] hover:bg-[#F4EBFF] text-[#6941C6] border border-[#D6BBFB] rounded-xl text-xs font-bold flex items-center justify-center space-x-1.5 transition-all cursor-pointer shadow-2xs group"
      >
        <span>View Detailed Analysis</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#6941C6] group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
