import React from 'react';
import { cn } from '../../utils/cn';

const colorThemes = {
  cyan: {
    iconBg: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    glow: 'group-hover:border-cyan-500/40',
    indicator: 'bg-cyan-400',
  },
  emerald: {
    iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    glow: 'group-hover:border-emerald-500/40',
    indicator: 'bg-emerald-400',
  },
  indigo: {
    iconBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
    glow: 'group-hover:border-indigo-500/40',
    indicator: 'bg-indigo-400',
  },
  amber: {
    iconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    glow: 'group-hover:border-amber-500/40',
    indicator: 'bg-amber-400',
  },
  rose: {
    iconBg: 'bg-rose-500/10 border-rose-500/20 text-rose-400',
    glow: 'group-hover:border-rose-500/40',
    indicator: 'bg-rose-400',
  },
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  color = 'cyan',
  className,
}) {
  const theme = colorThemes[color] || colorThemes.cyan;

  return (
    <div
      className={cn(
        'group relative bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-cyan-950/20 hover:-translate-y-0.5',
        theme.glow,
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">{title}</p>
          <h4 className="text-2xl lg:text-3xl font-bold text-slate-50 mt-2 tracking-tight">{value}</h4>
          {subtitle && (
            <p className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
              {trend && (
                <span className={cn('font-medium', trend.positive ? 'text-emerald-400' : 'text-rose-400')}>
                  {trend.value}
                </span>
              )}
              <span>{subtitle}</span>
            </p>
          )}
        </div>
        {Icon && (
          <div className={cn('p-3 rounded-xl border transition-transform duration-300 group-hover:scale-110', theme.iconBg)}>
            <Icon className="w-5 h-5" />
          </div>
        )}
      </div>
    </div>
  );
}
