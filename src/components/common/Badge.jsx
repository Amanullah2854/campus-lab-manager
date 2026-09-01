import React from 'react';
import { cn } from '../../utils/cn';

const variantStyles = {
  default: 'bg-slate-800 text-slate-300 border-slate-700',
  primary: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
  success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  warning: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  danger: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  info: 'bg-sky-500/10 text-sky-400 border-sky-500/20',
  purple: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

const statusMap = {
  available: { variant: 'success', label: 'Available', dot: 'bg-emerald-400' },
  'in-use': { variant: 'primary', label: 'In Use', dot: 'bg-cyan-400' },
  'in use': { variant: 'primary', label: 'In Use', dot: 'bg-cyan-400' },
  maintenance: { variant: 'warning', label: 'Maintenance', dot: 'bg-amber-400' },
  offline: { variant: 'danger', label: 'Offline', dot: 'bg-rose-400' },
  active: { variant: 'success', label: 'Active', dot: 'bg-emerald-400' },
  'in progress': { variant: 'primary', label: 'In Progress', dot: 'bg-cyan-400' },
  scheduled: { variant: 'purple', label: 'Scheduled', dot: 'bg-indigo-400' },
  investigating: { variant: 'warning', label: 'Investigating', dot: 'bg-amber-400' },
  'in queue': { variant: 'info', label: 'In Queue', dot: 'bg-sky-400' },
  resolved: { variant: 'success', label: 'Resolved', dot: 'bg-emerald-400' },
  high: { variant: 'danger', label: 'High Priority', dot: 'bg-rose-400' },
  medium: { variant: 'warning', label: 'Medium Priority', dot: 'bg-amber-400' },
  low: { variant: 'info', label: 'Low Priority', dot: 'bg-sky-400' },
};

export default function Badge({
  children,
  variant = 'default',
  status,
  size = 'md',
  dot = false,
  className,
}) {
  let finalVariant = variant;
  let label = children;
  let dotColor = null;

  if (status) {
    const key = String(status).toLowerCase();
    if (statusMap[key]) {
      finalVariant = statusMap[key].variant;
      label = children || statusMap[key].label;
      dotColor = statusMap[key].dot;
    }
  }

  const sizeStyles = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs px-2.5 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-medium rounded-full border transition-colors',
        variantStyles[finalVariant] || variantStyles.default,
        sizeStyles[size] || sizeStyles.md,
        className
      )}
    >
      {(dot || dotColor) && (
        <span
          className={cn(
            'w-1.5 h-1.5 rounded-full animate-pulse',
            dotColor || 'bg-current'
          )}
        />
      )}
      {label}
    </span>
  );
}
