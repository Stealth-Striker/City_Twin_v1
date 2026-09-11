import React, { ReactNode } from 'react';
import { DataSourceBadge } from '../Common/DataSourceBadge';
import { ProvenanceType } from '../Common/DataSourceBadge';

interface SectionHeaderProps {
  badgeText?: string;
  provenance?: ProvenanceType;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  badgeText,
  provenance,
  title,
  subtitle,
  actions,
  className = ''
}) => {
  return (
    <div className={`bg-white border border-slate-200/85 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3 ${className}`}>
      <div>
        <div className="flex items-center space-x-2">
          {badgeText && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-purple-100 text-purple-700">
              {badgeText}
            </span>
          )}
          {provenance && <DataSourceBadge type={provenance} />}
        </div>
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight mt-1">
          {title}
        </h2>
        {subtitle && (
          <p className="text-xs text-slate-500 font-medium mt-0.5 max-w-3xl leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 shrink-0">
          {actions}
        </div>
      )}
    </div>
  );
};
