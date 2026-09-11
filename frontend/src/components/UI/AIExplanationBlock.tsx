import React from 'react';
import { Sparkles, Info, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { Badge } from './Badge';

interface Props {
  headline: string;
  reasons: string[];
  recommendation: string;
  confidence?: number;
  impactLevel?: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  factors?: Record<string, number>;
  onActionClick?: () => void;
  actionText?: string;
  className?: string;
}

export const AIExplanationBlock: React.FC<Props> = ({
  headline,
  reasons,
  recommendation,
  confidence = 84,
  impactLevel = 'MODERATE',
  factors,
  onActionClick,
  actionText = 'View Detailed Analysis',
  className = ''
}) => {
  const getImpactBadge = () => {
    switch (impactLevel) {
      case 'CRITICAL': return <Badge variant="rose">Critical Impact</Badge>;
      case 'HIGH': return <Badge variant="rose">High Impact</Badge>;
      case 'MODERATE': return <Badge variant="amber">Moderate Impact</Badge>;
      default: return <Badge variant="emerald">Low Impact</Badge>;
    }
  };

  return (
    <div className={`rounded-2xl bg-white border border-slate-200/85 p-4 sm:p-5 shadow-xs space-y-3.5 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-purple-100/80 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Calm Urban Intelligence
            </h4>
            <span className="text-[10px] text-slate-400 font-medium">
              Transparent Physical & Statistical Attribution
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {getImpactBadge()}
          <Badge variant="purple">ML Model</Badge>
        </div>
      </div>

      {/* 1. What Happened? */}
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
          1. Projected Urban Consequence
        </div>
        <p className="text-xs font-bold text-slate-800 leading-snug">
          {headline}
        </p>
      </div>

      {/* 2. Why Did This Happen? */}
      <div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
          2. Root Cause Analysis (BPR & Hydrological Drivers)
        </div>
        <ul className="space-y-1 text-[11px] text-slate-600">
          {reasons.map((r, idx) => (
            <li key={idx} className="flex items-start space-x-1.5">
              <span className="text-purple-600 font-bold shrink-0">•</span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Grounded Factor Importances if provided */}
      {factors && Object.keys(factors).length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
            Model Feature Importances (Explainable AI)
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            {Object.entries(factors).map(([factor, pct]) => (
              <div key={factor} className="bg-slate-50 p-1.5 rounded-lg border border-slate-100 flex items-center justify-between">
                <span className="text-slate-600 truncate mr-1">{factor}</span>
                <span className="font-extrabold text-purple-700">{pct}%</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. What Should The Authority Do? */}
      <div className="p-3 rounded-xl bg-purple-50/70 border border-purple-100 text-xs text-purple-900 font-semibold flex items-start space-x-2">
        <Info className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-purple-950">Actionable Guidance: </span>
          <span>{recommendation}</span>
        </div>
      </div>

      {onActionClick && (
        <button
          onClick={onActionClick}
          className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-purple-700 border border-purple-200/60 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors"
        >
          <span>{actionText}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
