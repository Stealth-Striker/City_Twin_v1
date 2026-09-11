import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'emerald' | 'danger';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const variantStyles = {
    primary: 'bg-purple-600 hover:bg-purple-700 text-white shadow-sm shadow-purple-600/25 border border-purple-600 active:scale-[0.98]',
    secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200/80 active:scale-[0.98]',
    outline: 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 hover:border-slate-300 active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900 border-transparent',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm shadow-emerald-600/25 border border-emerald-600 active:scale-[0.98]',
    danger: 'bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 active:scale-[0.98]'
  };

  const sizeStyles = {
    xs: 'px-2 py-1 text-[11px] rounded-lg gap-1',
    sm: 'px-2.5 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-3.5 py-2 text-xs font-bold rounded-xl gap-2',
    lg: 'px-4 py-2.5 text-sm font-bold rounded-xl gap-2.5'
  };

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center font-bold tracking-tight transition-all duration-150 select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      {...props}
    >
      {loading && (
        <svg className="animate-spin -ml-0.5 h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && icon && iconPosition === 'left' && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === 'right' && icon}
    </button>
  );
};
