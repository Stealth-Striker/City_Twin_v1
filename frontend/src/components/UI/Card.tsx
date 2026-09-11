import React, { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  headerAction?: ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  icon,
  headerAction,
  padding = 'md',
  hoverEffect = false,
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-4 sm:p-5',
    lg: 'p-6 sm:p-7'
  };

  return (
    <div
      className={`bg-white border border-slate-200/85 rounded-2xl shadow-xs transition-all duration-200 ${
        hoverEffect ? 'hover:border-purple-200 hover:shadow-md hover:-translate-y-0.5' : ''
      } ${paddingClasses[padding]} ${className}`}
    >
      {(title || icon || headerAction) && (
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100/90">
          <div className="flex items-center space-x-2.5">
            {icon && (
              <div className="w-7 h-7 rounded-lg bg-slate-100/90 text-slate-700 flex items-center justify-center shrink-0">
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800 leading-tight">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-[11px] text-slate-500 font-medium leading-none mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      {children}
    </div>
  );
};
