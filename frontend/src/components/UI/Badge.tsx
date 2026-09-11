import React, { ReactNode } from 'react';

export type BadgeVariant = 'emerald' | 'amber' | 'rose' | 'purple' | 'blue' | 'slate';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: 'xs' | 'sm';
  icon?: ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'purple',
  size = 'sm',
  icon,
  className = ''
}) => {
  const styles: Record<BadgeVariant, string> = {
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80',
    rose: 'bg-rose-50 text-rose-700 border-rose-200/80',
    purple: 'bg-purple-50 text-purple-700 border-purple-200/80',
    blue: 'bg-blue-50 text-blue-700 border-blue-200/80',
    slate: 'bg-slate-100 text-slate-700 border-slate-200/80'
  };

  const sizeStyle = size === 'xs' ? 'px-1.5 py-0.5 text-[9px]' : 'px-2 py-0.5 text-[10px]';

  return (
    <span
      className={`inline-flex items-center gap-1 font-bold uppercase tracking-wider rounded-md border ${styles[variant]} ${sizeStyle} ${className}`}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
