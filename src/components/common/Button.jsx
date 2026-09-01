import React from 'react';
import { cn } from '../../utils/cn';

const variantStyles = {
  primary: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-lg shadow-cyan-500/20 border-transparent active:scale-[0.98]',
  secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700 active:scale-[0.98]',
  outline: 'bg-transparent hover:bg-slate-800/80 text-slate-300 border-slate-700 hover:border-slate-600',
  danger: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border-rose-500/30',
  ghost: 'bg-transparent hover:bg-slate-800/60 text-slate-400 hover:text-slate-200 border-transparent',
};

const sizeStyles = {
  sm: 'px-2.5 py-1.5 text-xs rounded-lg gap-1.5',
  md: 'px-3.5 py-2 text-sm rounded-lg gap-2',
  lg: 'px-4 py-2.5 text-base rounded-xl gap-2.5',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className,
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      className={cn(
        'inline-flex items-center justify-center font-medium border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer',
        variantStyles[variant] || variantStyles.primary,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
