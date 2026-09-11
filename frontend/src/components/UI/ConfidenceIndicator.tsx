import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  confidence: number;
  showBar?: boolean;
  className?: string;
}

export const ConfidenceIndicator: React.FC<Props> = ({
  confidence,
  showBar = true,
  className = ''
}) => {
  const getTier = (score: number) => {
    if (score >= 85) return { label: 'High Confidence', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
    if (score >= 70) return { label: 'Moderate Confidence', color: 'text-amber-700 bg-amber-50 border-amber-200' };
    return { label: 'Exploratory Model', color: 'text-rose-700 bg-rose-50 border-rose-200' };
  };

  const tier = getTier(confidence);

  return (
    <div className={`flex flex-col space-y-1 ${className}`}>
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-slate-500 font-medium flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
          <span>Decision Reliability</span>
        </span>
        <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${tier.color}`}>
          {confidence}% · {tier.label}
        </span>
      </div>
      {showBar && (
        <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
          <div
            className="bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-500 h-full rounded-full transition-all duration-500"
            style={{ width: `${confidence}%` }}
          />
        </div>
      )}
    </div>
  );
};
