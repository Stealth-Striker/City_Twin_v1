import React from 'react';

export type ProvenanceType = 'REAL DATA' | 'DEMO DATA' | 'SIMULATED' | 'MODEL ESTIMATE' | 'FUTURE INTEGRATION';

interface Props {
  type: ProvenanceType;
  className?: string;
}

export const DataSourceBadge: React.FC<Props> = ({ type, className = '' }) => {
  const styles: Record<ProvenanceType, string> = {
    'REAL DATA': 'bg-emerald-50 text-emerald-700 border-emerald-200',
    'DEMO DATA': 'bg-amber-50 text-amber-700 border-amber-200',
    'SIMULATED': 'bg-indigo-50 text-indigo-700 border-indigo-200',
    'MODEL ESTIMATE': 'bg-purple-50 text-purple-700 border-purple-200',
    'FUTURE INTEGRATION': 'bg-slate-50 text-slate-600 border-slate-200'
  };

  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold tracking-wide border uppercase ${styles[type] || 'bg-gray-100 text-gray-700 border-gray-200'} ${className}`}
      title={`Data Provenance: ${type}`}
    >
      {type}
    </span>
  );
};
